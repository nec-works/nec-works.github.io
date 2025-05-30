/**
 * 초중학 공통 호출하기 위한 스크립트
 */
var g_sSiteID   = "1";
var g_sInfoURL  = "";

function executeZoneApp(paramData){
	var dataArr = paramData.split("?");
	var type = dataArr[0];
	var data = getParameterFunction("data",paramData);
	g_sInfoURL = getParameterFunction("info-url",paramData);
	g_sInfoURL = g_sInfoURL +"V2";
	g_sSiteID = getParameterFunction("site-id",paramData);
	if(type == "player"){
		ZoneAppRequestStreaming(data);
	}else if(type == "download"){
		ZoneAppRequestDownload(data);
	}
	
}
