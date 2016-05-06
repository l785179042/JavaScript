

//creater: liu
//First JavaScript Base
//2016.4.15

//调用
function $(args)
{
	return new Base(args);
}

//核心库
function Base(args)
{
	//获取节点或者节点集合
	this.elements = [];

	if(typeof args == 'string')
	{
		//css模拟
		if(args.indexOf(' ') != -1)
		{
			var elements = args.split(' ');
			var childElements = [];
			var node = [];
			for (var i = 0; i < elements.length; i++) {
				if(node.length == 0)node.push(document);
				switch(elements[i].charAt(0))
				{
					case'#':
						childElements = [];
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;
						break;
					case'.':
						childElements = [];
						for (var j = 0; j < node.length; j++) {
							var temps = this.getClass(elements[i].substring(1),node[j]);
							for (var k = 0; k < temps.length; k++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
						break;
					default:
						childElements = [];
						for (var j = 0; j < node.length; j++) {
							var temps = this.getTagName(elements[i],node[j]);
							for (var k = 0; k < temps.length; k++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
				}
			}
			this.elements = childElements;
		}
		//find模拟
		else
		{
			switch(args.charAt(0))
			{
				case'#':
					this.elements.push(this.getId(args.substring(1)));
					break;
				case'.':
					this.elements = this.getClass(args.substring(1));
					break;
				default:
					this.elements = this.getTagName(args);
			}
		}
		
	}
	else if(typeof args == 'object')
	{
		if(args != undefined)
			this.elements[0] = args;
	}
	else if (typeof args == 'function') 
	{
		this.ready(args);
	}
}

//addDomLoaded
Base.prototype.ready = function(fn)
{
	addDomLoaded(fn)
};


//设置CSS选择器子节点
Base.prototype.find = function(str)
{
	var childElements = [];
	for(var i=0;i<this.elements.length;i++)
	{
		switch(str.charAt(0))
		{
			case'#':
				childElements.push(document.getElementById(str.substring(1)));
				break;
			case'.':
				var temps = this.getClass(str.substring(1),this.elements[i]);
				for(var j=0;j<temps.length;j++)
					childElements.push(temps[j]);
				break;
			default:
				var temps = this.getTagName(str,this.elements[i]);
				for(var j=0;j<temps.length;j++)
					childElements.push(temps[j]);
		}
	}
	this.elements = childElements;
	return this;
}

//获取ID元素节点
Base.prototype.getId = function(id)
{
	return document.getElementById(id);
}

//获取元素集合
Base.prototype.getTagName = function(tag,parentNode)
{
	var node = null;
	var temps = [];
	if(parentNode != undefined)
		node = parentNode;
	else
		node = document;
	var tags = node.getElementsByTagName(tag);
	for(var i=0;i<tags.length;i++)
		temps.push(tags[i]);
	return temps;
}

//获取单一节点，并返回该节点
Base.prototype.ge = function(num)
{
	return this.elements[num];
}

//获取首个节点，并返回这个节点对象
Base.prototype.first = function()
{
	return this.elements[0];
}

//获取结尾节点，并返回这个节点对象
Base.prototype.last = function()
{
	return this.elements[this.elements.length-1];
}

//获取某组节点的数量
Base.prototype.length = function()
{
	return this.elements.length;
}

//获取单一节点，并返回Base对象
Base.prototype.eq = function(num)
{
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
}

//获取当前节点的下一个节点
Base.prototype.next = function()
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i] = this.elements[i].nextSibling;
		if(this.elements[i] == null) throw new Error("wrong");
		if(this.elements[i].nodeType == 3)this.next();
	}
	return this;
}

//获取当前节点的上一个节点
Base.prototype.prev = function()
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i] = this.elements[i].previousSibling;
		if(this.elements[i] == null) throw new Error("wrong");
		if(this.elements[i].nodeType == 3)this.next();
	}
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

//设置表单字段元素
Base.prototype.form = function(name)
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i] = this.elements[i][name];
	}
	return this;
}

