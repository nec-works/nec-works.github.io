function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
// png alpha channels
function setPng24(obj) {
	obj.width=obj.height=1;
	obj.className=obj.className.replace(/\bpng24\b/i,''); 
	obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');";
	obj.src='';
	return '';
}

function getId(id){
	return document.getElementById(id);
}

function obj_checker(obj){
	if (!obj) return false;
	if (obj.nodeType != 1){ 
		if (getId(obj)){ 
			obj = getId(obj);
		} else {
			if ((obj.indexOf('.') > -1) && (obj.split('.').length <= 2)){
				obj = getObjByClassName(obj.split('.')[obj.split('.').length-1],obj.split('.')[obj.split('.').length-2]);
			} else {
				obj = false;
			}
		}
	}
	return obj;
}

function getTagName(name,obj){
	if (!obj){
		if (name == "body"){
			obj = document;
		} else {
			obj = document.body;
		}
	} else {
		obj = obj_checker(obj);
	}
	return obj.getElementsByTagName(name);
}

function getObjByClassName(selClassName,eleName,obj){
	if (!selClassName) return false;
	if (!obj){
		obj = document.body;
	} else {
		obj = obj_checker(obj);
	}
	var eleArray = getTagName(eleName||'*',obj);
	var selClassEle = new Array;
	var n = 0;
	for (var i=0; i<eleArray.length; i++){
		if ((eleArray[i].className == selClassName) || (eleArray[i].className.indexOf(' ' + selClassName) > -1) || (eleArray[i].className.indexOf(selClassName + ' ') > -1)){
			selClassEle[n] = eleArray[i];
			n = n+1;
		}
	}
	if (selClassEle.length != 0){
		return selClassEle;
	} else {
		return false;
	}
}

function getParentNode(elem){
    do {
		elem = elem.parentNode;
    } while (elem && elem.nodeType != 1);
    return elem;
}
function getParentNodeType(elem, type){
    do {
		elem = elem.parentNode;
    } while (elem && elem.nodeName.toLowerCase() != type);
    return elem;
}

function getFirstChild(elem){
	elem = elem.firstChild;
	return (elem && elem.nodeType != 1) ? getNextNode(elem) : elem;
}

function getNextNode(elem){
	do{
		elem = elem.nextSibling;
	} while (elem && elem.nodeType != 1);
	return elem;
}
function getPrevNode(elem){
	do{
		elem = elem.previousSibling;
	} while (elem && elem.nodeType != 1);
	return elem;
}

function getChildNodes(elem,type){
	var j = 0;
	var c = elem.childNodes;
	var elemChilds = new Array();
	for (var i=0; i<c.length; i++) {
		if (type){
			if ((c[i].nodeType == 1) && (c[i].nodeName.toLowerCase() == type)){
				elemChilds[j] = c[i];
				j++;
			}
		} else {
			if (c[i].nodeType == 1){
				elemChilds[j] = c[i];
				j++;
			}
		}
	}
	return elemChilds;
}

function setObjectStatus_on(selObj,excpEleName){
	if (!selObj) return false;
	if (selObj.tagName.toLowerCase() == 'img'){ 
		if (selObj.src.indexOf('_on.gif') <= -1){
			if (selObj.src.indexOf('_off.gif') > -1){ 
				selObj.src = selObj.src.replace("_off.gif","_on.gif");
			} else {
				selObj.src = selObj.src.replace(".gif","_on.gif");
			}
		}
	} else {
		if (!(selObj.className) || (selObj.className == "")){
			selObj.className = "on";
		} else {
			if ((selObj.className != "on") && (selObj.className.indexOf(' on') <= -1)){
				if (selObj.className.indexOf('off') > -1){
					selObj.className = selObj.className.replace("off","on");
				} else {
					selObj.className = selObj.className + " on";
				}
			}
		}
	}

	if (excpEleName && getTagName(excpEleName,selObj)[0]){ 
		var excpEle = getTagName(excpEleName,selObj)[0];
		setObjectStatus_on(excpEle);
	}
}
function setObjectStatus_reset(selObj,excpEleName){
	if (!selObj) return false;
	if (selObj.tagName.toLowerCase() == 'img'){ 
		if (selObj.src.indexOf('_off.gif') <= -1){
			if (selObj.src.indexOf('_on.gif') > -1){ 
				selObj.src = selObj.src.replace("_on.gif","_off.gif");
			}
		}
	} else {
		if (selObj.className && (selObj.className != "")){
			if (selObj.className.indexOf(' on') > -1){
				selObj.className = selObj.className.replace(" on","");
			} else {
				selObj.className = selObj.className.replace("on","");
			}
		}
	}

	if (excpEleName && getTagName(excpEleName,selObj)[0]){
		var excpEle = getTagName(excpEleName,selObj)[0];
		setObjectStatus_reset(excpEle);
	}
}

