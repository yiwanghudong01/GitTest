var Bigwin = cc.Sprite.extend({
              _bigwin_obj:null,
              _bigwin_white_obj:null,
              _light_left_obj:null,
              _light_right_obj:null,
              _margin:10,
              _light_width:222,
              _bigwin_width :650,
	ctor:function(){
                     this._super();
                     this.setAnchorPoint(cc.p(0,0));
                     this.init();
	},
	init:function(){
                            
                            this._bigwin_obj = new cc.Sprite("#bigwin.png");
                            this._bigwin_obj.setAnchorPoint(cc.p(0,0));

                            this._light_left_obj = new Light();
                            this._light_right_obj = new Light();
                            
                            this.addChild(this._bigwin_obj,2);
                            this.addChild(this._light_left_obj ,1);
                            this.addChild(this._light_right_obj ,1);
                            
                             this.l1 ={x:0,y:15}
                             this.l2={x:this._light_width+this._margin*2+this._bigwin_width-20,y:15}
                             this.b = {x:this._light_width+this._margin,y:0}

                            
                            this._light_left_obj.setPosition(this.l1.x,this.l1.y);
                            this._bigwin_obj.setPosition(this.b.x,this.b.y);
                            this._light_right_obj.setPosition(this.l2.x,this.l2.y);

		return true;
	}
	,
	Begin:function(){
                            
                            var zoomspeed =0.4;
                            
                             var  zoombig        = new cc.ScaleTo(zoomspeed,1.2,1.2);
                             var  zoomback     =  new cc.ScaleTo(zoomspeed,1,1);
                             var movebig = new cc.MoveTo(zoomspeed,this.b.x-65,this.b.y);
                             var movesmall = new cc.MoveTo(zoomspeed,this.b.x,this.b.y);
                             var a1  = new cc.RepeatForever(cc.sequence(zoombig,zoomback));
                             var m1 = new  cc.RepeatForever(cc.sequence(movebig,movesmall));
                             var m2 = new cc.RepeatForever(cc.sequence(new cc.MoveTo(zoomspeed,this.l1.x-20,this.l1.y),new cc.MoveTo(zoomspeed,this.l1.x,this.l1.y)));
                             var m3 = new cc.RepeatForever(cc.sequence(new cc.MoveTo(zoomspeed,this.l2.x-20,this.l2.y),new cc.MoveTo(zoomspeed,this.l2.x,this.l2.y)));



                             this._light_left_obj.runAction(a1.clone());
                             this._light_left_obj.runAction( m2);

                             this._light_right_obj.runAction(a1.clone());
                             this._light_right_obj.runAction(m3);

                             this._bigwin_obj.runAction(a1);
                             this._bigwin_obj.runAction(m1);
                             //this._bigwin_white_obj.runAction(a2)

	}

});