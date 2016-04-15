

//creater: liu
//First JavaScript Base
//2016.4.15

function Base()
{
	//获取节点或者节点集合
	this.elements = [];
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

//调用
function $()
{
	return new Base();
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
	if(typeof sheet.insertRule != 'undefined')	//W3C
	{
		sheet.insertRule(selector + '{' + cssText + '}',position);
	}
	else if(typeof sheet.addRule != 'undefined')	//IE
	{
		sheet.addRule(selector,cssText,position);
	}
	return this;
}

//移除link或style的css规则
Base.prototype.removeRule = function(num,index)
{
	var sheet = document.styleSheets[num];
	if(typeof sheet.deleteRule != 'undefined')	//W3C
	{
		sheet.deleteRule(index);
	}
	else if(typeof sheet.removeRule != 'undefined')	//IE
	{
		sheet.removeRule(index);
	}
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



//获取单一节点
Base.prototype.getElement = function(num)
{
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
}















