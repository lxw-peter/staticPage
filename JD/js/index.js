window.onload = function(){
	searchEffect(); //搜索框
	countdown();	//倒计时
	slideshown();//轮播图
}

function searchEffect() {
//	头部搜索块的js效果
//1.获取头部banner的高度
	var banner = document.querySelector('.jd_banner');
	var bannerHeight = banner.offsetHeight;
	// console.log(bannerHeight);
//	获取header搜索快
	var search = document.querySelector('.jd_search');
//	2.获取当前屏幕滚动时,banner滚动出屏幕的距离
	window.onscroll = function(){
		// var offsetTop = document.body.scrollTop;
        var scrollTop=document.documentElement.scrollTop;

		// console.log(scrollTop);

//		3.计算比例值,获取透明度,设置背景颜色的样式
		var opacity = 0;
		if (scrollTop < bannerHeight){
			opacity = scrollTop/bannerHeight;
//			设置样式
			search.style.backgroundColor = 'rgba(255,0,0,'+opacity+')';
			// search.style.background.alpha = opacity;

		}
	}
}

//倒计时
function countdown(){
	var spans = document.querySelector('.jd_countdown').querySelectorAll('span');
	var totalTime = 7500;
	var timeId = setInterval(function(){
		totalTime--;
		// 当倒计时结束时函数停止
		if (totalTime < 0){
			clearInterval(timeId);
		}
		var hour = Math.floor(totalTime/3600);
		var minute = Math.floor(totalTime%3600/60);
		// var second = Math.floor(totalTime%3600%60);与下行代码等效
		var second = Math.floor(totalTime%60);
		spans[0].innerHTML = Math.floor(hour/10);
		spans[1].innerHTML = Math.floor(hour%10);
		spans[3].innerHTML = Math.floor(minute/10);
		spans[4].innerHTML = Math.floor(minute%10);
		spans[6].innerHTML = Math.floor(second/10);
		spans[7].innerHTML = Math.floor(second%10);

	},1000)
}


