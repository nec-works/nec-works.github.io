var uagent=navigator.userAgent.toLocaleLowerCase();
var isIPHONE = (uagent.search("iphone")>-1||uagent.search("ipod")>-1||uagent.search("ipad")>-1);
var isIPHONE8 = (uagent.search("iphone")>-1||uagent.search("ipod")>-1 || uagent.search("ipad")>-1) && /(8_)|(9_)/.test(uagent);
var isIPAD = (navigator.userAgent.match('iPad') != null); // iPAD 여부 확인
var isANDROID = (uagent.search("android")>-1||navigator.platform.toLocaleLowerCase().search("linux")>-1);
var isOPERA = (uagent.search("opera")>-1);

var _APPSTORE_URL = "https://itunes.apple.com/us/app/ebs-chodeung/id950938690?l=ko&ls=1&mt=8"; // iOS plist URL
var _PLAYSTORE_URL = "market://details?id=kr.ebs.primary.player"; // Android Play 스토어 URL
var _APP_INSTALL_CONFIRM = "EBS플레이어를 설치하시면 서비스를 이용할 수 있습니다.\n설치 하시겠습니까?"; // 앱을 설치할 경우 팝업 문구

function executeImgApp(url){
	if(isANDROID){
		var c="intent://"+url+"#Intent;";
		c+="scheme=ebsprimary;";
		c+="action=android.intent.action.VIEW;";
		c+="category=android.intent.category.BROWSABLE;";
		c+="package=kr.ebs.primary.player;end";
		window.location.href=c;
	}else{
		if(isIPHONE || isIPAD){
			var c = "ebsprimary://"+url;
			
			if(!checkApp()){
				checkInstalled();
			}
			
			if ( isIPHONE8 ) {
				var clickDirectLink4IOS8 = document.createElement("a");
				clickDirectLink4IOS8.href = c ;
				document.body.appendChild(clickDirectLink4IOS8);
				clickDirectLink4IOS8.click();
			}else{
				window.location.href= c;
			}
		}
	}
};

function checkInstalled(){
	if(isIPHONE || (isANDROID && isOPERA)){
		var a=new Date();
		setTimeout(function(){
			var b=new Date();
			if(b-a<3000){
				if(isIPHONE === true || isIPAD === true){
					window.location.href=_APPSTORE_URL;
				}else{
					if(isANDROID === true){
						window.location.href=_PLAYSTORE_URL;
					}
				}
			}
		},2500);
	}
}