function setObjectStatus_hidden(selObj){
	if (!selObj) return false;
	if (!(selObj.className) || (selObj.className == "")){
		selObj.className = "hidden_text";
	} else {
		if ((selObj.className != "hidden_text") && (selObj.className.indexOf(' hidden_text') <= -1)){
			selObj.className = selObj.className + " hidden_text";
		}
	}
}

function setObjectStatus_show(selObj){
	if (!selObj){return false;}
	if (selObj.className && (selObj.className != "")){
		if (selObj.className.indexOf(' hidden_text') > -1){
			selObj.className = selObj.className.replace(" hidden_text","");
		} else {
			selObj.className = selObj.className.replace("hidden_text","");
		}
	}
}

function openClose(open, close){
	//setObjectStatus_hidden(obj_checker(close));
	obj_checker(close).style.display = 'none';
	obj_checker(open).style.display = 'block';
	//setObjectStatus_show(obj_checker(open));
	setObjectStatus_show();
	if (!obj_checker('p.p_sch')[0]) return false;
	obj_checker('p.p_sch')[0].innerHTML.indexOf('간편검색') <= -1 ? obj_checker('p.p_sch')[0].innerHTML='<span>간편검색</span>을 하시면 강좌를 원하시는 내용으로 찾을 수 있습니다.' : obj_checker('p.p_sch')[0].innerHTML = '<span>상세검색</span>을 하시면 강좌를 상세히 찾을 수 있습니다.';
}


function leftFolding(){
	if (!obj_checker('lnb')) return false;
	var tab = getChildNodes(obj_checker('lnb'),'li');
	for (var i = 0;i<tab.length ;i++ ){
		tab[i].onclick = function() {
			for (var j = 0 ;j<tab.length ;j++ ){
				setObjectStatus_reset(tab[j]);
				setObjectStatus_reset(getTagName('img',tab[j])[0]);
				setObjectStatus_on(this);
				setObjectStatus_on(getTagName('img',this)[0]);
				if (!getTagName('ul', this).length == 0){
					var tabimg = getTagName('img', getTagName('ul', this)[0]);
					for (var i = 0;i<tabimg.length ;i++ ){
						tabimg[i].onmouseover = function() {setObjectStatus_on(this);}
						tabimg[i].onmouseout = function() {setObjectStatus_reset(this);}
					}
				}
			}
		}
	}
}

function leftFolding_oth(){
	obj_checker('a.lnb_close')[0].onclick = function() {
		this.style.display = 'none';
		obj_checker('a.lnb_open')[0].style.display = 'block';
		allcose_1depth('li', 'lnb');
		setObjectStatus_show(getChildNodes(obj_checker('lnb'),'li')[0]);
		setObjectStatus_show(getChildNodes(obj_checker('lnb'),'li')[1]);
		setObjectStatus_show(getChildNodes(obj_checker('lnb'),'li')[2]);
		setObjectStatus_show(getChildNodes(obj_checker('lnb'),'li')[3]);
	}
	obj_checker('a.lnb_open')[0].onclick = function() {
		this.style.display = 'none';
		obj_checker('a.lnb_close')[0].style.display = 'block';
		allopen_1depth('li', 'lnb');
	}
}

