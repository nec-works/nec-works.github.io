var TabFade = (function(){
	var element = {
		el : "",
		tabBox: "",
		tabActive: "on",
		index:0,
		clickCallback:""
	}
	var TabFadeEvnt = function(_element){
		if(_element !== undefined)
			this.element = _element;
		else
			this.element = element;
		
		this.init();
	};
	return TabFadeEvnt;
})();

TabFade.prototype.options = function(){
	var e = this.element;
	
	this.defaults = {
		el: e.el,
		tabBox: e.tabBox,
		index: e.index,
		height: function(){
			var el = this.el;
			var height = el.height();
			return height;
		},
		tab: function(){
			var tab = this.tabBox.children();
			return tab;
		},
		destroyFlag: false,
		init: function(){
			var t = this;
			var elemnt = t.el;
			var height = t.height();
			var tabA = t.tab().find("a");
			var index = t.index || 0;
			var fadeElemnt = elemnt.children();

			document.body.onresize = function(){
				if(t.destroyFlag) return;

				index = t.index || 0;
				elemnt.attr("style", "");
				elemnt.children().attr("style", "");
				fadeElemnt.attr("style", "");
				fadeElemnt.eq(index).css("display","block");
				fadeElemnt.removeClass(e.tabActive);
				fadeElemnt.eq(index).addClass(e.tabActive);
				
				height = t.height();
				elemnt.css({"height": height, "position":"relative"});
				fadeElemnt.css({"height": height, "position":"absolute", "top":"0", "right":"0", "left":"0"});
			}

			tabA.on("click", function(evnt){
				evnt.preventDefault ? evnt.preventDefault() : evnt.returnValue = false;
				e.clickCallback();
				var idx = tabA.index(this);
				t.index = idx;

				var prevIdx2 = 0;
				for(var i = 0; i < tabA.length; i++){
					if(tabA.eq(i).parent(".tab").hasClass("on"))
						prevIdx2 = i;
				}
				
				if(prevIdx2 < idx)
					$(this).parents(".tab_main_curriculum").trigger('next.owl.carousel');
				if(prevIdx2 > idx)
					$(this).parents(".tab_main_curriculum").trigger('prev.owl.carousel');
				
				if($(this).parents().hasClass("challenge_wrap") && $(window).width()>980){
					
					elemnt.attr("style", "");
					elemnt.children().attr("style", "");
					// fadeElemnt.attr("style", "");
					tabA.parent().removeClass(e.tabActive);
					tabA.parent().eq(idx).addClass(e.tabActive);
					fadeElemnt.removeClass(e.tabActive);
					fadeElemnt.stop().fadeOut('fast');
					fadeElemnt.eq(idx).stop().fadeIn('fast');
				}else{
					height = t.height();
					elemnt.css({"height": height, "position":"relative"});
					fadeElemnt.css({"height": height, "position":"absolute", "top":"0", "right":"0", "left":"0"});
					
					tabA.parent().removeClass(e.tabActive);
					tabA.parent().eq(idx).addClass(e.tabActive);
					fadeElemnt.removeClass(e.tabActive);
					fadeElemnt.stop().fadeOut('fast');
					fadeElemnt.eq(idx).stop().fadeIn('fast').addClass(e.tabActive);
				}
				//callBack();
			});


		}
	}
	if(!this.defaults.destroyFlag)
		this.defaults.init();
	
	return this.defaults;
}

TabFade.prototype.init = function(){
	this.options();
}

TabFade.prototype.destroy = function(flag){
	var e = this.element;
	var d = this.defaults;
	var elemnt = d.el;
	var index = d.index || 0;
	var fadeElemnt = elemnt.children();
	var tab = d.tab();

	elemnt.attr("style", "");
	elemnt.children().attr("style", "");
	fadeElemnt.attr("style", "");
	fadeElemnt.eq(index).css("display","block");
	fadeElemnt.removeClass(e.tabActive);
	fadeElemnt.eq(index).addClass(e.tabActive);

	d.destroyFlag = flag;

	return d.destroyFlag;
}

/*
	var content_selector = $(".series_content");//fade 처리될 컨텐츠 영역
	var tab_selector = $(".series_wrap .tab_main_curriculum");//탭영역
	var tabFadeEvnt;//이벤트가 발생할 변수 선언

	tabFadeEvnt = new TabFade({//tabFade 플러그인 실행
		el: selector_content,
		tabBox: tab_selector,
		tabActive: "on",//active 처리될 영역
		clickCallback: function(){
			콜백함수
		}
	});
	
	//반응형일경우 처리 해야될 이벤트
	$(window).resize(function(){
		var width = $(window).width();
		if(width < 980){
			tabFadeEvnt.destroy(true);//스타일을 전체 삭제 시켜줌
		}else{
			tabFadeEvnt.destroy(false);//스타일을 다시 복구
		}
	}).resize();
*/