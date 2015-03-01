var Door = cc.Sprite.extend({
	_isOpen:false,
	_notifaction:null,
	ctor:function(){
		 this._super("#door_f01.png");
		 this.setAnchorPoint(cc.p(0,0));
	},
              setNotifaction:function(name){
              this._notifaction = name;
              },
	openDoor:function(){
		  this._isOpen = true;
                              var frames = [];
                              for(var i=1;i<=3;i++)
                              {
        	                        var f =cc.spriteFrameCache.getSpriteFrame("door_f0"+i+".png");
        	                        frames.push(f);
                               }
                               var animation = cc.Animation.create(frames,0.1);
                               var animate = cc.Animate.create(animation);
                              var self = this;
                              var endcall = new cc.CallFunc(function(){
                              	 if(GAMEOB!=undefined&&self._notifaction!=null)
                                            GAMEOB.sendNotifaction(self._notifaction,self);
                              },this);

                              this.runAction(cc.sequence(animate,endcall));
	}
	,
	closeDoor:function(){
                              this._isOpen = false;
                               var frames = [];
                              for(var i=3;i>=1;i--)
                              {
        	                        var f =cc.spriteFrameCache.getSpriteFrame("door_f0"+i+".png");
        	                        frames.push(f);
                               }
                                var self = this;
                               var animation = cc.Animation.create(frames,0.1);
                               var animate = cc.Animate.create(animation);
                                var endcall = new cc.CallFunc(function(){
                              	 if(GAMEOB!=undefined&&self._notifaction!=null)
                                            GAMEOB.sendNotifaction(self._notifaction,self);
                              },this);
                              this.runAction(cc.sequence(animate,endcall));
	}
 


});