function faq(obj){
	var elem = getChildNodes(obj_checker(obj),'dt');
	for (var i = 0;i<elem.length ;i++ ){
		elem[i].onclick = function() {
			alloff_1depth('dt', obj);
			allcose_1depth('dd', obj);
			setObjectStatus_on(this);
			setObjectStatus_show(getNextNode(this));
		}
	}
}
function allcose(selClassName,eleName,obj){
 elem = getObjByClassName(selClassName,eleName,obj);
	for (var i = 0;i<elem.length ;i++ ){
		setObjectStatus_hidden(elem[i]);
	}
}
function allcose_1depth(eleName,obj){
 elem = getChildNodes(obj_checker(obj),eleName);
	for (var i = 0;i<elem.length ;i++ ){
		setObjectStatus_hidden(elem[i]);
	}
}
function allopen_1depth(eleName,obj){
 elem = getChildNodes(obj_checker(obj),eleName);
	for (var i = 0;i<elem.length ;i++ ){
		setObjectStatus_show(elem[i]);
	}
}
function alloff(selClassName,eleName,obj){
 elem = getObjByClassName(selClassName,eleName,obj);
	for (var i = 0;i<elem.length ;i++ ){
		setObjectStatus_reset(elem[i]);
	}
}
function alloff_1depth(eleName,obj){
 elem = getChildNodes(obj_checker(obj),eleName);
	for (var i = 0;i<elem.length ;i++ ){
		setObjectStatus_reset(elem[i]);
	}
}
function tbl_option(){
	if (getObjByClassName('info','span').length==0) return false;
	var tbl_option_btn = getObjByClassName('info','span');
	for (var i = 0;i<tbl_option_btn.length ;i++ ){
		tbl_option_btn[i].onmouseover = function() {
			setObjectStatus_show(getObjByClassName('tooltip','span',this)[0]);
		}
		tbl_option_btn[i].onmouseout = function() {
			setObjectStatus_hidden(getObjByClassName('tooltip','span',this)[0]);
		}
	}
}

/* 기존 말풍선 스크립트
function tbl_option(){
	if (getObjByClassName('lecture_btn','span').length==0) return false;
	var tbl_option_btn = getObjByClassName('lecture_btn','span');
	for (var i = 0;i<tbl_option_btn.length ;i++ ){
		tbl_option_btn[i].onmouseover = function() {
			setObjectStatus_on(getTagName('img',this)[0]);
			setObjectStatus_show(getObjByClassName('tooltip','span',this)[0]);
		}
		tbl_option_btn[i].onmouseout = function() {
			setObjectStatus_reset(getTagName('img',this)[0]);
			setObjectStatus_hidden(getObjByClassName('tooltip','span',this)[0]);
		}
	}
}
*/

function tbl_option1(){
	if (getObjByClassName('tooltip1').length==0) return false;
	var tbl_option_btn = getObjByClassName('tooltip1');
	for (var i = 0;i<tbl_option_btn.length ;i++ ){
		tbl_option_btn[i].onmouseover = function() {
			setObjectStatus_show(getObjByClassName('layer_pop','div',this)[0]);
		}
		tbl_option_btn[i].onmouseout = function() {
			setObjectStatus_hidden(getObjByClassName('layer_pop','div',this)[0]);
		}
	}
}


// 탭
function tabfolder(ID, Class){
	var tab = getTagName(Class,ID);
	for (var i = 0;i<tab.length ;i++ ){
		tab[i].onclick = function() {
			for (var j = 0 ;j<tab.length ;j++ ){
			setObjectStatus_reset(getFirstChild(tab[j]));
			setObjectStatus_reset(tab[j]);
			setObjectStatus_reset(getFirstChild(getFirstChild(tab[j])));
			setObjectStatus_hidden(getNextNode(tab[j]));
			setObjectStatus_on(getFirstChild(this));
			setObjectStatus_on(this);
			setObjectStatus_on(getFirstChild(getFirstChild(this)));
			setObjectStatus_show(getNextNode(this));
			}
		}
	}
}

