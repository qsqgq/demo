// uiSearch定义
$.fn.UiSearch=function(){
	var ui=$(this);
	$('.uiSearchSelected',ui).on('click',function(){
		$('.uiSearchSelectList').show();
		return false;
	});
	$('.uiSearchSelectList a',ui).on('click',function(){
		$('.uiSearchSelected').text($(this).text());
		$('.uiSearchSelectList').hide();
		return false;
	});
	$('body').on('click',function(){
		$('.uiSearchSelectList').hide();
	})
}

// ui-tab定规
$.fn.UiTab=function(header,concent){
	var ui=$(this),
		tabs=$(header,ui),
		cons=$(concent,ui),
		focusPrefix=focusPrefix||'';
	tabs.on('click',function(){
		var index=$(this).index();
		tabs.removeClass('itemFocus').eq(index).addClass('itemFocus');
		cons.hide().eq(index).show();
		
		return false;
	})

}
// ui-backtop
$.fn.UiBackTop=function(){
	var ui=$(this),
		el=$('<a href="#0" class="UibackTop"></a>'),
		windowHeight=$(window).height();
	ui.append(el);
	$(window).on('scroll',function(){
		var top=$('html,body').scrollTop()+windowHeight;
		if(top>windowHeight){
			el.show();
		}else{
			el.hide();
		}
	})
	el.on('click',function(){
		$(window).scrollTop(0);
	})
}

// 页面脚本逻辑
$(function(){
	$('.uiSearch').UiSearch();
	$('body').UiBackTop();
	$('.systemMain').UiTab('.systemTab>.item','.Caption>.systemCaption');
 })