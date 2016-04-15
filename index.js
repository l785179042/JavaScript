
window.onload = function()
{
	$().getClass('member').hover(function(){
		$(this).css("background","url(images/arrow.png) no-repeat right");
		$().getId('list').show();
	},function(){
		$(this).css("background","url(images/arrow2.png) no-repeat right");
		$().getId('list').hide();
	});

	//登陆框
	$().getId('login').center(350,250).resize(function(){
		$().getId('login').center(350,250);
	});

	$().getClass("login").click(function(){
		$().getId('login').css('display','block');
	});

	$().getClass("close").click(function(){
		$().getId('login').css('display','none');
	});


}