//탭new
function newTabFolder(tabObj, tabChild, listObj){
    var arr = $('.'+tabObj+' '+tabChild).toArray();
    for(var i=0;i<arr.length;i++){
        arr[i].onclick = function(){
        	if(tabChild == 'img'){
                for(var j=0; j<arr.length; j++){
                	$(arr[j]).attr("src", $(arr[j]).attr("src").replace('_on', '_off'));
                }
                $(this).attr("src", $(this).attr("src").replace('_off', '_on'));
        	}else{
                $('.'+tabObj+' '+tabChild).removeClass('on');
                $(this).addClass('on');
        	}
            var index = $('.'+tabObj+' '+tabChild).index(this);
            $('.'+listObj).addClass('hidden_text');
            $('.'+listObj+':eq('+index+')').removeClass('hidden_text');
        }
    }
}

//공지&이벤트 탭
function tabfolder_board(ID, Class, banner){
	var tab = getTagName(Class,ID);
	for (var i = 0;i<tab.length ;i++ ){
		tab[i].onclick = function() {
			for (var j = 0 ;j<tab.length ;j++ ){
			setObjectStatus_reset(getFirstChild(tab[j]));
			setObjectStatus_reset(tab[j]);
			setObjectStatus_reset(getFirstChild(getFirstChild(tab[j])));
			setObjectStatus_hidden(getNextNode(tab[j]));
			setObjectStatus_on(getFirstChild(this));
			setObjectStatus_on(this);
			setObjectStatus_on(getFirstChild(getFirstChild(this)));
			setObjectStatus_show(getNextNode(this));
			}

			getId("main_board_banner").style.visibility = "visible";
			if(getNextNode(this).id == "EVENT" && banner == "false"){
				getId("main_board_banner").style.visibility = "hidden";
			}
		}
	}
}

//이미지 갤러리
function gallery(galleryID,startPoint, size, viewNumber){
	var ID = obj_checker(galleryID);
	var mover = getTagName('ul',ID)[0];
	var moverElem = getTagName('li',ID);
	var leftButton = getObjByClassName('prev','a',ID)[0];
	var rightButton = getObjByClassName('next','a',ID)[0];
	mover.style.left = startPoint+"px";
	mover.leftPosition = startPoint;
	leftButton.onclick = function(){
		mover.style.left = mover.leftPosition + "px";
		if (parseInt(mover.style.left) >= 0){
			leftButton.className = "hidden_text";//alert('처음');
		} else {
			leftButton.className = "prev";
			rightButton.className = "next";
			mover.leftPosition += size;
		}
	}
	rightButton.onclick = function(){
		mover.style.left = mover.leftPosition + "px";
		if (parseInt(mover.style.left) == -parseInt((moverElem.length-viewNumber)*size - startPoint)){
			rightButton.className = "hidden_text";//alert('끝');
		} else {
			leftButton.className = "prev";
			rightButton.className = "next";
			mover.leftPosition -= size;
		}
	}
}

