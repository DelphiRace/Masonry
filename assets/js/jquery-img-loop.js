var bannerImgNumber = 0;
var bannerImgTotal = 0;
var bannerTimer = null;
//切換時間
var changeTime = 3000;
$(function(){
	// 先取得必要的元素並用 jQuery 包裝
	// 再來取得 $block 的高度及設定動畫時間
	var $block = $('#abgne-block'),
		$slides = $block.find('ul.abgne-list'),
		_width = $block.width(),
		$li = $slides.find('li'),
		$control = $block.find('.abgne-control'),
		_animateSpeed = 600;
	
	// 設定 $slides 的寬(為了不讓 li 往下擠)
	$slides.css('width', ($li.length + 1) * _width);
	// 產生 li 選項
	var _str = '';
	for(var i=0, j=$li.length;i<j;i++){
		// 每一個 li 都有自己的 className = playerControl_號碼
		_str += '<li class="abgne-player-control_' + (i+1) + '">' + (i+1) + '</li>';
	}
	bannerImgTotal = $li.length - 1;
	// 產生 ul 並把 li 選項加到其中
	var $number = $('<ul class="numbers"></ul>').html(_str).appendTo($control), 
		$numberLi = $number.find('li');

	// 並幫 .numbers li 加上 click 事件
	$numberLi.click(function(){
		var $this = $(this);
		$this.addClass('current').siblings('.current').removeClass('current');
		// 移動位置到相對應的號碼
		$slides.stop().animate({
			left: _width * $this.index() * -1
		}, _animateSpeed);
		bannerImgNumber = parseInt($(this).html()) - 1;
		clearTimeout(bannerTimer);
		bannerTimer = setTimeout(function(){
			autos();
		},changeTime);
		return false;
	}).eq(0).click();
	
	// 幫 .arrows li 加上 click 事件
	$control.find('ul.arrows li').click(function(){
		var _index = $numberLi.filter('.current').index();
		$numberLi.eq((this.className.indexOf('next')>-1?_index+1:_index-1+$numberLi.length)%$numberLi.length).click();

		return false;
	});
	
	// 當滑鼠移到 $control li 上時, 加上 .hover 效果
	// 反之則移除
	$control.find('li').hover(function(){
		$(this).addClass('hover');
	}, function(){
		$(this).removeClass('hover');
	});
	setAdWidth();
	$(window).resize(function(){
		setAdWidth();
	});
});

function autos(){
	if(bannerImgNumber == bannerImgTotal){
		bannerImgNumber = 0;
	}else{
		bannerImgNumber = bannerImgNumber+1;
	}
	$(".abgne-control .numbers").find("li").eq(bannerImgNumber).click();
}

function setAdWidth(){
	var $block = $('#abgne-block'),
		$slides = $block.find('ul.abgne-list'),
		_width = $block.width(),
		$li = $slides.find('li'),
		$control = $block.find('.abgne-control'),
		_animateSpeed = 600;
	
	
	var logoWidth = $("#logo").width();
	$(".abgne-player ul.abgne-list li").css({
		"width":logoWidth
	});
	// 設定 $slides 的寬(為了不讓 li 往下擠)
	$slides.css('width', ($li.length + 1) * _width);
}