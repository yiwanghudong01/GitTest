var Shank = cc.Sprite.extend({
	ctor:function(){
		this._super("#shank_f01.png");
		this.setAnchorPoint(cc.p(0,0));
		this.init();
		this.width  = 180;
		this.height =180;
	}
	,
	init:function(){
                             var frames = [];
                             for(var i=1;i<=7;i++)
                             {
        	                       var f =  cc.spriteFrameCache.getSpriteFrame("shank_f0"+i+".png");
        	                       frames.push(f);
                             }
                             var animation = cc.Animation.create(frames, 0.15);
                             var animate = cc.Animate.create(animation);
                             this.runAction(new cc.RepeatForever(animate));
		 return true;
	}
	
});