/* 2010-12-21 정리좀 */
function tbl_option_etc(ID){
	if (!obj_checker(ID)) return false;
	var tbl_option_btn = getObjByClassName('lecture_btn','span',ID);
	for (var i = 0;i<tbl_option_btn.length ;i++ ){
		getTagName('img',tbl_option_btn[i])[0].onclick = function() {
			alloff('onoff','img',ID);
			setObjectStatus_on(this);
			//if (getParentNodeType(this, 'tr').className=='btn_area'){
				allcose('option_area','tr',ID);
				var openTr = getNextNode(getParentNodeType(this, 'tr'));
				setObjectStatus_show(openTr);
				allcose('select_feature', 'div' ,ID);
				setObjectStatus_show(getObjByClassName('select_feature','div',openTr)[0]);
			//}
		}
		getTagName('img',tbl_option_btn[i])[1].onclick = function() {
			alloff('onoff','img',ID);
			setObjectStatus_on(this);
				allcose('option_area','tr',ID);
				var openTr = getNextNode(getParentNodeType(this, 'tr'));
				setObjectStatus_show(openTr);
				allcose('select_feature', 'div' ,ID);
				setObjectStatus_show(getObjByClassName('select_feature','div',openTr)[1]);
		}
		getTagName('img',tbl_option_btn[i])[2].onclick = function() {
			alloff('onoff','img',ID);
			setObjectStatus_on(this);
				allcose('option_area','tr',ID);
				var openTr = getNextNode(getParentNodeType(this, 'tr'));
				setObjectStatus_show(openTr);
				allcose('select_feature', 'div' ,ID);
				setObjectStatus_show(getObjByClassName('select_feature','div',openTr)[2]);
		}
	}
	var option_close = getObjByClassName('close_feature','a',ID);
	for (var i = 0;i<option_close.length ;i++ ){
		option_close[i].onclick = function(){
				allcose('option_area','tr',ID);
			setObjectStatus_hidden(getParentNodeType(this, 'div'));
			alloff('onoff','img',ID);
		}
	}
}

// 추후삭제 렌더링용
function transPath() {
	var pagePath = location.href;
	var imgs = document.body.getElementsByTagName('img');
	var link = document.getElementsByTagName('link');
	var tmpinput = document.getElementsByTagName('input');
	if((pagePath.indexOf('?M') != -1) || (pagePath.indexOf('?m') != -1)) {
		for(var i = 0; i < imgs.length; i++) {
			imgs[i].setAttribute('src', imgs[i].getAttribute('src').replace('/primary/', '/middle/'));
		}
		for(var i = 0; i < link.length; i++) {
			link[i].setAttribute('href', link[i].getAttribute('href').replace('/primary/', '/middle/'));
		}
		for(var i = 0; i < tmpinput.length; i++) {
			if (tmpinput[i].getAttribute('src')==null){
			}else{
			tmpinput[i].setAttribute('src', tmpinput[i].getAttribute('src').replace('/primary/', '/middle/'));
			}
		}
	}
}
function mainTab(obj, elem){
	if (!obj){return false;}
	elem = getTagName(elem,obj);
	for (var i = 0;i<elem.length ;i++ ){
		elem[i].onclick = function() {
			for (var j = 0 ;j<elem.length ;j++ ){
				setObjectStatus_reset(elem[j]);
				setObjectStatus_on(this);
				if (!getTagName('img',this).length==0){
					setObjectStatus_reset(getTagName('img',elem[j])[0]);
					setObjectStatus_on(getTagName('img',this)[0]);
				}
			}
		}
	}
}
function onoff(id, elem){
	elem = getTagName(elem,obj_checker(id));
	for (var i = 0;i<elem.length ;i++ ){
		elem[i].onclick = function() {
			for (var j = 0 ;j<elem.length ;j++ ){
				setObjectStatus_reset(elem[j]);
				setObjectStatus_on(this);
			}
		}
	}
}
function label_htext(){
	var elem = getObjByClassName('label_htext','input');
	for (var i = 0;i<elem.length ;i++ ){
		elem[i].onfocus = function() {
			setObjectStatus_hidden(getPrevNode(this));
		}
	}
}

function detail_area(id, elem){
	elem.onclick = function() {
		if (id.className.indexOf(' hidden_text') <= -1){
			setObjectStatus_hidden(obj_checker(id));
			setObjectStatus_reset(getTagName('img',this)[0]);
		}else{
			setObjectStatus_show(obj_checker(id));
			setObjectStatus_on(getTagName('img',this)[0]);
		}
	}
}

