(function(){
	var itemTmpl='<div class="concent-left">'+
					'<div class="concent-box">$getItemContent</div>'+
				'</div>';
	function getItemContent(data){
		if(data.icon){
			return '<img src='+data.icon+' class="item-icon" />'+data.name;
		}else{
			return data.name;
		}
	}
	function getLeft(){
		$.get('../json/food.json',function(data){
			console.log(data);
			window.food_spu_tags = data.data.food_spu_tags||[];
			initConcentLeft(window.food_spu_tags);
			window.ShopBar.changeShippingPirce(data.data.poi_info.shipping_fee || 0);
		})
	}
	function initConcentLeft(list){
		list.forEach(function(item,index){
			var str=itemTmpl.replace('$getItemContent',getItemContent(item));
			var $target=$(str);
			$target.data('itemData',item);
			$('.category-left').append($target);
		}) 
		$('.concent-left').first().click();
	}
	function addClick(){
		$('.category-left').on('click','.concent-left',function(event){
			var $target=$(event.currentTarget);
			$target.addClass('active').siblings().removeClass('active');
			window.Right.refresh($target.data('itemData'));
		})
	}
	function init(){
		getLeft();
		addClick();
	}
	init();
})();