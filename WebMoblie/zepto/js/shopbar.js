(function(){
	var itemTopTmpl='<div class="choose-item hide">'+
						'<div class="item-top">'+
							'<i class="icon icon-delete"></i>'+
							'<span class="clear-car">清空购物车</span>'+
						'</div>'+
					'</div>';
	var itemBottomTmpl='<div class="bottom-item">'+
							'<div class="cart-icon">'+
								'<div class="tip-count hide"></div>'+
							'</div>'+
							'<div class="price-item">'+
								'<p class="total">￥<span class="total-price">0</span></p>'+
								'<p class="other">另需配送费&nbsp;￥<span class="other-price">0</span></p>'+
							'</div>'+
							'<div class="go-btn">去结算</div>'+
						'</div>';
	var $strTop=$(itemTopTmpl),
		$strBottom=$(itemBottomTmpl);
	function changeShippingPirce(str) {
		$strBottom.find('.other-price').text(str);
	}
	function changeTotalPirce(str) {
		$strBottom.find('.total-price').text(str);
	}
	function renderItems() {
		$strTop.find('.cart-item').remove();
		var list = window.food_spu_tags || [];
		var tmpl = '<div class="cart-item">'+
						'<div class="item-name">$name</div>'+
						'<div class="price">￥<span class="cart-total">$price</span></div>'+
						'<div class="select-content">'+
							'<div class="subtract"></div>'+
							'<div class="count">$chooseCount</div>'+
							'<div class="plus"></div>'+
						'</div>';
		var totalPrice = 0;
		list.forEach(function(item) {
			item.spus.forEach(function(_item) {
				if(_item.chooseCount > 0) {
					var price = _item.min_price * _item.chooseCount;
					var row = tmpl
							  .replace('$name', _item.name)
							  .replace('$price', price)
							  .replace('$chooseCount', _item.chooseCount);
					totalPrice+= price;
					var $row = $(row);
					$row.data('itemData', _item);
					$strTop.append($row);
				}
			})
			changeTotalPirce(totalPrice);
			changDot();
		})

	}
	function changDot() {
		var $counts = $strTop.find('.count');
		var total = 0;
		for(var i=0;i< $counts.length ; i++){
			total += parseInt($($counts[i]).text());
		}
		if (total > 0) {
			$('.tip-count').show().text(total);
		} else {
			$('.tip-count').hide()
		}
	}
	function addClick() {
		$('.shop-bar').on('click', '.cart-icon', function() {
			$strTop.toggle();
			$('.mask').toggle();
		})
		$strTop.on('click', '.plus', function(e) {
			var $count=$(e.currentTarget).parent().find('.count');
			if ($count.text() == 0) return;
			$count.text(parseInt($count.text()||'0')+1);
			var $item = $(e.currentTarget).parents('.cart-item').first();
			var itemData = $item.data('itemData');
			itemData.chooseCount = itemData.chooseCount + 1;
			renderItems();
			$('.concent-left.active').click();
		})
		$strTop.on('click', '.subtract', function(e) {
			var $count=$(e.currentTarget).parent().find('.count');
			$count.text(parseInt($count.text()||'0') - 1);
			var $item = $(e.currentTarget).parents('.cart-item').first();
			var itemData = $item.data('itemData');
			itemData.chooseCount = itemData.chooseCount - 1;
			renderItems();
			$('.concent-left.active').click();
		})
	}
	function init(){
		$('.shop-bar').append($strTop).append($strBottom);
		addClick();
	}
	init();
	window.ShopBar = {
		renderItems: renderItems,
		changeShippingPirce: changeShippingPirce,
	}
})();			