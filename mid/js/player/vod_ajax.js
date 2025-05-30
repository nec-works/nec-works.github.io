function getHttpRequestObject() {

	var http_request = null;

	if (window.XMLHttpRequest) {
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) {
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
			}
		}
	}

	return http_request;
}

function makeRequest(url, param_vars, bFlag) {
	try {
		var http_request = getHttpRequestObject();

		if (!http_request) {
			alert('Giving up :( Cannot create an XMLHTTP instance');
			return false;
		}

		http_request.onreadystatechange = function rtn_back() {
			if (http_request.readyState == 4) {
				if (http_request.status == 200) {
					// alert(http_request.responseText);
					if (!bFlag) {
						// alert(http_request.responseText);
						// alert(http_request.responseXML);
					} else if (bFlag == "memo") {
						if (http_request.responseText.search("OK") > -1) {
							document.getElementById("orgMemo").value = document.getElementById('mmDescr').value;
							alert("메모가 저장 되었습니다.");
						} else {
							alert("메모 저장이 실패 하였습니다.");
						}
					} else if (bFlag == "registWebmark") {
						if (http_request.responseText.search("OK") > -1) {
							alert("웹갈피가 저장 되었습니다.");
							getWebmarkList(true);
						} else {
							//alert(trim(http_request.responseText));
						}
					} else if (bFlag == "getWebmarkList") {
						setWebmarkList(http_request.responseXML);
					} else if (bFlag == "delWebmark") {
						if (http_request.responseText.search("OK") > -1) {
							alert("웹갈피가 삭제 되었습니다.");
							getWebmarkList(true);
						} else {
							alert("웹갈피 삭제가 실패 하였습니다.");
						}
					} else if (bFlag == "webmark_list") {
						setWebmarkList(http_request.responseXML);
					} else if (bFlag == "class_list") {
						setLectureList(http_request.responseXML);
					} else if (bFlag == "class_info") {
						setLectureInfo(http_request.responseXML);
					} else if (bFlag == "updateBookmark") {
						// 웹갈피정보
						// 업데이트
						if (http_request.responseText.search("OK") > -1) {
							alert("웹갈피 정보가 수정 완료되었습니다.");
							getWebmarkList(true);
							setWebmarkInfo(updateWebmarkListIndex);
						} else {
							//alert(trim(http_request.responseText)); // http_request.responseText
						}
					} else if (bFlag == "notifyBookmark") {
						if (http_request.responseText.search("OK") > -1) {
							alert("웹갈피가 신고 되었습니다.");
							getWebmarkList(false);
						} else {
							//alert(trim(http_request.responseText));
						}
					} else if (bFlag == "resetIndexList") {
						if( $("#chapter_list").length > 0){
							$("#chapter_list").html( http_request.responseText );
						}
						setRight('chapter');
					} else if (bFlag == "saveEducerti") {
						redirectEducerti();
					}  
					
					http_request = null;
				} else {
					alert('The request has been failed. : ' + bFlag + " / " + http_request.status);
					http_request = null;
				}
			} else {
			}

		};

		http_request.open('POST', url, false);
		http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		//http_request.setRequestHeader("Content-length", param_vars.length);
		//http_request.setRequestHeader("Connection", "close");
		http_request.send(param_vars);
		
	} catch (e) {
		if(e.message.indexOf('Synchronous XHR in page dismissal') != -1){
			//NetworkError: Failed to execute 'send' on 'XMLHttpRequest': Failed to load '/user/lecture/status/save': Synchronous XHR in page dismissal. 오류시 beacon으로 학습이력 저장
			if(navigator.sendBeacon){
				navigator.sendBeacon(url+"?"+param_vars);
			}
		}

	}
	return false;
}