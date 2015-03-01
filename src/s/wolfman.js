var WolfMan  = cc.Sprite.extend({
	_action_wait:null,
	_action_fire:null,
	ctor:function(){
		this._super("#wolfman_f01.png");
		this.initAnimate();
	}
	,
	initAnimate:function(){
                              
                              //初始化等待动作
		  var frames = [];
                              for(var i=1;i<=9;i++)
                              {
        	                        var f =cc.spriteFrameCache.getSpriteFrame("wolfman_f0"+i+".png");
        	                        frames.push(f);
                               }
                               frames.push(cc.spriteFrameCache.getSpriteFrame("wolfman_f10.png"));
                               var animation = cc.Animation.create(frames,0.1);
                               var animate = cc.Animate.create(animation);
                               this._action_wait = new cc.RepeatForever(animate);
                               this._action_wait.setTag("wait");
                              
                              //初始化开枪动作
                              frames = [];
                              for(i=1;i<=3;i++)
                              {
        	                        f =cc.spriteFrameCache.getSpriteFrame("wolffire_f0"+i+".png");
        	                        frames.push(f);
                               }
                               animation = cc.Animation.create(frames,0.15);
                               animate = cc.Animate.create(animation);
                               this._action_fire = new cc.RepeatForever(animate);
                               this._action_fire.setTag("fire");
	},
	wait:function(){
		this.stopAllActions();
		this.runAction(this._action_wait);
	}
	,fire:function(){
                             this.stopAllActions();
                             cc.audioEngine.playEffect(res.Voice_gun_shoot);
		this.runAction(this._action_fire);
	}
});