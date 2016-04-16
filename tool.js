
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


