(function(){
	var itemTmpl='<div class="menu-right">'+
						'<img src="$picture" class="menu-img" />'+
						'<div class="menu-item">'+
							'<h4 class="item-title">$name</h4>'+
							'<p class="item-text">$text</p>'+
							'<p class="item-tip">$praise_content</p>'+
							'<p class="item-price">¥$min_price<span class="unit">/$unit</span></p>'+
						'</div>'+
						'<div class="item-select">'+
							'<div class="subtract"></div>'+
							'<div class="count">$chooseCount</div>'+
							'<div class="plus"></div>'+
						'</div>'+	
					'</div>';
	function initConcentRight(list){
		$('.right-container').html('');
		list.forEach(function(item,index){
			if(!item.chooseCount){
				item.chooseCount=0;
			}
			var str=itemTmpl
					.replace('$picture',item.picture)
					.replace('$name',item.name)
					.replace('$text',item.description)
					.replace('$praise_content',item.praise_content)
					.replace('$min_price',item.min_price)
					.replace('$unit',item.unit)
					.replace('$chooseCount',item.chooseCount);

			var $target=$(str);
			$target.data('itemData',item);
			$('.right-container').append($target);
		}) 
	}
	function initTitle(str){
		$('.right-title').text(str);
	}
	function addClick(){
		$('.menu-right').on('click','.plus',function(event){
			var $count=$(event.currentTarget).parent().find('.count');
			$count.text(parseInt($count.text()||'0')+1);
			var $item=$(event.currentTarget).parents('.menu-right').first(),
				itemData=$item.data('itemData');
			itemData.chooseCount=itemData.chooseCount+1;
			window.ShopBar.renderItems();
		});
		
		$('.menu-right').on('click','.subtract',function(event){
			var $count=$(event.currentTarget).parent().find('.count');
			if($count.text()==0) return;
			$count.text(parseInt($count.text()||'0')-1);
			var $item=$(event.currentTarget).parents('.menu-right').first(),
				itemData=$item.data('itemData');
			itemData.chooseCount=itemData.chooseCount-1;
			window.ShopBar.renderItems();
		})
	}
	
	function init(data){
		initConcentRight(data.spus||[]);
		initTitle(data.name);
		addClick();
	}
	window.Right={
		refresh: init
	}

})();


