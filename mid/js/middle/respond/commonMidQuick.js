function closeQuick() {
	$('#quick_menu').html("");
	$('#quick_menu').css('z-index', '-1');
	$('#quick_menu').css('display', 'none');
}

function saveQuick() {
	
	var selCnt = 0;
	$('input[name*="menuId"]').each(function(index, value) {
		if ($(this).attr("checked")) {
			++selCnt;
		}
	});

	if (selCnt==0) {
		alert("등록할 퀵메뉴를 선택하세요.");
		return;
	}

	if (selCnt>5) {
		alert("5개까지만 가능합니다.");
		return;
	}

	document._quick.submit();
}

function quickLogin(){
	alert("로그인 후 사용 가능합니다.");
	LoginFocus();
}