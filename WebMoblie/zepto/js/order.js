(function(){
	var itemTmpl='<div class="list-item">'+
					'<div class="item-inner">'+
						'<img src="$poi_pic" class="item-img" />'+
						'<div class="item-right">'+
							'<div class="item-head">'+
								'<p class="item-title text-ellipsis">$poi_name</p>'+
								'<i class="iconfont icon-mjiantou-copy"></i>'+
								'<div class="item-state">$status_description</div>'+
							'</div>'+
							'<div class="item-content">$getProduct</div>'+
						'</div>'+
					'</div>'+
					'$getComment'+
				'</div>';
	var page=0,
		isLoading=false;
	function getComment(data){
		var evaluation=!data.is_comment;
		if(evaluation){
			return '<div class="evaluation">'+
						'<button class="evaluation-btn">评价</button>'+
					'</div>'
		}
		return '';
	}

	function getTotalPrice(data){
		var str='<div class="product-item">'+
					'<span>...</span>'+
					'<div class="total-count">'+
						'总计'+data.product_count+'个菜，实付'+
						'<span class="total-price">¥'+data.total+'</span>'+
					'</div>'+
				'</div>';
		return str;
	}
	function getProduct(data){
		var list=data.product_list||[],
			str='';
		list.push({type:'more'});
		list.forEach(function(item,index){
			if(item.type==='more'){
				str+= getTotalPrice(data);
			}else{
				str+='<div class="product-item">'+
						item.product_name+
						'<div class="p-conunt">×'+
						item.product_count+
						'</div>'+
					'</div>'
			}
		})
		return str;
	}
	function initOrder(list){
		list.forEach(function(item,index){
			var str=itemTmpl.replace('$poi_pic',item.poi_pic)
							.replace('$poi_name',item.poi_name)
							.replace('$status_description',item.status_description)
							.replace('$getProduct',getProduct(item))
							.replace('$getComment',getComment(item));
			$('.list-wrap').append($(str));
		});
	}
	function getOrder(){
		page++;
		isLoading=true;
		$.get('../json/orders.json',function(data){
			console.log(data);
			var list=data.data.digestlist||[];
			initOrder(list);
			isLoading=false;
		})
	}
	function addEvent(){
		window.addEventListener('scroll',function(){
			var scrollHeight=document.body.scrollHeight,
				clientHeight=document.documentElement.clientHeight,
				scrollTop=document.documentElement.scrollTop||document.body.scrollTop,
				preDis=30;
			if((scrollTop+clientHeight)>=(scrollHeight-preDis)){
				if(page<3){
					if(isLoading){
						return;
					}
					getOrder();
				}else{
					$('.loading').text('到底啦~~~~');
				}
			}
		})
	}
	function init(){
		getOrder();
		addEvent()
	}
	init();
})();