//设置表单字段内容获取
Base.prototype.value = function(str)
{
	for(var i=0;i<this.elements.length;i++)
	{
		if(arguments.length == 0)
			return this.elements[i].value;
		this.elements[i].value = str;
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

//设置innerTEXT
Base.prototype.text = function(inner)
{
	for(var i=0;i<this.elements.length;i++)
	{
		if(arguments.length == 0)
			return getText(this.elements[i]);
		setText(this.elements[i],inner);
	}
	return this;
}

//获取class节点数组
Base.prototype.getClass = function(className,parentNode)
{
	var node = null;
	var temps = [];
	if(parentNode != undefined)
		node = parentNode;
	else
		node = document;
	var all = node.getElementsByTagName('*');
	for(var i=0;i<all.length;i++)
	{
		//if(all[i].className == className)
		if((new RegExp('(\\s|^)' + className + '(\\s|$)')).test(all[i].className))
		{
			temps.push(all[i]);
		}
	}
	return temps;
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

//设置事件发生器
Base.prototype.bind = function(event,fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
		addEvent(this.elements[i],event,fn);
	}
	return this;
}

//设置鼠标移入移出效果
Base.prototype.hover = function(fn1,fn2)
{
	for(var i=0;i<this.elements.length;i++)
	{
		addEvent(this.elements[i],'mouseover',fn1);
		addEvent(this.elements[i],'mouseout',fn2);
	}
	return this;
}

//设置点击切换效果
Base.prototype.toggle = function()
{
	for(var i=0;i<this.elements.length;i++)
	{
		(function (element,args) {
			var count = 0;
			addEvent(element,"click",function(){
				args[count++ % args.length].call(this);
			});
		})(this.elements[i],arguments);
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
	var top = (getInner().height-height)/2;
	var left = (getInner().width-width)/2;
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
		addEvent(window,'scroll',scrollTop);
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
		removeEvent(window,'scroll',scrollTop);
	}
	return this;
}

//设置动画
var timer = null;
Base.prototype.animate = function(object)
{
	for(var i=0;i<this.elements.length;i++)
	{
		var element = this.elements[i];
		var attr = object['attr'] == 'x' ? 'left' : object['attr'] == 'y' ? 'top' : object['attr'] == 'w' ? 'width' : object['attr'] == 'h' ? 'height' : object['attr'] == 'o' ? 'opacity' : object['attr'] != undefined ? object['attr'] : 'left';
		var start = object['start'] != undefined ? object['start'] : attr == 'opacity' ? parseFloat(getStyle(element,attr))*100 : parseInt(getStyle(element,attr));
		var t = object['t'] != undefined ? object['t'] : 30;
		var step = object['step'] != undefined ? object['step'] : 5;
		
		var alter = object['alter'];
		var target = object['target'];
		var mul = object['mul'];

		if(alter != undefined && target == undefined)
		{
			target = alter + start;
		}
		else if(alter == undefined && target == undefined && mul == undefined)
		{
			throw new Error('the param is wrong');
		}


		var time = t;

		var speed = object['speed'] != undefined ? object['speed'] : 6;
		var type = object['type'] == 0 ? 'constant' : object['type'] == 1 ? 'buffer' : 'buffer';

		if(start > target)
			step = -step;
		if(attr == 'opacity')
		{
			element.style.opacity = start/100;
			element.style.filter = 'alpha(opacity='+start+')';
		}
		else
		{
			//element.style[attr] = start + 'px';
		}

		if(mul == undefined)
		{
			mul = {};
			mul[attr] = target;
		}


		clearInterval(element.timer);
		element.timer = setInterval(function()
		{

			var flag = true;

			for(var i in mul)
			{
				attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
				target = mul[i];
				if(type == "buffer")
				{
					step = attr == 'opacity'? (target-parseFloat(getStyle(element,attr))*100)/speed : (target-parseInt(getStyle(element,attr)))/speed;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
				}

				if(attr == 'opacity')
				{
					var temp = parseFloat(getStyle(element,attr))*100;
					if(step == 0)
					{
						setOpacity()
					}
					else if(step > 0 && Math.abs(parseFloat(getStyle(element,attr))*100-target) <= Math.abs(step))
					{
						setOpacity()
					}
					else if(step < 0 && Math.abs(parseFloat(getStyle(element,attr))*100-target) <= Math.abs(step))
					{
						setOpacity()
					}
					else
					{
						element.style.opacity = parseInt(temp + step)/100;
						element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
					}

					if(parseInt(target) != parseInt(parseFloat(getStyle(element,attr))*100))
						flag = false;
				}
				else
				{
					if(step == 0)
					{
						setTarget();
					}
					else if(step > 0 && Math.abs(parseInt(getStyle(element,attr))-target) <= Math.abs(step))
					{
						setTarget();
					}
					else if(step < 0 && Math.abs(parseInt(getStyle(element,attr))-target) <= Math.abs(step))
					{
						setTarget();
					}
					else
					{
						element.style[attr] = parseInt(getStyle(element,attr))+ step + 'px';
					}

					if(parseInt(target) != parseInt(getStyle(element,attr)))
						flag = false;
				}
			}
			if(flag)
			{
				clearInterval(element.timer);
				if(object.fn) object.fn();
			}
			
		},time);

		function setTarget()
		{
			element.style[attr] = target + 'px';	
		}
		function setOpacity()
		{
			element.style.opacity = parseInt(target)/100;
			element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';
		}
	}
	return this;
}

//插件入口
Base.prototype.extend = function(name,fn)
{
	Base.prototype[name] = fn;
}