function getStyle(elem,name){
	if (elem.style[name])
		return elem.style[name];
	else if (elem.currentStyle)
		return elem.currentStyle[name];
	else if (document.defaultView && document.defaultView.getComputedStyle){
		name = name.replace(/([A-Z])/g,"-$1");
		name = name.toLowerCase();
		var s = document.defaultView.getComputedStyle(elem,"");
		return s && s.getPropertyValue(name);
	} else
		return null;
}
function getWidth(elem){
	return parseInt(getStyle(elem,'width'));
}
// reset CSS
function resetCSS(elem,prop){
    var old = {};
    for (var i in prop){
		old[ i ] = elem.style[ i ];
		elem.style[ i ] = prop[ i ];
    }
    return old;
}
function fullWidth(elem){
    if (getStyle(elem,'display') != 'none')
        return elem.offsetWidth || getWidth(elem);
    var old = resetCSS(elem,{
        display: '',
        visibility: 'hidden',
        position: 'absolute'
    });
    var w = elem.clientWidth || getWidth(elem);
    restoreCSS(elem,old);
    return w;
}
// restore CSS
function restoreCSS(elem,prop){
    for (var i in prop)
		elem.style[ i ] = prop[ i ];
}
/*2011-01-26 Marquee */
function marquee(){
	var oDiv = obj_checker('marquee');//컨텐츠
	var oDivWidth = fullWidth(obj_checker('marquee'));//컨텐츠 위드값
	var oPos = fullWidth(getParentNode(obj_checker('marquee')));//컨텐츠 부모 위드값/시작점
	if(parseInt(oDiv.style.left) <= -parseInt(oDivWidth)){
		oDiv.style.left = oPos + 'px';
	}else{
	oDiv.style.left = parseInt(oDiv.style.left)-3 + 'px';
	}
	setTimeout(marquee,100);

}

var tabTime_id;
function imggall(id){
	var objimg = getTagName('img',getTagName('p',obj_checker(id))[0])[0];
	var objimgback = getTagName('img',getTagName('p',obj_checker(id))[0])[1];
	var elem = getTagName('a',getTagName('div',obj_checker(id))[0]);
	var parentObjImg = getParentNode(objimgback);
	for (var i = 0;i<elem.length ;i++ ){
		elem[i].onclick = function() {
			clearTimeout(tabTime_id);
			onoff(getTagName('div',obj_checker(id))[0], 'img');
			
			objimg.setAttribute('src', this.getAttribute('href'));
			//parentObjImg.setAttribute('href',this.getAttribute('outlink'));
			$("#img_a").attr('href',this.getAttribute('outlink'));
			tabTime_id = setTimeout("Tab_Time('"+id+"')",arrTimes[0]);
			return false;
		}
	}
}

function Tab_Time(id){
	var objimg = getTagName('img',getTagName('p',obj_checker(id))[0])[0];
	var objimgback = getTagName('img',getTagName('p',obj_checker(id))[0])[1];
	var elem = getTagName('a',getTagName('div',obj_checker(id))[0]);
	var index = 0;
	for (var i = 0;i<elem.length ;i++ ){
		var imgEl = getTagName("img", getTagName('a',getTagName('div',obj_checker(id))[0])[i]);
		if (imgEl[0].src.indexOf("_on") != -1)
		{
			index = i +1;
			break;
		}
	}
	if (index >2)
	{
		index=0;
	}


	var element = getTagName("img", getTagName('a',getTagName('div',obj_checker(id))[0])[index]);
	for (var i = 0;i<elem.length ;i++ ){
		var imgEl = getTagName("img", getTagName('a',getTagName('div',obj_checker(id))[0])[i]);
		if (index == i)
		{
		   imgEl[0].src = imgEl[0].src.replace("_off","_on");
		}
		else{
			imgEl[0].src = imgEl[0].src.replace("_on","_off");
		}
	}
	objimg.setAttribute('src', elem[index].getAttribute('href'));
	var parentObjImg = getParentNode(objimgback);
	//parentObjImg.setAttribute('href',elem[index].getAttribute('outlink'));
	$("#img_a").attr('href',elem[index].getAttribute('outlink'));
	tabTime_id = setTimeout("Tab_Time('"+id+"')",arrTimes[index]);
}


addLoadEvent(function(){
	//transPath();
	mainTab(obj_checker('ul.tab_option')[0], 'li');
	mainTab(obj_checker('div.tab_sorting')[0], 'a');
	leftFolding();
});



