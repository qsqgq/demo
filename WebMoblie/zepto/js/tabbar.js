(function(){
	var itemTmpl='<a href="../$key.html" class="$key tabbar-item">'+
					'<div class="tabbar-img"></div>'+
					'<span class="tabbar-text">$text</span>'+
				'</a>';
	function init(){
		var items=[{
				key: 'index',
				text: '首页'
			},{
				key: 'order',
				text: '订单'
			},{
				key: 'my',
				text: '我的'
			}];
		var str='';
		items.forEach(function(item,index){
			str+=itemTmpl.replace(/\$key/g,item.key).replace('$text',item.text);
			
		})
		$('.tabbar-container').append($(str));
		// 找到当前页面的url来确定key值
        var arr = window.location.pathname.split('/');
        var page = arr[arr.length-1].replace('.html','');
        // 将当前的页面对应的key值的a元素设置active的class
        $('a.'+page).addClass('active');
	}
	init();
})();