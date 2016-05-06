
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

	$('#login .close').click(function(){
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

	//注册框
	$('#reg').center(600,550).resize(function(){
		if($('#reg').css('display') == 'block')
		{
			$('#screen').lock();
		}
	});

	$('.reg').click(function(){
		$('#reg').center(600,550);
		$('#reg').css('display','block');
		$('#screen').lock().animate({
			attr:'o',
			target:'30',
			step:10
		});
	});

	$('#reg .close').click(function(){
		$('#reg').css('display','none');
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
	$('#reg').drag($('#reg h2').first());

	//侧栏位置初始化
	$('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');

	// addEvent(window,'scroll',function(){
	// 	$('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');
	// });
	$(window).bind("scroll",function(){
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

	//滑动导航
	$("#nav .about li").hover(function(){
		var target = $(this).first().offsetLeft;
		$("#nav .nav_bg").animate({
			attr:'x',
			target:target + 20,
			step:3,
			fn:function(){
				$("#nav .white").animate({
					attr:"x",
					t:20,
					step:3,
					target:-target
				});
			}
		});
	},function(){
		$("#nav .nav_bg").animate({
			attr:'x',
			target:20,
			step:3,
			fn:function(){
				$("#nav .white").animate({
					attr:"x",
					t:20,
					step:3,
					target:0
				});
			}
		});
	});

	//左侧菜单
	$("#sidebar h2").toggle(function(){
		$(this).next().animate({
			mul:{
				h:0,
				o:0
			}
		});
	},function(){
		$(this).next().animate({
			mul:{
				h:150,
				o:100
			}
		});
	});

	//表单验证
	
	$('form').first().reset();

	$("form").form('user').bind("focus",function(){
		$("#reg .info_user").css("display","block");
		$("#reg .error_user").css("display","none");
		$("#reg .succ_user").css("display","none");
	}).bind("blur",function(){
		if(trim($(this).value()) == '')
		{
			$("#reg .info_user").css("display","none");
			$("#reg .error_user").css("display","none");
			$("#reg .succ_user").css("display","none");
		}	
		else if(!/[a-zA-Z0-9_]{2,20}/.test(trim($(this).value())))
		{
			$("#reg .error_user").css("display","block");
			$("#reg .info_user").css("display","none");
			$("#reg .succ_user").css("display","none");
		}
		else
		{
			$("#reg .error_user").css("display","none");
			$("#reg .info_user").css("display","none");
			$("#reg .succ_user").css("display","block");
		}	
	});

	//密码验证
	$("form").form("pass").bind("focus",function(){
		$("#reg .info_pass").css("display","block");
		$("#reg .error_pass").css("display","none");
		$("#reg .succ_pass").css("display","none");
	}).bind("blur",function(){
		if(trim($(this).value()) == '')
		{
			$("#reg .info_pass").css("display","none");
		}
		else
		{
			if(check_pass(this))
			{
				$("#reg .info_pass").css("display","none");
				$("#reg .error_pass").css("display","none");
				$("#reg .succ_pass").css("display","block");
			}
			else
			{
				$("#reg .info_pass").css("display","none");
				$("#reg .error_pass").css("display","block");
				$("#reg .succ_pass").css("display","none");
			}
		}
	});
	//密码强度验证
	$("form").form("pass").bind("keyup",function(){
		check_pass(this);
	});

	//密码验证函数
	function check_pass(_this){
		var value = trim($(_this).value());
		var value_length = value.length;
		var code_length = 0;
		var flag = false;

		//第一个验证条件
		if(value.length>=6 && value.length<=20)
		{
			$("#reg .info_pass .q1").html("●").css("color","green");
		}
		else
		{
			$("#reg .info_pass .q1").html("○").css("color","#666");
		}

		//第二个验证条件
		if(value_length > 0 && !/\s/.test(value))
		{
			$("#reg .info_pass .q2").html("●").css("color","green");
		}
		else
		{
			$("#reg .info_pass .q2").html("○").css("color","#666");
		}

		//第三个验证条件
		if(/[0-9]/.test(value))
		{
			code_length++;
		}
		if(/[a-z]/.test(value))
		{
			code_length++;
		}
		if(/[A-Z]/.test(value))
		{
			code_length++;
		}
		if(/[^0-9a-zA-Z]/.test(value))
		{
			code_length++;
		}
		if(code_length >= 2)
		{
			$("#reg .info_pass .q3").html("●").css("color","green");
		}
		else
		{
			$("#reg .info_pass .q3").html("○").css("color","#666");
		}

		//安全级别
		if(value_length >= 10 && code_length >= 3)
		{
			$("#reg .info_pass .s1").css("color","green");
			$("#reg .info_pass .s2").css("color","green");
			$("#reg .info_pass .s3").css("color","green");
			$("#reg .info_pass .s4").html("高").css("color","green");
		}
		else if(value_length >= 8 && code_length >= 2)
		{
			$("#reg .info_pass .s1").css("color","#f60");
			$("#reg .info_pass .s2").css("color","#f60");
			$("#reg .info_pass .s3").css("color","#ccc");
			$("#reg .info_pass .s4").html("中").css("color","#f60");
		}
		else if(value_length >= 1)
		{
			$("#reg .info_pass .s1").css("color","maroon");
			$("#reg .info_pass .s2").css("color","#ccc");
			$("#reg .info_pass .s3").css("color","#ccc");
			$("#reg .info_pass .s4").html("低").css("color","#maroon");
		}
		else
		{
			$("#reg .info_pass .s1").css("color","#ccc");
			$("#reg .info_pass .s2").css("color","#ccc");
			$("#reg .info_pass .s3").css("color","#ccc");
			$("#reg .info_pass .s4").html("");
		}
		if (value_length >= 6 && value_length <= 20 && code_length >= 2) 
			flag = true;
		return flag;
	}

	//密码确认
	$("form").form("notpass").bind("focus",function(){
		$("#reg .info_notpass").css("display","block");
		$("#reg .error_notpass").css("display","none");
		$("#reg .succ_notpass").css("display","none");
	}).bind("blur",function(){
		if(trim($(this).value()) == '')
		{
			$("#reg .info_notpass").css("display","none");
		}
		else if(trim($(this).value()) == trim($('form').form('pass').value()))
		{
			$("#reg .info_notpass").css("display","none");
			$("#reg .error_notpass").css("display","none");
			$("#reg .succ_notpass").css("display","block");
		}
		else
		{
			$("#reg .info_notpass").css("display","none");
			$("#reg .error_notpass").css("display","block");
			$("#reg .succ_notpass").css("display","none");
		}
	});

	//回答
	$("form").form("ans").bind("focus",function(){
		$("#reg .info_ans").css("display","block");
		$("#reg .error_ans").css("display","none");
		$("#reg .succ_ans").css("display","none");
	}).bind("blur",function(){
		if(trim($(this).value()) == '')
		{
			$("#reg .info_ans").css("display","none");
		}
		else if(trim($(this).value()).length >= 2 && trim($(this).value()).length <= 32)
		{
			$("#reg .info_ans").css("display","none");
			$("#reg .error_ans").css("display","none");
			$("#reg .succ_ans").css("display","block");
		}
		else
		{
			$("#reg .info_ans").css("display","none");
			$("#reg .error_ans").css("display","block");
			$("#reg .succ_ans").css("display","none");
		}
	});

	//电子邮件
	$("form").form("email").bind("focus",function(){

		//补全界面
		if($(this).value().indexOf("@") == -1)
		{
			$("#reg .all_email").css("display","block");
		}
		
		$("#reg .info_email").css("display","block");
		$("#reg .error_email").css("display","none");
		$("#reg .succ_email").css("display","none");
	}).bind("blur",function(){

		$("#reg .all_email").css("display","none");

		if(trim($(this).value()) == '')
		{
			$("#reg .info_email").css("display","none");
		}
		else if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($(this).value())))
		{
			$("#reg .info_email").css("display","none");
			$("#reg .error_email").css("display","none");
			$("#reg .succ_email").css("display","block");
		}
		else
		{
			$("#reg .info_email").css("display","none");
			$("#reg .error_email").css("display","block");
			$("#reg .succ_email").css("display","none");
		}
	});


	//电子邮件补全系统键入
	$("form").form("email").bind("keyup",function(event)
	{
		if($(this).value().indexOf("@") == -1)
		{
			$("#reg .all_email").css("display","block");
			$("#reg .all_email li span").html($(this).value());
		}
		else
		{
			$("#reg .all_email").css("display","none");
		}

		$("#reg .all_email li").css("background","none");
		$("#reg .all_email li").css("color","#666");

		if(event.keyCode == 40)
		{
			if(this.index == undefined || this.index >= $("#reg .all_email li").length()-1)
				this.index = 0;
			else
				this.index++;

			$("#reg .all_email li").eq(this.index).css("background","#e5edf2");
			$("#reg .all_email li").eq(this.index).css("color","#369");
		}

		if(event.keyCode == 38)
		{
			if(this.index == undefined || this.index <= 0)
				this.index = $("#reg .all_email li").length()-1;
			else
				this.index--;

			$("#reg .all_email li").eq(this.index).css("background","#e5edf2");
			$("#reg .all_email li").eq(this.index).css("color","#369");
		}

		if(event.keyCode == 13)
		{
			$(this).value($("#reg .all_email li").eq(this.index).text());
			$("#reg .all_email").css("display","none");
			this.index = undefined;
		}


	});
	//电子邮件补全系统点击获取
	//PS:click事件是点击弹起后触发的，但是blur在前，点不到
	$("#reg .all_email li").bind("mousedown",function(){
		$("form").form("email").value($(this).text());
	});

	//电子邮件补全系统鼠标移入移出效果
	$("#reg .all_email li").hover(function(){
		$(this).css("background","#e5edf2");
		$(this).css("color","#369");
	},function(){
		$(this).css("background","none");
		$(this).css("color","#666");
	});

	//年月日
	var year = $("form").form("year");
	var month = $("form").form("month");
	var day = $("form").form("day");

	var day30 = [4,6,9,11];
	var day31 = [1,3,5,7,8,10,12];

	//注入年
	for(var i= 1950;i<=2013;i++)
	{
		year.first().add(new Option(i,i),undefined);
	}

	//注入月
	for(var i= 1;i<=12;i++)
	{
		month.first().add(new Option(i,i),undefined);
	}

	//注入日
	year.bind("change",select_day);
	//注入日
	month.bind("change",select_day);

	function select_day(){
		if(year.value() != 0 && month.value() != 0)
		{
			day.first().options.length = 1;
			var cur_day = 0;

			if(inArray(day31,parseInt(month.value())))
			{
				cur_day = 31;
			}
			else if(inArray(day30,parseInt(month.value())))
			{
				cur_day = 30;
			}
			else
			{
				if((parseInt(year.value())%4 == 0 && parseInt(year.value())%100 != 0)||parseInt(year.value())%400 == 0)
				{
					cur_day = 29;
				}
				else
				{
					cur_day = 28;
				}
				
			}
			for(var i=1;i<=cur_day;i++)
				{
					day.first().add(new Option(i,i),undefined);
				}
		}
		else
		{
			day.first().options.length = 1;
		}
	}

	//备注
	$('form').form('ps').bind('keyup',check_ps).bind('paste',function(){
		setTimeout(check_ps,50);
	});

	//清尾
	$('#reg .ps .clear').click(function(){
		$('form').form('ps').value($('form').form('ps').value().substring(0,5));
		check_ps();
	});

	function check_ps()
	{
		var num = 5 - $('form').form('ps').value().length;
		if(num >= 0)
		{
			$('#reg .ps').eq(0).css('display','block');
			$('#reg .ps .num').eq(0).html(num);
			$('#reg .ps').eq(1).css('display','none');
		}
		else
		{
			$('#reg .ps').eq(0).css('display','none');
			$('#reg .ps .num').eq(1).html(Math.abs(num)).css('color','orange');
			$('#reg .ps').eq(1).css('display','block');
		}
	}

});



