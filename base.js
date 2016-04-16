

//creater: liu
//First JavaScript Base
//2016.4.15

//调用
function $(_this)
{
	return new Base(_this);
}

function Base(_this)
{
	//获取节点或者节点集合
	this.elements = [];
	if(_this != undefined)
		this.elements[0] = _this;

}

//获取ID元素节点
Base.prototype.getId = function(id)
{
	this.elements.push(document.getElementById(id));
	return this;
}

//获取元素集合
Base.prototype.getTagName = function(tag)
{
	var tags = document.getElementsByTagName(tag);
	for(var i=0;i<tags.length;i++)
	{
		this.elements.push(tags[i]);
	}
	return this;
}

//获取单一节点
Base.prototype.getElement = function(num)
{
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
}

//设置样式
Base.prototype.css = function(attr,value)
{
	for(var i=0;i<this.elements.length;i++)
	{
		if(arguments.length == 1)
		{
			if(typeof window.getComputedStyle != 'undefined')	//W3C
			{
				return window.getComputedStyle(this.elements[i],null)[attr];
			}
			else if(typeof this.elements[i].currentStyle != 'undefined')	//IE
			{
				return this.elements[i].currentStyle[attr];
			}
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}


//设置innerHTML
Base.prototype.html = function(inner)
{
	for(var i=0;i<this.elements.length;i++)
	{
		if(arguments.length == 0)
			return this.elements[i].innerHTML;
		this.elements[i].innerHTML = inner;
	}
	return this;
}

//获取class节点数组
Base.prototype.getClass = function(className,idName)
{
	if(arguments.length == 1)
		var all = document.getElementsByTagName("*");
	else
		var all = document.getElementById(idName).getElementsByTagName("*");
	for(var i=0;i<all.length;i++)
	{
		if(all[i].className == className)
		{
			this.elements.push(all[i]);
		}
	}
	return this;
}

//添加class
Base.prototype.addClass = function(className)
{
	for(var i=0;i<this.elements.length;i++)
	{
		if(!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')))
			this.elements[i].className += ' ' + className;
	}
	return this;
}

//移除class
Base.prototype.removeClass = function(className)
{
	for(var i=0;i<this.elements.length;i++)
	{
		if(this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')))
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'),"");
	}
	return this;
}

//添加link或style的css规则
Base.prototype.addRule = function(num,selector,cssText,position)
{
	var sheet = document.styleSheets[num];
	insertRule(sheet,selector,cssText,position);
	return this;
}

//移除link或style的css规则
Base.prototype.removeRule = function(num,index)
{
	var sheet = document.styleSheets[num];
	deleteRule(sheet,index);
	return this;
}

//设置事件
Base.prototype.click = function(fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].onclick = fn;
	}
	return this;
}

//设置鼠标移入移出效果
Base.prototype.hover = function(fn1,fn2)
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].onmouseover = fn1;
		this.elements[i].onmouseout = fn2;
	}
	return this;
}

//设置显示
Base.prototype.show = function()
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].style.display = 'block';
	}
	return this;
}


//设置隐藏
Base.prototype.hide = function()
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].style.display = 'none';
	}
	return this;
}

//设置对象居中
Base.prototype.center = function(width,height)
{
	var top = (document.documentElement.clientHeight-height)/2;
	var left = (document.documentElement.clientWidth-width)/2;
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].style.top = top + 'px';
		this.elements[i].style.left = left + 'px';
	}
	return this;
}

//浏览器缩放事件
Base.prototype.resize = function(fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
		var element = this.elements[i];
		window.onresize = function(){
			fn();
			if(element.offsetLeft>getInner().width-element.offsetWidth)
				element.style.left = getInner().width-element.offsetWidth + 'px';
			if(element.offsetTop>getInner().height-element.offsetHeight)
				element.style.top = getInner().height-element.offsetHeight + 'px';
		};
	}

	return this;
}

//锁屏功能
Base.prototype.lock = function()
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].style.height = getInner().height + 'px';
		this.elements[i].style.width = getInner().width + 'px';
		document.documentElement.style.overflow = 'hidden';
	}
	return this;
}

//解锁功能
Base.prototype.unlock = function()
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].style.height = 0;
		this.elements[i].style.width = 0;
		document.documentElement.style.overflow = 'auto';
	}
	return this;
}


//拖拽功能
Base.prototype.drag = function()
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].onmousedown = function(ev)
		{
			preDef(ev);	//兼容旧版火狐
			var _this = this;
			var e = getEvent(ev);
			var x = e.clientX - _this.offsetLeft;
			var y = e.clientY - _this.offsetTop;
			if(typeof _this.setCapture != 'undefined')	//兼容IE bug
				_this.setCapture();
			document.onmousemove = function(ev)
			{
				var e = getEvent(ev);
				var left = e.clientX- x;
				var top = e.clientY- y;
				if(left < 0)
					left = 0;
				else if(left > getInner().width - _this.offsetWidth)
					left = getInner().width - _this.offsetWidth;
				if(top < 0)
					top = 0;
				else if(top > getInner().height - _this.offsetHeight)
					top = getInner().height - _this.offsetHeight;
				_this.style.left = left + 'px';
				_this.style.top = top + 'px';
			}
			document.onmouseup = function()
			{
				this.onmousemove = null;
				this.onmouseup = null;
				if(typeof _this.releaseCapture != 'undefined')	//兼容IE bug
					_this.releaseCapture();
			}
		};
	}
	return this;
}
