(function(){
	var itemTmpl='<div class="category-item">'+
					'<img class="item-icon" src=$url />'+
					'<p class="item-name">$name</p>'+
				'</div>';
	function initCategory(){
		// 获取category数据
		$.get('../json/head.json',function(data){
			console.log(data);
			var list=data.data.primary_filter.splice(0,8);
			list.forEach(function(item,index){
				var str=itemTmpl.replace('$url',item.url).replace('$name',item.name);
				$('.category-container').append($(str));
			})
		})
	}
	function addClick(){
		$('.category-container').on('click','.category-item',function(){
			
		})
	}
	function init(){
		initCategory();
		addClick();
	}
	init();
})();