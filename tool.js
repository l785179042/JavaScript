

//跨浏览器事件绑定
function addEvent(obj,type,fn)
{
	if(typeof obj.addEventListener != 'undefined')
		obj.addEventListener(type,fn,false);
	else
	{
		if(!obj.events)	obj.events = {};
		if(!obj.events[type])
		{
			obj.events[type] = [];
			if(obj['on'+type])	obj.events[type][0] = fn;
		}
		else
		{
			if(addEvent.equal(obj.evens[type],fn))
				return false;
		}
		obj.events[type][addEvent.ID++] = fn;
		obj['on'+type] = addEvent.exec;
		
	}
}

//事件计数器
addEvent.ID = 1;

//执行事件处理函数
addEvent.exec = function(event)
{
	var e = event||addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for(var i in es)
	{
		es[i].call(this,e);
	}
}

//相同函数屏蔽
addEvent.equal = function(es,fn)
{
	for(var i in es)
	{
		if(es[i] == fn)
			return true;
	}
	return false;
}

//IE常用函数匹配W3C标准
addEvent.fixEvent = function(event)
{
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
}

//IE阻止默认行为
addEvent.fixEvent.preventDefault = function()
{
	this.returnValue = false;
} 

//IE取消冒泡
addEvent.fixEvent.stopPropagation = function()
{
	this.cancelBubble = true;
}

//跨浏览器删除事件
function removeEvent(obj,type,fn)
{
	if(typeof obj.removeEventListener != 'undefined')
		obj.removeEventListener(type,fn,false);
	else
	{
		for(var i in obj.events[type])
		{
			if(obj.events[type][i] == fn)
				delete obj.events[type][i];
		}
	}
}

//跨浏览器获取滚动条位置
function getScroll()
{
	return{
		top : document.documentElement.scrollTop || document.body.scrollTop,
		left : document.documentElement.scrollLeft || document.body.scrollLeft
	}
}

//跨浏览器获取视窗大小
function getInner()
{
	if(typeof window.innerWidth != 'undefined')
	{
		return{
			width:window.innerWidth,
			height:window.innerHeight
		}
	}
	else
	{
		return{
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
}

//跨浏览器获取Style
function getStyle(element,attr)
{
	var value;
	if(typeof window.getComputedStyle != 'undefined')
	{
		value = window.getComputedStyle(element,null)[attr];
	}
	else if(typeof element.currentStyle != 'undefined')
	{
		value = element.currentStyle[attr];
	}
	return value;
}

//跨浏览器添加link规则
function insertRule(sheet,selector,cssText,position)
{
	if(typeof sheet.insertRule != 'undefined')	//W3C
	{
		sheet.insertRule(selector + '{' + cssText + '}',position);
	}
	else if(typeof sheet.addRule != 'undefined')	//IE
	{
		sheet.addRule(selector,cssText,position);
	}
}

//跨浏览器删除link规则
function deleteRule(sheet,index)
{
	if(typeof sheet.deleteRule != 'undefined')	//W3C
	{
		sheet.deleteRule(index);
	}
	else if(typeof sheet.removeRule != 'undefined')	//IE
	{
		sheet.removeRule(index);
	}
}

//跨浏览器获取innerText
function getText(element, text) 
{
	return (typeof element.textContent == 'string') ? element.textContent:element.innerText;
}

//跨浏览器获取innerText
function setText(element, text) 
{
	if (typeof element.textContent == 'string') 
	{
		element.textContent = text;
	} 
	else 
	{
		element.innerText = text;
	}
}

//获取event对象
function getEvent(ev)
{
	return e = ev||window.event;
}

//取消默认行为
function preDef(event)
{
	var e = getEvent(event);
	if(typeof e.preventDefault != 'undefined')
		e.preventDefault();
	else
		e.returnValue = false;
}

//删除左右空格
function trim(str)
{
	return str.replace(/(^\s*)|(\s*$)/g,'');
}

//滚动条清零
function scrollTop(){
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}

//DOM加载
function addDomLoaded(fn)
{
	if(document.addEventListener)
	{
		addEvent(document,'DOMContentLoaded',function () {
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee)	
		})
	}
	else
	{
		var timer = null;
		timer = setInterval(function () {
			try{
				document.documentElement.doScroll('left');
				fn();
			}
			catch(e){};
		});
	}
}

//检测某值是否存在于某个数组中
function inArray(array,value)
{
	for(var i in array)
	{
		if(array[i] === value)
			return true;
	}
	return false;
}

