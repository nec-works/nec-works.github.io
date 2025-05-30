var current_position = 0;
var previous_position = 0;
var timer;
var totalTime = 1;

/**
 * 총학습시간 타이머
 */
function onTimer() {
	var nPos = 0;
	if ( HTML5PlayerObj ) {
		nPos = HTML5PlayerObj.element.currentTime;
	}
	if ( nPos > 0 && previous_position != current_position ) {
		previous_position = current_position;
		current_position = nPos;
		totalTime += 1.0;
	} else {
		previous_position = nPos;
	}
}

var gCheckUseUpdateUserStudy = false;

/**
 * 사용자 학습 정보 저장 처리 핸들러 (학습 종료시)
 */
function updateUserStudy() {
	if ( b_IE9Under ) {
		if ( typeof ( g_ZonePlayer ) != "undefined" && g_ZonePlayer.IsInstallPlayer() ) {
			totalTime = g_ZonePlayer.GetPlayTime( 3 );
			current_position = g_ZonePlayer.GetCurrentPosition();
		} else {
			return false;
		}
	} else {
		if ( typeof ( HTML5PlayerObj ) == "undefined" || gCheckUseUpdateUserStudy ) {
			return false;
		}
	}

	gCheckUseUpdateUserStudy = true; // 단일실행을 위해
	
	var saveUrl = "/user/lecture/status/save";
	if( IS_SDL ){
		saveUrl = "/user/lecture/status/sdlSave";
	}
	
	makeRequest( saveUrl, "courseId=" + courseID + "&stepId=" + stepID + "&lectureId=" + lectureID + "&enrollNo=" + enrollNO + "&encodingTypeCode=" + encType + "&lastStudyTime=" + parseInt( totalTime ) + "&lastStudyLocation=" + parseInt( current_position ) + "&partAccumulateStudyTime=" + parseInt( _partAccumulateStudyTime ) );
}

/**
 * 사용자 학습 정보 저장 처리 핸들러 (부분)
 */
function updateUserStudyPart() {

	if ( b_IE9Under ) {
		if ( typeof ( g_ZonePlayer ) != "undefined" && g_ZonePlayer.IsInstallPlayer() ) {
			current_position = g_ZonePlayer.GetCurrentPosition();
		} else {
			return false;
		}
	} else {
		if ( typeof ( HTML5PlayerObj ) == "undefined" ) {
			return false;
		}
	}

	var saveUrl = "/user/lecture/status/savePart";
	if( IS_SDL ){
		saveUrl = "/user/lecture/status/saveSdlPart";
	}
	
	makeRequest( saveUrl, "courseId=" + courseID + "&stepId=" + stepID + "&lectureId=" + lectureID + "&enrollNo=" + enrollNO + "&encodingTypeCode=" + encType + "&lastStudyTime=" + parseInt( _partStudyTime ) + "&lastStudyLocation=" + parseInt( current_position ) );
}

// 학습 진도율 저장 환경 setTime Object
var _timerObjSaveUserLecturePartConfig = null;
// 학습 진도율 저장 환경 setTime 기본값 600000ms == 10min
var _timerTimeSaveUserLecturePartConfig = 600000;

// 학습 진도율 저장 setTime Object
var _timerObjSaveUserLecturePart = null;
// 학습 진도율 저장 setTime 기본값 0 비실행
var _timerTimeSaveUserLecturePart = 0;

// 부분 사용자 학습 시간
var _partStudyTime = 0;
// 부분 누적 사용자 학습시간
var _partAccumulateStudyTime = 0;

/**
 * 부분 학습 진도율 STARTUP
 */
function startSaveUserLecturePartConfig( siteDsCd, comSetDsCd ) {
	// 학습 진도율 저장 환경 setTime Object 초기화
	if ( _timerObjSaveUserLecturePartConfig != null ) {
		clearTimeout( _timerObjSaveUserLecturePartConfig );
		_timerObjSaveUserLecturePartConfig = null;
	}

	// 학습 진도율 저장 setTime Object 초기화
	if ( _timerObjSaveUserLecturePart != null ) {
		clearTimeout( _timerObjSaveUserLecturePart );
		_timerObjSaveUserLecturePart = null;
	}

	if ( siteDsCd == null || siteDsCd == undefined ) {
		siteDsCd = 'MS';
	}

	saveUserLecturePartConfig( siteDsCd, comSetDsCd );
}

/**
 * 사용자 학습 정보 저장 (부분) 환경정보 <br/>환경정보에 따른 부분 학습 진도율 저장 함수 호출
 */
function saveUserLecturePartConfig( siteDsCd, comSetDsCd ) {
	// 공통 환경에서 설정 정보를 가져온다 (save time)
	$.ajax( {
		url : '/portalSet/viewAjax',
		type : 'post',
		dataType : 'text',
		data : {
			'siteDsCd' : siteDsCd,
			'comSetDsCd' : comSetDsCd
		},
		error : function( obj ) {
			_timerObjSaveUserLecturePartConfig = setTimeout( "saveUserLecturePartConfig( '" + siteDsCd + "', '" + comSetDsCd + "' )", _timerTimeSaveUserLecturePartConfig );
		},
		success : function( time ) {
			var tempTime = parseInt( time );

			if ( isNaN( tempTime ) )
				time = 0;

			// 설정값이 5분보다 적을경우 대비 ( 주기가 너무 짧은것은 .. danger )
			if ( 0 < tempTime && tempTime < 300 ) {
				tempTime = 300;
			}
			_timerTimeSaveUserLecturePart = tempTime * 1000;
			_timerObjSaveUserLecturePartConfig = setTimeout( "saveUserLecturePartConfig( '" + siteDsCd + "', '" + comSetDsCd + "' )", _timerTimeSaveUserLecturePartConfig );

			// 부분 학습 진도율 저장시간이 0일 경우 timer clear
			if ( _timerTimeSaveUserLecturePart < 1 ) {
				if ( _timerObjSaveUserLecturePart != null ) {
					clearTimeout( _timerObjSaveUserLecturePart );
					_timerObjSaveUserLecturePart = null;
				}
			} else {
				if ( _timerObjSaveUserLecturePart == null ) {
					_timerObjSaveUserLecturePart = setTimeout( saveUserLecturePart, _timerTimeSaveUserLecturePart );
				}
			}
		}
	} );
}

/**
 * 사용자 학습 정보 저장 ( 부분 )
 */
function saveUserLecturePart() {
	// 부분 저장 실행시 항상 초기화 시켜준다
	clearTimeout( _timerObjSaveUserLecturePart );
	_timerObjSaveUserLecturePart = null;

	if ( _timerTimeSaveUserLecturePart > 0 ) {

		if ( b_IE9Under ) {
			if ( typeof ( g_ZonePlayer ) != "undefined" && !g_ZonePlayer.IsInstallPlayer() ) {
				totalTime = g_ZonePlayer.GetPlayTime( 3 );
				current_position = g_ZonePlayer.GetCurrentPosition();
			} else {
				return false;
			}
		}

		_partStudyTime = parseInt( totalTime ) - _partAccumulateStudyTime;

		// 부분 저장 할 학습시간이 없다면 타이머를 리셋한다.
		if ( _partStudyTime <= 0 ) {
			_timerObjSaveUserLecturePart = setTimeout( saveUserLecturePart, _timerTimeSaveUserLecturePart );
			return false;
		}

		_partAccumulateStudyTime += _partStudyTime;

		updateUserStudyPart();

		_timerObjSaveUserLecturePart = setTimeout( saveUserLecturePart, _timerTimeSaveUserLecturePart );
	}
}