var Light = cc.Sprite.extend({
	ctor:function(){
		this._super("#light_f01.png");
		this.setAnchorPoint(cc.p(0,0));
		this.init();
		this.width  = 222;
		this.height =101;
	}
	,
	init:function(){
                             var frames = [];
                             for(var i=1;i<=4;i++)
                             {
        	                       var f =  cc.spriteFrameCache.getSpriteFrame("light_f0"+i+".png");
        	                       frames.push(f);
                             }
                             var animation = cc.Animation.create(frames, 0.15);
                             var animate = cc.Animate.create(animation);
                             this.runAction(new cc.RepeatForever(animate));
		 return true;
	}
	
});