// 轮播图
function slideshown(){
	/* 1 设置轮播图的页面结构 */
	// 1.1 获取ul元素
	var bannerImg = document.querySelector('.jd_bannerImg');
	// console.log(bannerImg);
	// 1.2获取第一个li元素
	var first = bannerImg.querySelector('li:first-of-type');
	// console.log(first);
	// 1.3获取最后一个li元素
	var last = bannerImg.querySelector('li:last-of-type');
	// 1.4 ul最后一项添加原第一个li的克隆
	bannerImg.appendChild(first.cloneNode(true));
	// 1.5 ul第一项前插入原最后一个li的克隆  insertBefore(需要插入的DOM元素,位置)
	bannerImg.insertBefore(last.cloneNode(true),bannerImg.firstChild);

	/*2 设置对应的样式 */
	// 2.1 获取banner
	var banner =document.querySelector('.jd_banner');
	var lis = bannerImg.querySelectorAll('li');
	var count = lis.length;
	// 2.2 获取banner宽度
	var bannerWidth = banner.offsetWidth;
	// 2.3 获取图片盒子的宽度
	bannerImg.style.width = count*bannerWidth + 'px';
	// 2.4 获取每一个li元素(图片)的宽度
	for (var i = 0; i < count; i++) {
		lis[i].style.width = bannerWidth + 'px';
	}
	// 设置默认索引
	var index = 1;
	/*  3. 设置图片的默认偏移量 */
	bannerImg.style.left = -bannerWidth + 'px';

	/* 4. 当屏幕变化时重新调整宽度 */
	// window.onresize屏幕大小变化时触发的事件
	window.onresize = function(){
		// alert('变');
			// 4.1 重新获取banner宽度 并使其称为全局变量,自动轮播的时候需要调用
		bannerWidth = banner.offsetWidth;
		// 4.2 重新获取图片盒子的宽度
		bannerImg.style.width = count*bannerWidth + 'px';
		// 4.3 重新获取每一个li元素(图片)的宽度
		for (var i = 0; i < count; i++) {
			lis[i].style.width = bannerWidth + 'px';
		}
		// 4.4 重新设置图片的默认偏移量
		bannerImg.style.left = -bannerWidth + 'px';
	}

	// 5. 小圆点对应图片轮播变化
	var setIndicator = function(index){
		var Indicator = banner.querySelector('.jd_bannerIndicator').querySelectorAll('li');
		// 清除所有小圆点样式
		for ( var i= 0; i < Indicator.length ;i++) {
			Indicator[i].classList.remove('action');
		}
		// 为当前图片对应的小圆点增加样式
		Indicator[index-1].classList.add('action');
	}



	// 6.自动轮播
	var timerId;
	var shown_time = function() {
		timerId = setInterval(function(){

		// 6.1索引值自增1
		index++;
		console.log(index);

		// 6.2增加滑动动画效果
		bannerImg.style.transition = 'left 0.5s ease-in-out';
		// 6.3偏移值随着索引值变化而变化
		bannerImg.style.left = -bannerWidth*index + 'px';
		// setTimeout()方法用于在指定的毫秒数后调用函数或计算表达式。
		setTimeout(function(){
		 /* 如果index 等于 图片张数-1 则回到第一张 eg: 原有8张,前后各加一张共10张, 
		索引9指向的是放到最后的原先的第一张,此时再回到索引1即现在的第二张(看到的还是原先的第一张) */
			if (index == count -1){
					console.log(index);

					index = 1;
				// 取消最后一张跳到第二张的动画
					bannerImg.style.transition = 'none';
					// 同时偏移量也要同时变化
					bannerImg.style.left = -bannerWidth*index + 'px';
			}
		},500)
		
		
	},2000)
	};
	shown_time();


	// 7.手动轮播
	var startX,moveX,distanceX;
	var isEnd = true;
	// 为轮播图添加触摸事件,触摸开始
	bannerImg.addEventListener('touchstart',function(e){//touch事件的触发需要元素有确定的宽高值,因此jd_bannerImg 需要清除浮动clearfix
		// 清除轮播图计时
		clearInterval(timerId);
		// 记录手指的初始x坐标
		startX = e.targetTouches[0].clientX;
	});
	bannerImg.addEventListener('touchmove',function(e){
		// 过渡效果结束才能拖动
		if (isEnd == true) {
		// 记录手指的初始x坐标
		moveX = e.targetTouches[0].clientX;
		// 计算滑动距离
		distanceX = moveX - startX;
		// 清除自动轮播的动效
		bannerImg.style.transition = 'none';
		/* 细节: 本次滑动需要基于之前的偏移值计算 */
		bannerImg.style.left = -index*bannerWidth + distanceX + 'px';
		}
		
	});
	bannerImg.addEventListener('touchend',function(e){
		
		// 手指松开则进行过渡效果,结束前不能进行拖动
		isEnd = false;
		// 设置滑动距离超过100 就跳转
		if(Math.abs(distanceX) > 50) {
			// distanceX < 0 往左滑 
			if(distanceX < 0) {
				index++;				
			}
			// distanceX > 0 往右滑 
			else{
				index--;
			}
			bannerImg.style.transition = "left 0.5s ease-in-out";
			bannerImg.style.left = -index*bannerWidth + 'px';
			
		}
		else if(Math.abs(distanceX) > 0) {
			bannerImg.style.transition = "left 0.5s ease-in-out";
			bannerImg.style.left = -index*bannerWidth + 'px';

		}
		// clearInterval(timerId);//先得清除计时器,否则多个计时器重叠造成计时胡乱

		// shown_time();
		// 松开后 下列参数清零
		startX = 0;
		moveX = 0;
		distanceX = 0;
		

	});
	// webkitTranslationEnd:可以监听当前过渡效果执行结束事件,当元素的过渡效果结束则可以出发此事件
	bannerImg.addEventListener('webkitTransitionEnd',function(){
			// console.log ("good");测试函数是否执行

		// 如果到了最后一张count-1 则回到第一张 index=1
		if (index == count - 1) {
			index = 1;	
			// 清除过渡
		bannerImg.style.transition = 'none';
		/*设置偏移值*/
		bannerImg.style.left = -index*bannerWidth + 'px';
		}
		// 如果到了第一张 index=0, 则跳到倒数第二张count -2
		if ( index == 0) {
			index = count -2;
			// 清除过渡
		bannerImg.style.transition = 'none';
		/*设置偏移值*/
		bannerImg.style.left = -index*bannerWidth + 'px';
		}
		setIndicator(index);

		setTimeout(function(){
			isEnd = true;
			clearInterval(timerId);//先得清除计时器,否则多个计时器重叠造成计时胡乱
			shown_time();
		},100)

	})
}
	

	
