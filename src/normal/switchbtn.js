var SwitchButton = cc.Sprite.extend({
    Isdisable:false,
	status:1,
	listener:null,
	callback:null,
	_notifaction:null,
	ctor:function(file1,file2,rect,rouate)
	{
	
	     var self = this;
		 this.frame_autoon  = cc.textureCache.addImage(file1);
		 this.frame_autooff = cc.textureCache.addImage(file2);
	               this._super();
		 this.setAnchorPoint(cc.p(0,0));
                             this.setTexture(this.frame_autoon);
		 this.setTextureRect(rect);
 
		 this.listener = cc.EventListener.create({
		      event:cc.EventListener.MOUSE,
			  onMouseDown:function(e){},
			  onMouseUp:function(e){
 
					var ison = self.isOnMe(parseInt(e.getLocationX()),parseInt(e.getLocationY()));
					if(self.Isdisable==false&&ison)
			                             {
					    
					             if(self.status==1)
						   self.status = 0;
						else
						   self.status = 1;
						
						//cc.log('dian');
						self.setAble();
						//回调执行完毕之后
						var b = self.status==1?true:false;
						if(self.callback!=undefined)self.callback(b);
						
						GAMEOB.sendNotifaction(self._notifaction,self);
                                                                         }					
					 
				  }
		 });
		 cc.eventManager.addListener(this.listener,this);
	}
	,
              setNotifaction:function(name){
                 this._notifaction = name;
              },
	setStatus:function(s)
	{
		 this.status =s;
		 this.setAble();
		 var b = self.status==1?true:false;
		 if(self.callback!=undefined)self.callback(b);
	}
	,
	setEnabled:function(bool)
	{
		this.Isdisable = !bool;
		if(bool)
			this.setAble()
	    else
            this.setDisable();

	}
	,	
    setDisable:function(){
	    
		this.setColor(cc.color(150,150,150));
	}
	,
	setAble:function()
	{ 
		this.setColor(cc.color(255,255,255));
		if(this.status==1)
		{
		  this.setTexture(this.frame_autoon);
		}
		else if(this.status==0)
		{
		 this.setTexture(this.frame_autooff);
		}
	}
	,
	isOnMe:function(x,y)
	{
	     var worldx = parseInt(this.x);
		 var worldy = parseInt(this.y);
		 //cc.log(worldx+":"+worldy)
		 //cc.log(this.width+":"+this.height);
		 if(x>worldx && x<parseInt(this.width+worldx)  && y>worldy && y<parseInt(this.height+worldy))
		 {
		    return true;
		 }
		return false;
	}
});