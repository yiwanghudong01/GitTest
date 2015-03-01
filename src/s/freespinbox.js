var FreeSpinBox = cc.Sprite.extend({
	_wait:null,
	_notifaction:null,
	ctor:function(w){
		this._super("#free7_f01.png");
		this.setAnchorPoint(cc.p(0,0));
		this.init();
		this.width  = 488;
		this.height =332;
		this._wait = w;
	},
	setNotifaction:function(noti){
		this._notifaction = noti; 
	}
	,
	init:function(){
		var self = this;
                             var frames = [];
                             for(var i=1;i<=5;i++)
                             {
        	                       var f =  cc.spriteFrameCache.getSpriteFrame("free7_f0"+i+".png");
        	                       frames.push(f);
                             }
                             var animation = cc.Animation.create(frames, 0.1);
                             var animate = cc.Animate.create(animation);
                             
                             this.runAction(cc.sequence(animate,new cc.DelayTime(3),animate.reverse(),new cc.CallFunc(function(){
                             	GAMEOB.sendNotifaction(self._notifaction,self);
                             },this)));

		 return true;
	}
	
});