
//浏览器检测
// (function (){
// window.sys = {};
// var ua = navigator.userAgent.toLowerCase();
// var s;
// (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
// (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
// (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
// (s = ua.match(/opera.*version\/([\d.]+)/)) ? sys.opera = s[1] :
// (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
// })();


addDomLoaded(function(){
	$("#btn").click(function(){
		$('#box').animate({
			'attr':'x',
			'start':100,
			'target':500,
			'step':7,
			'type':1
		});
	});
});















