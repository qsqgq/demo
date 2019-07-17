(function($){
	'use strict';

	//menu
		var dropdown={};

		$('.menu').on('dropdown-show',function(e){
			dropdown.loadOnce($(this),dropdown.buildMenuItem);
		}).dropdown({
			css3:true,
			js:false,
		});

		dropdown.buildMenuItem=function($elem,data){
			var html = "";
	        if(data.length===0) return;
	        for(var i=0;i<data.length;i++) {
	            html+='<li><a href="' + data[i].url + '" target="_blank" class="menu-item">'+data[i].name +'</a></li>'
	        }
	        $elem.find('.dropdown-layer').html(html);
		};

	//cart购物车
	    $('.cart').on('dropdown-show',function(){
			dropdown.loadOnce($(this),function($elem,data){
				dropdown.buildCartItem($elem,data);
				dropdown.updateCart($elem,data);
			});
		}).dropdown({
			css3:true,
			js:false,
		});

		dropdown.buildCartItem=function($elem, data){
			var html="";
	        if(data.length===0){ // no goods
	            html += '<div class="cart-nogoods"><i class="icon cart-nogoods-icon fl">&#xe600;</i><div class="cart-nogoods-text fl">购物车里还没有商品<br />赶紧去选购吧！</div></div>';
	            $elem.find('.dropdown-layer').html(html);
	            return;
	        }

	        html+='<h4 class="cart-title">最新加入的商品</h4><ul class="cart-list">';

	        for(var i=0; i<data.length; i++) {
	            html+='<li class="cart-item"><a href="###" target="_blank" class="cart-item-pic fl"><img src="'+data[i].pic+'" alt="" /></a><div class="fl"><p class="cart-item-name text-ellipsis"><a href="###" target="_blank" class="link">'+data[i].name+'</a></p><p class="cart-item-price"><strong>￥'+data[i].price+' x '+data[i].num+'</strong></p></div><a href="javascript:;" title="删除" class="cart-item-delete link fr">X</a></li>';
	        }

	        html+='</ul><div class="cart-info"><span class="fl">共 <strong class="cart-total-num">0</strong> 件商品　共计<strong class="cart-total-price">￥ 0.00</strong></span><a href="###" target="_blank" class="cart-info-btn btn fr">去购物车</a></div>';

	       	$elem.find('.dropdown-layer').html(html);
	        
		};

		dropdown.updateCart=function($elem, data){
			var $cartNum=$elem.find('.cart-number'),
	            $cartTotalNum=$elem.find('.cart-total-num'),
	            $cartTotalPrice=$elem.find('.cart-total-price'),
	            dataNum=data.length,
	            totalNum=0,
	            totalPrice=0;

	        if(dataNum===0){
	            return;
	        }

	        for(var i=0;i<dataNum;i++){
	            totalNum+=+data[i].num;
	            totalPrice+=+data[i].num*+data[i].price;
	        }

	        $cartNum.html(totalNum);
	        $cartTotalNum.html(totalNum);
	        $cartTotalPrice.html('￥'+totalPrice);
		};

	//category类别
		$('#category').find('.dropdown')
		.on('dropdown-show',function(){
			dropdown.loadOnce($(this),dropdown.createCategoryDetails);
		})
		.dropdown({
			css3:false,
			js:false,
		})
		dropdown.createCategoryDetails=function($elem,data){
			var html='';

			for(var i=0;i<data.length;i++){
				html+='<dl class="category-details cf"><dt class="category-details-title fl"><a href="###" target="_blank" class="category-details-title-link">' + data[i].title + '</a></dt><dd class="category-details-item fl">';
				for(var j=0;j<data[i].items.length;j++){
					html+='<a href="###" target="_blank" class="link">' + data[i].items[j] + '</a>';
				}

				 html += '</dd></dl>';
			}

			$elem.find('.dropdown-layer').html(html);
		}

	// 加载一次成功之后
		dropdown.loadOnce=function($elem,success){
	        var dataLoad=$elem.data('load');

	        if(!dataLoad) return;

	        if(!$elem.data('loaded')){
		        $elem.data('loaded',true);
		        $.getJSON(dataLoad).done(function(data){
		            if(typeof success==='function')success($elem,data);
		        }).fail(function(){
		            $elem.data('loaded',false);
		        });
		    }
	    };

	// 搜索框
		var search={};

		search.$headerSearch=$('#header-search'),
		search.$headerSearch.html='',
		search.$headerSearch.maxNum=10;

		// 获得数据处理
			search.$headerSearch.on('search-getData',function(e,data){
				var $this=$(this);
				search.$headerSearch.html=search.$headerSearch.createHeaderSearchLayer(data,search.$headerSearch.maxNum);
				$this.search('appendLayer',search.$headerSearch.html);

				// 将生成的html呈现在页面中
				if(search.$headerSearch.html){
					$this.search('showLayer');
				}else{
					$this.search('hideLayer');
				}
			}).on('search-noData',function(e){

				$(this).search('hideLayer').search('appendLayer','');
			}).on('click','.search-layer-item',function(){
				search.$headerSearch.search('setInputVal',$(this).html());
				search.$headerSearch.search('submit');
			});

			search.$headerSearch.search({
				autocomplete:true,
				css3:false,
				js:false,
				animation:'fade',
				getDataInterval: 0
			});
		// 获取数据，生成html	
		search.$headerSearch.createHeaderSearchLayer=function (data,maxNum){
				var html='',
					dataNum=data['result'].length;
				if(dataNum===0){
					return '';
				}
				for(var i=0;i<dataNum;i++){
					if(i>=maxNum)break;
					html+='<li class="search-layer-item text-ellipsis">'+data['result'][i][0]+'</li>'
				}
				return html;
			}
	
	//imgLoader
	 var imgLoader={};
	 imgLoader.loadImg=function(url,imgLoaded,imgFailed){
	 	var image=new Image();
	 	image.onerror=function(){
	 		if(typeof imgFailed==='function') imgFailed(url);
	 	}
	 	image.onload=function(){
	 		if(typeof imgLoaded==='function') imgLoaded(url);
	 	};
	 	setTimeout(function(){
	 		image.src=url;
	 	},1000);
	 };

	 imgLoader.loadImgs=function($imgs,success,fail){
	 	$imgs.each(function(_,el){
	 		var $img=$(el);
	 		imgLoader.loadImg($img.data('src'),function(url){
	 			$img.attr('src',url);
	 			success();
	 		},function(){
	 			console.log('从'+url+'加载图片失败');
	 			fail($img,url);
	 		});
	 	});
	 }

	//lazyLoad
		var lazyLoad={};

		lazyLoad.loadUntil=function(options){
			var items={},
				loadedItemNum=0,
				loadItemFn=null,
				$elem=options.$container,
				id=options.id;

			// 什么时候开始加载
			$elem.on(options.triggerEvent,loadItemFn=function(e,index,elem){
				if(items[index]!=='loaded'){
					$elem.trigger(id+'-loadItem',[index,elem,function(){
						items[index]='loaded';
						loadedItemNum++;
						console.log(index+':loaded');
						if(loadedItemNum===options.totalItemNum){
							//全部加载完毕
							$elem.trigger(id+'-itemloaded');
						}
					}]);
				}
			});

			//加载完毕
			$elem.on(id+'-itemsLoaded',function(e){
				console.log(id+'-itemsLoaded');
				//清除事件
				$elem.off(options.triggerEvent,loadItemFn);
			});
		}

		lazyLoad.isVisible=function(offsetTop,height){
			var $win=browser.$win;
			return ($win.height()+$win.scrollTop()>offsetTop)&&($win.scrollTop()<offsetTop+height);
		}

    //focus-slider
    	var slider={};
	    slider.$focusSlider=$('#slider');

	    slider.$focusSlider.on('focus-loadItem',function(e,index,elem,success){
	    	imgLoader.loadImgs($(elem).find('.slider-img'),success,function($img,url){
	    		$img.attr('src','img/focus-slider/placeholder.png');
	    	});
	    });

	    lazyLoad.loadUntil({
	    	$container:slider.$focusSlider,
	    	totalItemNum:slider.$focusSlider.find('.slider-img').length,
	    	triggerEvent:'slider-show',
	    	id:'focus'
	    });
	    
	    slider.$focusSlider.slider({
			css3:true,
			js:false,
			animation:'fade',
			activeIndex:0,
			interval:1000
		});

	//todays-slider
	 	slider.$todaysSlider=$('#todays-slider');

	 	slider.$todaysSlider.on('todays-loadItem',function(e,index,elem,success){
	 		imgLoader.loadImgs($(elem).find('.slider-img'),success,function($img,url){
	 			$img.attr('src','img/todays-slider/placeholder.png');
	 		});
	 	});

	 	lazyLoad.loadUntil({
	 		$container:slider.$todaysSlider,
	 		totalItemNum:slider.$todaysSlider.find('.slider-img').length,
	 		triggerEvent:'slider-show',
	 		id:'todays'
	 	})

		slider.$todaysSlider.slider({
			css3:true,
			js:false,
			animation:'slide',
			activeIndex:0,
			interval:0
		});

	//tab选项卡
		var floor={};
		floor.$floor=$('.floor');

		floor.floorData = [{
	        num: '1',
	        text: '米面粮油',
	        tabs: ['综合', '干果', '米面粮油'],
	        offsetTop: floor.$floor.eq(0).offset().top,
	        height: floor.$floor.eq(0).height(),
	        items: [
	            [{
	                name: '剑南春 水晶剑 52度 整箱装白酒500ml*6瓶 口感浓香型',
	                price: 479
	            }, {
	                name: '金纺 衣物护理剂 怡神薰衣草 2.5L+2.5L(柔顺剂)(与洗衣液搭配使用)',
	                price: 335
	            }, {
	                name: '百草味 坚果零食干果 每日坚果 奶油味夏威夷果200g/袋（内含开果器）',
	                price: 159
	            }, {
	                name: '优选100 有机速冻鲜食黄糯玉米 6支 240/g支 年货礼盒',
	                price: 65
	            }, {
	                name: '三只松鼠每日坚果年货节礼盒零食坚果年货大礼包孕妇零食小吃榛子巴旦木仁开心果混合果仁30袋装750g/盒',
	                price: 4999
	            }, {
	                name: '农夫山泉 17.5°橙 3kg装 铂金果年货礼盒 新鲜水果',
	                price: 289
	            }, {
	                name: '八马茶业 茶叶 云南普洱茶熟茶茶饼黑茶自饮简易装357g',
	                price: 369
	            }, {
	                name: '胡姬花 食用油 压榨 特香型花生油6.18L（定制装）',
	                price: 399
	            }, {
	                name: '澳洲进口 德运(Devondale) 脱脂成人奶粉 原装进口奶粉 1kg/袋',
	                price: 689
	            }, {
	                name: '福临门 泰玉香 一品茉莉香 进口原粮 大米 中粮出品5kg（包装更新，新老包装随机发放）',
	                price: 269
	            }, {
	                name: '【送4只】阳澄福记 大闸蟹全母蟹2.6-2.3两/只 6只装生鲜鲜活现货湖蟹螃蟹',
	                price: 99
	            }],
	            [{
	                name: '百草味 坚果零食干果 每日坚果 奶油味夏威夷果200g/袋（内含开果器）',
	                price: 479
	            }, {
	                name: '三只松鼠每日坚果年货节礼盒零食坚果年货大礼包孕妇零食小吃榛子巴旦木仁开心果混合果仁30袋装750g/盒',
	                price: 335
	            }],
	            [{
	                name: '胡姬花 食用油 压榨 特香型花生油6.18L（定制装）',
	                price: 479
	            }, {
	                name: '福临门 泰玉香 一品茉莉香 进口原粮 大米 中粮出品5kg（包装更新，新老包装随机发放）',
	                price: 335
	            }]
	        ]
	   	},{
	        num: '2',
	        text: '个护美妆',
	        tabs: ['综合', '粉底液', '面膜'],
	        offsetTop: floor.$floor.eq(1).offset().top,
	        height: floor.$floor.eq(1).height(),
	        items: [
	            [{
	                name: '【大容量300ml限量抢】滋润修护芦荟胶（补水保湿晒后修护 祛痘印收缩毛孔）',
	                price: 169
	            }, {
	                name: '美宝莲 MAYBELLINE 超然无暇二合一提亮轻垫霜 03自然色（1+1气垫 巨遮瑕轻薄裸妆滋润保湿隔离）+替换装',
	                price: 198
	            }, {
	                name: '阿玛尼 ARMANI 持色凝彩哑光染唇液506 3.9ml （小胖丁 口红 轻薄 持久）',
	                price: 79.9
	            }, {
	                name: '美宝莲 MAYBELLINE 定制柔雾粉底液125 30ml（ fit me 粉底液 遮瑕轻薄哑光控油持久隐形毛孔）',
	                price: 228
	            }, {
	                name: '欧莱雅(LOREAL)男士补水保湿护肤套装（洁面膏100ml+水凝露120ml+强润霜50ml+洁面+滋润乳）',
	                price: 119
	            }, {
	                name: '泰国进口 妆蕾RAY 金色蚕丝面膜10片/盒 提亮修复 抗皱紧致 轻透祛痘 品牌直供',
	                price: 39
	            }, {
	                name: '美宝莲 MAYBELLINE 超然无暇二合一提亮轻垫霜 01亮肤色11.5g（1+1气垫 巨遮瑕轻薄裸妆滋润保湿隔离）',
	                price: 299
	            }, {
	                name: '欧莱雅集团 小美盒补水保湿护肤品套装礼盒 兰蔻 HR YSL美丽奇遇盒 爽肤水+精华+口红+香水',
	                price: 257
	            }, {
	                name: '美迪惠尔(Mediheal)Line Friends恋朋 水润保湿面膜10片(韩国进口) 补水水库面膜 原可莱丝',
	                price: 199
	            }, {
	                name: '珀莱雅（PROYA）靓白肌密美白保湿五件套（洁面120ml+水150ml+乳液120ml+面霜50g+面膜*2+小样*2）',
	                price: 36
	            }, {
	                name: '欧莱雅(LOREAL)清润葡萄籽补水护肤化妆品套装礼盒(膜力水130ml+乳液110ml+乳液50ml+膜力水65ml)',
	                price: 139
	            }, {
	                name: 'MG美即面膜 清莹无忧补水祛痘补水保湿面膜套装20片（控油清洁 男女士面膜贴）',
	                price: 99
	            }],
	            [{
	                name: '美宝莲 MAYBELLINE 超然无暇二合一提亮轻垫霜 03自然色（1+1气垫 巨遮瑕轻薄裸妆滋润保湿隔离）+替换装',
	                price: 169
	            }, {
	                name: '美宝莲 MAYBELLINE 定制柔雾粉底液125 30ml（ fit me 粉底液 遮瑕轻薄哑光控油持久隐形毛孔）',
	                price: 198
	            },{
	                name: '美宝莲 MAYBELLINE 超然无暇二合一提亮轻垫霜 01亮肤色11.5g（1+1气垫 巨遮瑕轻薄裸妆滋润保湿隔离）',
	                price: 198
	            }],
	            [{
	               name: '【大容量300ml限量抢】滋润修护芦荟胶（补水保湿晒后修护 祛痘印收缩毛孔）',
	               price: 169
	            },{
	               name: '泰国进口 妆蕾RAY 金色蚕丝面膜10片/盒 提亮修复 抗皱紧致 轻透祛痘 品牌直供',
	               price: 198
	            }]
	        ]
    	}];

	    floor.buildFloor=function(floorData){
	    	var html="";

	    	html+='<div class="container">';
	    	html+=floor.buildFloorHead(floorData);
	    	html+=floor.buildFloorBody(floorData);
	    	html+='</div>';

	    	return html;
	    };

	    floor.buildFloorHead=function(floorData){
	    	var html='';
	    	html+='<div class="floor-head">';
	    	html+='<h2 class="floor-title fl"><span class="floor-title-num">'+floorData.num+'F</span><span class="floor-title-text">'+floorData.text+'</span></h2>';
	    	html+='<ul class="tab-item-wrap fr">';
	    	for(var i=0;i<floorData.tabs.length;i++){
	    		html+='<li class="fl"><a href="javascript:;" class="tab-item">'+floorData.tabs[i]+'</a></li>';
	    		if(i !==floorData.tabs.length-1){
	    			html+='<li class="floor-divider fl text-hidden">分隔线</li>';
	    		}
	    	}
	    	html+='</ul>';
	    	html+='</div>';
	    	return html;
	    };

	    floor.buildFloorBody=function(floorData){
	    	var html="";
	    	html+='<div class="floor-body">';
	    	for(var i=0;i<floorData.items.length;i++){
	    		html+='<ul class="tab-panel">';
	    		for(var j=0;j<floorData.items[i].length;j++){
	    			html+='<li class="floor-item fl">';
	    			html+='<p class="floor-item-pic"><a href="###" target="_blank"><img src="img/floor/loading.gif" class="floor-img" data-src="img/floor/' + floorData.num + '/' + (i + 1) + '/' + (j + 1) + '.jpg" alt="" /></a></p>';
	    			html += '<p class="floor-item-name"><a href="###" target="_blank" class="link">' + floorData.items[i][j].name + '</a></p>';
	    			html+='<p class="floor-item-price">' + floorData.items[i][j].price + '</p>';
	    			html+='</li>';
	    		}
	    		html+='</ul>';
	    	}
	    	html+='</div>';
	    	return html;
	    };

	    var browser={};    

    	browser.$win = $(window);
    	browser.$doc = $(document);
		
		floor.timeToShow=function(){
	    	console.log('time to show');
	    	floor.$floor.each(function(index,elem){
	    		if(lazyLoad.isVisible(floor.floorData[index].offsetTop,floor.floorData[index].height)){
	    			browser.$doc.trigger('floor-show',[index,elem]);
	    		}
	    	});
	    }

	    browser.$win.on('scroll resize',floor.showFloor=function(){
	    	clearTimeout(floor.floorTimer);
	    	floor.floorTimer=setTimeout(floor.timeToShow,250);
	    });

	    floor.$floor.on('floor-loadItem',function(e,index,elem,success){
	    	imgLoader.loadImgs($(elem).find('.floor-img'),success,function($img,url){
	    		$img.attr('src','img/floor.placeholder.png');
	    	});
	    });

	    browser.$doc.on('floors-loadItem',function(e,index,elem,success){
	    	var html=floor.buildFloor(floor.floorData[index]),
	    		$elem=$(elem);
	    	success();
	    	setTimeout(function(){
	    		$elem.html(html);
	    		lazyLoad.loadUntil({
	    			$container:$elem,
	    			totalItemNum:$elem.find('.floor-img').length,
	    			triggerEvent:'tab-show',
	    			id:'floor'
	    		});
	    		$elem.tab({
	    			event:'mouseenter',
	    			css3:false,
	    			js:false,
	    			animation:'fade',
	    			activeIndex:0,
	    			interval:0,
	    			delay:0
	    		})
	    	},500);
	    });

	    browser.$doc.on('floors-itemsLoaded',function(){
	    	floor.$win.off('scroll resize',floor.showFloor);
	    });

	    lazyLoad.loadUntil({
	    	$container:browser.$doc,
	    	totalItemNum:floor.$floor.length,
	    	triggerEvent:'floor-show',
	    	id:'floors'
	    });

	    floor.timeToShow();

	//elevator电梯
		floor.witchFloor=function(){
			var num=-1;

			floor.$floor.each(function(index,elem){
				var floorData=floor.floorData[index];

				num=index;

				if(browser.$win.scrollTop()+browser.$win.height()/2<floorData.offsetTop){
					num=index-1;
					return false;
				}
			});

			return num;
		};

		floor.$elevator=$('#elevator');
		floor.$elevator.$items=floor.$elevator.find('.elevator-item');

		floor.setElevator=function(){
			var num=floor.witchFloor();

			if(num===-1){
				floor.$elevator.fadeOut();
			}else{
				floor.$elevator.fadeIn();
				floor.$elevator.$items.removeClass('elevator-active');
				floor.$elevator.$items.eq(num).addClass('elevator-active');
			}
		};

		floor.setElevator();

		browser.$win.on('scroll resize',function(){
			clearTimeout(floor.elevatorTimer);
			floor.elevatorTimer=setTimeout(floor.setElevator,250);
		});

		floor.$elevator.on('click', '.elevator-item', function () {
	        $('html, body').animate({
	            scrollTop: floor.floorData[$(this).index()].offsetTop
	        });
    	});

    //底部导航
    	var foot={};
    	foot.$navBottom=$('.nav-bottom');
    	foot.$footer=$('.footer');
    	foot.$navBottom.offsetTop = foot.$navBottom.offset().top;
    	foot.$navBottom.height = foot.$navBottom.height();
    	foot.$footer.offsetTop = foot.$footer.offset().top;
    	foot.$footer.height = foot.$footer.height();

    	foot.navBottomData = [
        	{
            title: '消费者保障',
            items: [
                '保障范围',
                '退货退款流程',
                '服务中心',
                '更多特色服务'
            	]
        	}, {
            title: '新手上路',
            items: [
                '新手专区',
                '消费警示',
                '交易安全',
                '24小时在线帮助',
                '免费开店'
            	]
        	}, {
            title: '付款方式',
            items: [
                '快捷支付',
                '信用卡',
                '余额包',
                '蜜蜂花啊',
                '货到付款'
            	]
        	}, {
            title: '慕淘特色',
            items: [
                '手机慕淘',
                '慕淘信',
                '大众评审',
                'B格指南'
            	]
        	}
    	];
    	foot.footerData = {
	        links: [
	            '关于慕多多',
	            '合作伙伴',
	            '营销中心',
	            '廉正举报',
	            '联系客服',
	            '开放平台',
	            '诚征英才',
	            '联系我们',
	            '网站地图',
	            '法律声明',
	            '知识产权'
	        ],
        	copyright: '© 2019 imooc.com All Rights Reserved'
    	};

    	foot.buildnavBottom=function(data){
    		var html="";

    		html+='<div class="container">';
    		for(var i=0;i<data.length;i++){
    			html+='<dl class="fl box">';
    			html+='<dt class="title">'+data[i].title+'</dt>';
    			html+='<dd class="nav-bottom-item">';
    			for(var j=0;j<data[i].items.length;j++){
    				html+='<a href="###" target="_blank" class="link">'+data[i].items[j]+'</a>';
    			}
    			html+='</dd>';
    			html+='</dl>';
    		}
    		html+='</div>';

    		return html;
    	};

    	foot.buildFooter=function(data){
    		var html="";

    		html+='<div class="container">';
    		html+='<div class="footer-nav">';
    		for(var i=0;i<data.links.length;i++){
    			html+='<a href="javascript:;" class="left">'+data.links[i]+'</a>';
    		}
    		html+='</div>';
    		html+='<p class="rights">© 2019 imooc.com All Rights Reserved</p>';
			html+='</div>';

    		return html;
    	};

    	foot.timeToShow = function () {
        	console.log('time to show foot');
        	if (lazyLoad.isVisible(foot.$navBottom.offsetTop, foot.$navBottom.height) || lazyLoad.isVisible(foot.$footer.offsetTop, foot.$footer.height)) {
            // console.log('the ' + (index + 1) + ' floor is visible');
            	browser.$doc.trigger('foot-show', [0, foot.$navBottom[0]]);
       	 	}
    	};
    
    	browser.$win.on('scroll resize', foot.showFoot = function () {
        	clearTimeout(foot.footTimer);
        	foot.footTimer = setTimeout(foot.timeToShow, 250);
    	});
   		browser.$doc.on('foot-loadItem', function (e, index, elem, success) {
	        var helperHtml = foot.buildnavBottom(foot.navBottomData),
	            footerHtml = foot.buildFooter(foot.footerData);
    
	        success();
	        console.log("yjl");

	        setTimeout(function () {
	            foot.$navBottom.html(helperHtml);
	            foot.$footer.html(footerHtml);
	        }, 500);
    	});
	    browser.$doc.on('foot-itemsLoaded', function () {
	        browser.$win.off('scroll resize', foot.showFoot);
	    })
	    lazyLoad.loadUntil({
	        $container: browser.$doc,
	        totalItemNum: 1,
	        triggerEvent: 'foot-show',
	        id: 'foot'
	    });
	    foot.timeToShow();

	    $('#backToTop').on('click', function () {
	        $('html, body').animate({
	            scrollTop: 0
	    	});
    	});

})(jQuery);

