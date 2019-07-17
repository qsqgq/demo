(function(){
	var itemTmpl='<div class="list-item">'+
					'<img class="item-img" src=$pic_url />'+
					'$brand'+
					'<div class="item-info">'+
						'<p class="item-title"><a href="menu.html" class="titleWrap">$name</a></p>'+
						'<div class="item-desc">'+
							'<div class="item-score">$wm_poi_score</div>'+
							'<div class="item-count">月售$monthNum</div>'+
							'<div class="item-distance">&nbsp;$distance</div>'+
							'<div class="item-time">$mt_delivery_time&nbsp;|</div>'+
						'</div>'+
						'<div class="item-price">'+
							'<div class="item-pre-price">$min_price_tip</div>'+
						'</div>'+
						'<div class="item-others">'+
							'$others'+
						'</div>'+
					'</div>'+
				'</div>';
	var starTmpl = '<div class="star-score">$starstr</div>',
		page=0,
		isLoading=false;

	function getBrand(data){
		if(data.brand_type){
			return '<div class="tip brand">品牌</div>'
		}else{
			return '<div class="tip new">新到</div>'
		}
	}
	function getMonthnum(data){
		var num=data.month_sale_num;
		if(num>999){
			return '999+';
		}else{
			return num;
		}
	}
	function getOthers(data){
		var array=data.discounts2,
			str="";
		array.forEach(function(item,index){
			var template='<div class="other-info">'+
							'<img src=$icon_url class="other-img" />'+
							'<p class="other-content text-ellipsis">$info</p>'+
						'</div>'
			template=template.replace('$icon_url',item.icon_url).replace('$info',item.info);
			str=str+template;
		})
		return str;				
	}
	function _getSrars(){
		var mark=this.score.toString(),
			scoreArray=mark.split('.'),
			fullstar=parseInt(scoreArray[0]),
			halfstar=parseInt(scoreArray[1])>=5?1:0,
			nullstar=5-fullstar-halfstar,
			starstr="";
		for(var i=0;i<fullstar;i++){
			starstr+='<i class="iconfont icon-manxing"></i>';
		}
		for(var j=0;j<halfstar;j++){
			starstr+='<i class="iconfont icon-xing3"></i>';
		}
		for(var k=0;k<nullstar;k++){
			starstr+='<i class="iconfont icon-xingxinghuise"></i>';
		}
		return starTmpl.replace('$starstr',starstr);
	}
	window.StarScore=function(score){
		this.score=score||'';
		this.getSrars=_getSrars;
	}
	function initContentList(list){
		list.forEach(function(item,index){
			var str=itemTmpl
				.replace('$pic_url',item.pic_url)
				.replace('$brand',getBrand(item))
				.replace('$name',item.name)
				.replace('$monthNum',getMonthnum(item))
				.replace('$distance',item.distance)
				.replace('$mt_delivery_time',item.mt_delivery_time)
				.replace('$min_price_tip',item.min_price_tip)
				.replace('$others',getOthers(item))
				.replace('$wm_poi_score',new StarScore(item.wm_poi_score).getSrars());
			$('.list-wrap').append($(str));
		})
	}
	function initList(){
		page++;
		isLoading=true;
		$.get('../json/homelist.json',function(data){
			console.log(data);
			var list=data.data.poilist||[];
			initContentList(list);
			isLoading=false;
		})
	}
	function addEvent(){
		window.addEventListener('scroll',function(){
			var scrollHeight=document.body.scrollHeight,
				clientHeight=document.documentElement.clientHeight,
				scrollTop=document.documentElement.scrollTop||document.body.scrollTop,
				proDis=30;
			if((scrollTop+clientHeight)>=(scrollHeight-proDis)){
				if(page<3){
					// 在发送ajax请求时避免触发多次滚动加载
					if(isLoading){
						return
					}
					initList();
				}else{
					 $('.loading').text('到底啦~~~');
				}
				
			}
		})
		

	}
	function init(){
		initList();
		addEvent();
	}
	init();
})();