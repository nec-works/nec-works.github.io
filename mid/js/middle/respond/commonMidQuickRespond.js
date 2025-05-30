
// 반응형 설정창 클릭 이벤트 함수
function showQuickMid() {
	$('#quick_menu').load('/layout/quick/set/formMid', function() {
		//$('#quick_menu').css('display', '');
		$('#quick_menu').show();
		$('.quick_wrap .quick_box').css('z-index', '100');
	});
} 