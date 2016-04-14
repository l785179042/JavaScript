

//creater: liu
//First JavaScript Base

function Base()
{
	//获取节点或者节点集合
	this.elements = [];

	//获取ID元素节点
	this.getId = function(id)
	{
		this.elements.push(document.getElementById(id));
		return this;
	}

	//获取元素集合
	this.getTagName = function(tag)
	{
		var tags = document.getElementsByTagName(tag);
		for(var i=0;i<tags.length;i++)
		{
			this.elements.push(tags[i]);
		}
		return this;
	}

}


function $()
{
	return new Base();
}


//设置样式
Base.prototype.css = function(attr,value)
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].style[attr] = value;
	}
	return this;
}


//设置innerHTML
Base.prototype.html = function(inner)
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].innerHTML = inner;
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


