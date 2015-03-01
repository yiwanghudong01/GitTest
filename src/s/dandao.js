var DanDao = cc.Sprite.extend({
	_notifaction:null,
	duration:0.3,
	ctor:function(){
		this._super("#dandao_f01.png");
		this.setAnchorPoint(cc.p(0,0));
		this.init();
		this.width  = 180;
		this.height =180;
	}
	,
              setNotifaction:function(noti){
              	this._notifaction = noti
              }
	,
	init:function(){
		var self =this;
                             var frames = [];
                             for(var i=1;i<=3;i++)
                             {
        	                       var f =  cc.spriteFrameCache.getSpriteFrame("dandao_f0"+i+".png");
        	                       frames.push(f);
                             }
                             var animation = cc.Animation.create(frames,0.1);
                             var animate = cc.Animate.create(animation);
                             this.runAction(cc.sequence(animate,new cc.CallFunc(function(){
                             	  self.parent.removeChild(self);
                             },this)));
		 return true;
	}
	
});