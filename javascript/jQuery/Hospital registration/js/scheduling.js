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

$(function(){
	$('.uiSearch').UiSearch();
	$('body').UiBackTop();

	var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
		weekDay=7,
		index=0,
		days=weekDay+21,
		date=new Date(),
		time=date.getTime();
		width=$('.scheduleBox').width();
	for(var i=0;i<days;i++){
		var newTime=time+i*86400000,
			newDay=new Date(newTime),
			html=[],
			newWeekDay=week[newDay.getDay()],
			years=newDay.getFullYear(),
			months=newDay.getMonth()+1,
			newDays=newDay.getDate();

		html.push('<div class="scheduleitem"><div class="date">'+newWeekDay+'<br>'+years+'-'+months+'-'+newDays+'</div>');
		html.push('<div class="state"></div>');
		html.push('<div class="state stateFull">约满</div>');
		html.push('<div class="state"></div></div>');
		$('.scheduleBoxWrap').append(html.join(''));
	}
	$('.prevBox').click(function(){
		index--;
		if(index<0){
			index=0;
		}
		$('.scheduleBoxWrap').css('left',index*width*-1-2*index);
	})
	$('.nextBox').click(function(){
		index++;
		if(index>3){
			index=3;
		}
		$('.scheduleBoxWrap').css('left',index*width*-1-2*index);
	})
})
