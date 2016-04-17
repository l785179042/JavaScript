
$().extend('drag',function(tags){
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].onmousedown = function(ev)
		{
			if(trim(this.innerHTML).length == 0)
			{
				preDef(ev);	//兼容旧版火狐
			}
			var _this = this;
			var e = getEvent(ev);
			var x = e.clientX - _this.offsetLeft;
			var y = e.clientY - _this.offsetTop;

			//自定义拖拽区域
			var flag = false;

			for(var i=0;i<tags.length;i++)
			{
				if(e.target == tags[i])
				{
					flag = true;
					break;
				}
			}

			if(flag)
			{
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
					if(typeof _this.setCapture != 'undefined')	//兼容IE bug
					_this.setCapture();
				}
				document.onmouseup = function()
				{
					this.onmousemove = null;
					this.onmouseup = null;
					if(typeof _this.releaseCapture != 'undefined')	//兼容IE bug
						_this.releaseCapture();
				}
			}	
		};
	}
	return this;
});
