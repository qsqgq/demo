$(function(){
	var index=0,
		time=null,
		bannerPics=$('.bannerPic'),
		bannerYds=$('.bannerYd').children('span'),
		subMenus=$('.bannerMenu').children('ul').children('li'),
		SubMenuInnerBoxs=$('.SubMenuInnerBox');
		
// banner区轮播图动效
	
	// 给bannerPicBox绑定鼠标滑过事件，鼠标滑过图片停止轮播
		$('.bannerPicBox').mouseover(function(){
			if(time){
				clearInterval(time);
			}
		})
	
	// 给bannerPicBox绑定鼠标离开事件，鼠标离开图片每秒轮播
		$('.bannerPicBox').mouseout(function(){
			time=setInterval(function(){
				index++;
				if(index>=bannerPics.length){
					index=0;
				}
				change();
			},1000)
		})
	
	// 图片自动轮播
	$('.bannerPicBox').mouseout();
	
	// 给圆点绑定点击事件，点击圆点出现对应索引banner图
	bannerYds.click(function(){
		index=$(this).index();
		change();
	})

	// 给上一张绑定点击事件，点击上一张出现对应索引banner图
	$('.bannerPrev').click(function(){
		index--;
		if(index<0){
			index=bannerPics.length-1;
		}
		console.log(index);
		change();
	})

	// 给下一张绑定点击事件，点击上一张出现对应索引banner图
	$('.bannerNext').click(function(){
		index++;
		if(index>bannerPics.length-1){
			index=0;
		}
		change();
	})

	// 图片切换函数
	function change(){
		bannerPics.eq(index).addClass('activePic').siblings().removeClass('activePic');
		bannerYds.eq(index).addClass('activeYd').siblings().removeClass('activeYd');
	}

// banner区导航菜单动效

	// 给主导航菜单绑定事件
	for(var i=0;i<subMenus.length;i++){
		subMenus.eq(i).attr('id',i);
		subMenus.mouseover(function(){
			var idx=this.id;
			$('.SubMenuBox').removeClass('hideSubMenu');
			SubMenuInnerBoxs.eq(idx).css('display','block').siblings().css('display','none');
		})
	}

	//给主菜单绑定事件，当鼠标离开的时候，子菜单不显示
	subMenus.mouseout(function(){
		$('.SubMenuBox').addClass('hideSubMenu');
	})

	//给子菜单绑定鼠标滑过事件，当鼠标滑过子菜单，子菜单显示
	SubMenuInnerBoxs.mouseover(function(){
		$('.SubMenuBox').removeClass('hideSubMenu');
	})

	//给子菜单绑定离开事件，当鼠标离开子菜单，子菜单隐藏
	SubMenuInnerBoxs.mouseout(function(){
		$('.SubMenuBox').addClass('hideSubMenu');
	})

// 楼层动效

	// 给1F楼选项卡绑定事件，当鼠标滑过选项卡时，显示对应内容
	$('.tab').mouseover(function(){
		$(this).addClass('activeTab').siblings().removeClass('activeTab');
		index=$(this).index();
		$('.floorTabBox').eq(index).addClass('activeTabBox').siblings().removeClass('activeTabBox');
		$('.tabArrow').eq(index).addClass('activeTabArrow').siblings().removeClass('activeTabArrow');
	})

	// 给2F楼选项卡绑定事件，当鼠标滑过选项卡时，显示对应内容
	$('.tabTwo').mouseover(function(){
		$(this).addClass('activeTabTwo').siblings().removeClass('activeTabTwo');
		index=$(this).index();
		$('.floorTabBoxTwo').eq(index).addClass('activeTabBoxTwo').siblings().removeClass('activeTabBoxTwo');
		$('.tabArroTwo').eq(index).addClass('activeTabArroTwo').siblings().removeClass('activeTabArroTwo');

	})

// 右导航动效

	// 给右导航绑定事件，当鼠标滑过时，显示对应内容
	$('.rightNavBox').mouseover(function(){
		index=$(this).index();
		$('.rightNavWrap').eq(index).stop().animate({right:'40px'},300);
		$('.rightNavBox').eq(index).css('background','#71777d');
	})
	
	// 给右导航绑定事件，当鼠标离开时，隐藏对应内容
	$('.rightNavBox').mouseout(function(){
		$('.rightNavWrap').stop().animate({right:'-50px'},300);
		$('.rightNavBox').css('background','#b7bbbf');
	})
	
	
// 购物车动效

	// 给购物车绑定事件，鼠标滑过，内容显示
	$('.logoTips').mouseover(function(){
		$('.CartWrapBox').show();
		$(this).css({
			'background': '#fff',
			'box-shadow': '0 0 5px gray',
		});
		$('.logoTipsPic').css('background-image','url(images/icon/25.png)');
		$('.logoTipsWord').css({
			'color':'red',
			'border-right':'1px solid #e6e5e6',
		});
		$('.logoTipsWord1').css('color','red');
		$('.logoTipsPic1').css('background-image','url(images/icon/22.png)');
	})
	// 给购物车绑定事件，鼠标离开，内容隐藏
	$('.logoTips').mouseout(function(){
		$('.CartWrapBox').hide();
		$(this).css({
			'background':'red',
			'box-shadow': 'none',
		});
		$('.logoTipsPic').css('background-image','url(images/icon/26.png)');
		$('.logoTipsWord').css({
			'color':'#fff',
			'border-right':'1px solid #fff',
		});
		$('.logoTipsWord1').css('color','#fff');
		$('.logoTipsPic1').css('background-image','url(images/icon/23.png)');
	})
	// 给购物车子菜单绑定事件，鼠标滑过，内容显示
	$('.CartWrapBox').mouseover(function(){
		$('.logoTips').css({
			'background':'#fff',
			'box-shadow': '0 0 5px gray',
		});
		$('.logoTipsPic').css('background-image','url(images/icon/25.png)');
		$('.logoTipsWord').css({
			'color':'red',
			'border-right':'1px solid #e6e5e6',
		});
		$('.logoTipsWord1').css('color','red');
		$('.logoTipsPic1').css('background-image','url(images/icon/22.png)');
		$('.CartWrapBox').show();
	})
	// 给购物车子菜单绑定事件，鼠标离开，内容隐藏
	$('.CartWrapBox').mouseout(function(){
		$('.logoTips').css({
			'background':'red',
			'box-shadow': 'none',
		});
		$('.logoTipsPic').css('background-image','url(images/icon/26.png)');
		$('.logoTipsWord').css({
			'color':'#fff',
			'border-right':'1px solid #fff',
		});
		$('.logoTipsWord1').css('color','#fff');
		$('.logoTipsPic1').css('background-image','url(images/icon/23.png)');
		$('.CartWrapBox').hide();
	})

})