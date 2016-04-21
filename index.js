
$(function(){
	$('.member').hover(function(){
		$(this).css("background","url(images/arrow.png) no-repeat right");
		$('#list').show().animate({
			mul:{
				o:100,
				height:120
			}
		});
	},function(){
		$(this).css("background","url(images/arrow2.png) no-repeat right");
		$('#list').animate({
			mul:{
				o:0,
				height:0
			},
			fn:function(){
				$('#list').hide();
			}
		});
	});
		
	//登陆框
	$('#login').center(350,250).resize(function(){
		if($('#login').css('display') == 'block')
		{
			$('#screen').lock();
		}
	});

	$('.login').click(function(){
		$('#login').center(350,250);
		$('#login').css('display','block');
		$('#screen').lock().animate({
			attr:'o',
			target:'30',
			step:10
		});
	});

	$('.close').click(function(){
		$('#login').css('display','none');
		$('#screen').animate({
			attr:'o',
			target:0,
			step:10,
			fn:function(){
				$('#screen').unlock();
			}
		});
	});

	//拖拽
	$('#login').drag($('#login h2').first());

	//侧栏位置初始化
	$('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');

	addEvent(window,'scroll',function(){
		$('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');
	});


	
	$('#share').hover(function(){
		$(this).animate({
			attr:'x',
			t:20,
			target:0
		});
	},function () {
		$(this).animate({
			attr:'x',
			t:20,
			target:-211
		});
	});	

	$('#test').click(function(){
		var _this = this;
		$(_this).animate({
			attr:'w',
			target:300,
			mul:{
				'w':105,
				'h':300,
				'o':30
			},
			fn:function(){
				alert("ok");
			}
		});
	});





});



