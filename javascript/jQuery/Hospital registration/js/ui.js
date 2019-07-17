// uiSearch定义
$.fn.UiSearch=function(){
	var ui=$(this);
	console.log($('.uiSearchSelected','uiSearch'));
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
$.fn.UiTab=function(header,concent,focusPrefix){
	var ui=$(this),
		tabs=$(header,ui),
		cons=$(concent,ui),
		focusPrefix=focusPrefix||'';
	tabs.on('click',function(){
		var index=$(this).index();
		tabs.removeClass(focusPrefix+'itemFocus').eq(index).addClass(focusPrefix+'itemFocus');
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
// ui-slider
$.fn.UiSlider=function(){
	var ui=$(this),
		wrap=$('.uiSliderWrap'),
		prev=$('.uiSliderArrow .left',ui),
		next=$('.uiSliderArrow .right',ui),
		tips=$('.uiSliderProcess .item',ui),
		items=$('.uiSliderWrap .item',ui);
		console.log(items);
	// 预定义全局变量
	var index=0,
		size=items.length,
		width=items.eq(0).width(),
		entableAuto=true;
	// 设置自动滚动感应
	ui.on('mouseover',function(){
		entableAuto=false;
	}).on('mouseout',function(){
		entableAuto=true;
	})
		
	// jquery空间命名，自定义事件
	wrap.on('movePrev',function(){
		if(index<=0){
			index=size;
		}
		index--;
		console.log(index);
		wrap.triggerHandler('moveTo',index);
	}).on('moveNext',function(){
		if(index>=size-1){
			index=-1;
		}
		index++;
		wrap.triggerHandler('moveTo',index);
	}).on('moveTo',function(event,index){
		wrap.css('left',index*width*-1);
		tips.removeClass('itemFocus').eq(index).addClass('itemFocus');
	}).on('autoMove',function(){
		setInterval(function(){
			entableAuto && wrap.triggerHandler('moveNext');
		},2000);
	}).triggerHandler('autoMove');

	// 启用自定义事件				
	prev.on('click',function(){
		wrap.triggerHandler('movePrev');
	})
	next.on('click',function(){
		wrap.triggerHandler('moveNext');
	})
	tips.on('click',function(){
		index=$(this).index();
		wrap.triggerHandler('moveTo',index);
	})
}	
// ui-cascading
$.fn.UiCascading=function(){
	var ui=$(this),
		selects=$('select',ui);
	selects.on('change',function(){
		var val=$(this).val(),
			index=selects.index(this);
		// 触发下一个select的更新,根据当前的值
		var where=$(this).attr('dataWhere');
		where=where?where.split(','):[];
		where.push($(this).val());
		selects.eq(index+1).attr('dataWhere',where.join(','))
						   .triggerHandler('reloadOptions');
		// 触发下一个之后的select的初始化（清楚数据项）
		ui.find('select:gt('+(index+1)+')').each(function(){
			$(this).attr('dataWhere','')
				   .triggerHandler('reloadOptions');
		})
	}).on('reloadOptions',function(){
		var method=$(this).attr('dataSearch'),
			// args=$(this).attr('dataWhere').split(','),
			data=AjaxRemoteGetData[method]($(this).attr('dataWhere'));//.apply(this,args),
			select=$(this);
			console.log(data);
		select.find('option').remove();
		$.each(data,function(i,item){
			var el=$('<option value="'+item+'">'+item+'</option>');
			select.append(el);
		})
	})
	selects.eq(0).triggerHandler('reloadOptions');
}

// 页面脚本逻辑
$(function(){
	$('.uiSearch').UiSearch();
	$('.concentMain').UiTab('.MainTitle>.item','.block>.blockWrap');
	$('.concentMain .block .blockWrap').UiTab('.blockCaption >a','.blockConcent>.blockBox','blockCaption');
	$('body').UiBackTop();
	$('.uiSlider').UiSlider();
	$('.uiCascrading').UiCascading();
	$('.systemMain').UiTab('.systemTab>.item','.Caption>.systemCaption');
 })