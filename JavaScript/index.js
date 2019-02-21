handleCart();
handleCarousel();

//购物车
function handleCart(){
	var oCart = document.querySelector('.top .topR .topR-cart');
	var oContent = document.querySelector('.top .topR .cart-content');
	var oCaLink = document.getElementById('link')
	
	//1.当鼠标在购物车上时改变背景颜色
	oCart.onmouseenter = function(){
		oCart.style.backgroundColor = '#fff';
		oCart.style.border = '1px solid #dddddd';
		oCart.style.borderBottom = 'none';
		oContent.style.display = 'block';
	}
	//2.当鼠标在内容上
	oContent.onmouseenter = function(){
		oCart.style.backgroundColor = '#fff';
		oCart.style.border = '1px solid #dddddd';
		oCart.style.borderBottom = 'none';
		oContent.style.display = 'block';
	}
	//3.当鼠标离开后
	oContent.onmouseleave = function(){
		oCart.style.backgroundColor = '#f5f5f5';
		oCart.style.border = 'none';
		oContent.style.display = 'none';
	}
}

//轮播图
function handleCarousel(){
		var aImg = document.querySelectorAll('.header .cart .cart-item .cart-item-list');
		var oLeftArrow = document.querySelector('.header .cart .cart-item .left-array');
		var oRightArrow = document.querySelector('.header .cart .cart-item .right-array');
		var aBtn = document.querySelector('.header .cart .cart-item .btn').children;
		var oCarousel = document.querySelector('.header .cart .cart-item')
		var timer = 0;
		// console.log(aImg)
		//添加事件
		var now = 0
		aImg[0].style.display = 'block';
		aBtn[0].style.borderColor='#979590';
		aBtn[0].style.backgroundColor='#ff9900';

		function xunhuan(){
			for(var i = 0;i<aImg.length;i++){
				aImg[i].style.display='none';
				aBtn[i].style.borderColor='#b5b3ad';
				aBtn[i].style.backgroundColor='#96938a';
				aImg[i].style.opacity = '0.3';
			}
			aImg[now].style.display = 'block';
			aBtn[now].style.borderColor='#979590';
			aBtn[now].style.backgroundColor='#ff9900';
			animate(aImg[now],{opacity:100},0);

		}		
		oRightArrow.onclick = function(){
			now++;
			if(now>2){
				now=0
			}
			xunhuan()
		}
		oLeftArrow.onclick = function(){
			now--;
			if(now<0){
				now=2
			}
			xunhuan()
		}

		//底部指示按钮
		for(var i = 0;i<aBtn.length;i++){
			aBtn[i].index = i;
			aBtn[i].onclick = function(){
				now = this.index;
				xunhuan()
			}
		}
	//自动循环播放
		timer = setInterval(oRightArrow.onclick,3000)
		oCarousel.onmouseover = function(){
			clearInterval(timer)
		}
		oCarousel.onmouseout = function(){
			timer = setInterval(oRightArrow.onclick,3000);
		}

		function animate(obj,options,isLinear,fnEnd){
		//设置默认是匀速动画
		if(isLinear == undefined){
			isLinear = true;
		}
		//防止多次操作开启多个定时器
		clearInterval(obj.timer);
		//速度/步长
		var iSpeed = 0;

		obj.timer = setInterval(function(){
			//代表是否终止所有的动画
			var isStopAll = true;
			for(var attr in options){
				//isStopCurrent代表是否终止当前动画,由于在循环定时器中,所以每次执行都会变为false,代表不终止当前动画
				var isStopCurrent = false;
				//获取当前的最新的值
				var current = parseFloat(getComputedStyle(obj,false)[attr]);
				
				//opacity属性的处理
				if(attr == 'opacity'){
					//1.乘以100是为了计算
					//2.四舍五入是为了处理小数
					current = Math.round(current*100);
				}
				//匀速动画的处理
				if(isLinear){
					//确定匀速动画的速度
					if(current > options[attr]){
						iSpeed = -10;
					}else{
						iSpeed = 10;
					}
					//匀速动画终止条件
					if(Math.abs(options[attr] - current) < Math.abs(iSpeed)){
						//匀速动画终止后的处理:如果最后一次动画不够一个速度的话,直接到达目标值
						if(attr == 'opacity'){
							obj.style.opacity = options[attr] / 100;
						}else{
							obj.style[attr] = options[attr] + 'px';
						}
						//代表终止当前的动画					
						isStopCurrent = true;
					}else{
						//代表当前的动画还没有结束,所以不能终止所有的动画
						isStopAll = false;
					}
				//减速动画的处理
				}else{
					//确定减速动画的速度
					iSpeed = (options[attr] - current)/10;
					iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
					//减速动画的终止条件
					if(!iSpeed){
						//代表终止当前的动画
						isStopCurrent = true;
					}else{
						//代表当前的动画还没有结束,所以不能终止所有的动画
						isStopAll = false;
					}
				}
				//如果不终止当前动画,运动
				if(!isStopCurrent){
					if(attr == 'opacity'){
						obj.style.opacity = (current + iSpeed)/100 ;
					}else{
						obj.style[attr] = current + iSpeed + 'px';
					}	
				}
			}
			//如果终止所有动画,清除定时器
			if(isStopAll){
				clearInterval(obj.timer);
				//动画执行完毕后的执行函数
				typeof fnEnd == 'function' && fnEnd();				
			}		
		},30)
	}
}