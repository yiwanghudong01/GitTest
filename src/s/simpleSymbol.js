var SimpleWildSymbol = cc.Sprite.extend({
               _shank:null,
               _symbol:null,
               ctor:function(duration){
                                this._super("#hole.png");
                                this.setAnchorPoint(cc.p(0,0));
                                 this.width  =180;
                                 this.height = 180;
                               
                                 this._selfChange(duration);           
               },
               _selfChange:function(duration)
               {
               	    var self = this;
                    var framename = SymbolData[0].type.framename;
                    framename = framename.replace(/#/,'');
               	    var frame = cc.spriteFrameCache.getSpriteFrame(framename);
                                this._shank = new Shank();

                                 var change = new cc.CallFunc(function(){
                                       self.setSpriteFrame(frame);
                                       self.addChild(self._shank);
                                 },this);
               	     this.runAction(cc.sequence(new cc.DelayTime(duration),change));    
               }

});