var  LayerUI = cc.Layer.extend({
	 _UIBackgroundSprite:null,
        /*游戏脚本对象*/
        _gameScript:null,
	 /*动态数字对象*/
	 d_gamewin:null,
	 d_totalwin:null,
	 d_entries:null,
	 d_bomb:null,
	 d_reveal:null,
        d_freespin:null,
	 /*按钮对象*/
	 btn_exit:null,
	 btn_help:null,
	 btn_buy:null,
	 btn_menu:null,
	 btn_reveal:null,
	 btn_reveal_group:null,
        btn_swh_auto:null,
        btn_swh_bomb:null,
        /*其他对象*/
        door:null,
        wolfman:null,
        textbox:null,
        totalwinbox:null,
	 ctor:function() {
     this._super();
     this.init();
     this.initDnum();
     this.initBtn();
     this.initRevealRadio();
     this.initSwitchButton();
     this.initDoor();
     this.initWolfman();
     this.initTextbox();
  

      /* GAMEOB.register('what',function(){cc.log('i m ok');},1);
       GAMEOB.register('what',ok,2);*/

     },
     setGameScript:function(obj){
             this._gameScript = obj;
     }
     ,
     initTextbox:function(){

              this.textbox =  new cc.LabelTTF('Hello Welcome!',GMAESETUP.font_face,40);
              this.textbox .attr({lineWidth:2,strokeStyle:cc.color(0,0,0),fillStyle:cc.color(253,239,9),textAlign:cc.TEXT_ALIGNMENT_CENTER});
              this.textbox .setAnchorPoint(cc.p(0,0));
              this.textbox .setPosition(cc.p(380,100));
              this.addChild(this.textbox );

              this.totalwinbox =  new cc.LabelTTF(' ',GMAESETUP.font_face,30);
              this.totalwinbox .attr({lineWidth:2,strokeStyle:cc.color(0,0,0),fillStyle:cc.color(255,255,255),textAlign:cc.TEXT_ALIGNMENT_CENTER});
              this.totalwinbox .setAnchorPoint(cc.p(0,0));
              this.totalwinbox .setPosition(cc.p(100,105));
              this.addChild(this.totalwinbox );
     }
     ,
     setText:function(str)
     {
               this.textbox.setString(str);
     }
     ,
     setTotalText:function(str){

               this.totalwinbox.setString(str);
     }
     ,
     init:function(){
          
          this._UIBackgroundSprite = new cc.Sprite(res.LayerUI_png);
          this.addChild(this._UIBackgroundSprite);
          this._UIBackgroundSprite.setAnchorPoint(cc.p(0,0));
          return true;
     },
     initDoor:function(){
           this.door = new Door();
           this.addChild(this.door,2);
           this.door.setPosition(cc.p(1075,520));
           this.door.setNotifaction(CEVENT.DOOR_STATE_CHANGE);

     },
     initWolfman:function(){
           this.wolfman = new WolfMan();
           this.wolfman.setVisible(false);
           this.addChild(this.wolfman,3);
           this.wolfman.setPosition(cc.p(1195,565));
 
     }
     ,
     initBtn:function(){ 
            var self = this;
            this.btn_exit = new cc.MenuItemImage(res.ExitNormal_png,res.ExitSelected_png,res.ExitDisable_png,function(){cc.log('exit');
            	cc.audioEngine.playEffect(res.Voice_btn_click);},this);
            this.btn_exit.attr({
		    x: 292,
                                y: 5,
                                anchorX:0,
                                anchorY:0});

           this.btn_help = new cc.MenuItemImage(res.HelpNormal_png,res.HelpSelected_png,res.HelpDisable_png,function(){ 
           	      cc.audioEngine.playEffect(res.Voice_btn_click);
                    if(self._gameScript!=null)
                    {
                          self._gameScript.changeToHelpScene();
                    }

           },this);
           this.btn_help.attr({
		    x: 394,
                                y: 5,
                                anchorX:0,
                                anchorY:0});

           this.btn_buy = new cc.MenuItemImage(res.BuyNormal_png,res.BuySelected_png,res.BuyDisable_png,function(){cc.log('buy'); 
                               cc.audioEngine.playEffect(res.Voice_btn_click);
           },this);
           this.btn_buy.attr({
		    x: 972,
                                y: 5,
                                anchorX:0,
                                anchorY:0});

            this.btn_reveal = new cc.MenuItemImage(res.RevealNormal_png,res.RevealSelected_png,res.RevealDisabled_png,function(){
            	      cc.audioEngine.playEffect(res.Voice_btn_click);
                    if(self._gameScript!=null)
                    {
                          self._gameScript.wheelOnce();
                    }

            }, this);

            this.btn_reveal.attr({
                                x: 1080,
                                y: 15,
                               anchorX:0,
                               anchorY:0 });

 
            this.btn_menu = new cc.Menu(this.btn_exit);
            this.btn_menu.setPosition(cc.p(0,0));
            this.btn_menu.addChild(this.btn_help);
            this.btn_menu.addChild(this.btn_buy);
            this.btn_menu.addChild(this.btn_reveal);
            this.addChild(this.btn_menu,1);

     }
     ,
     initDnum:function(){ 
             /*配置 */
              var gamewin_config = {defaultNum:0,size:82,position:cc.p(1180,132),eventName:CEVENT.DNUM_GAMEWIN_OVER};
              var totalwin_config   = {defaultNum:GLOBAL_USER._num_totalwin,size:30,numType:DNumType.FLOAT,prefix:'$',position:cc.p(1260,235),eventName:CEVENT.DNUM_TOTAL_OVER}
              var entries_config     = {defaultNum:GLOBAL_USER._num_entries,size:30,position:cc.p(1260,325),eventName:CEVENT.DNUM_ENTRIES_OVER};
              var bomb_config       = {defaultNum:0,size:45,position:cc.p(55,43),speedRate:1,eventName:CEVENT.DNUM_BOMB_OVER};

     	 this.d_gamewin = DNumFactory(gamewin_config.defaultNum,gamewin_config.size);
               this.d_gamewin.setNotifaction(gamewin_config.eventName);
               this.d_gamewin.setPosition(gamewin_config.position);
               this.d_gamewin.setAttr({lineWidth:2,strokeStyle:cc.color(0,0,0),fillStyle:cc.color(253,239,9)});
               this.addChild(this.d_gamewin);


               this.d_totalwin= DNumFactory(totalwin_config.defaultNum,totalwin_config.size,totalwin_config.numType,totalwin_config.prefix);
	 this.d_totalwin.setNotifaction(totalwin_config.eventName);
	 this.d_totalwin.setPosition(totalwin_config.position);
	 this.d_totalwin.setAttr({lineWidth:1,strokeStyle:cc.color(0,0,0),fillStyle:cc.color(197,178,214)});
 	 this.addChild(this.d_totalwin);


 	 this.d_entries= DNumFactory(entries_config.defaultNum,entries_config.size);
 	 this.d_entries.setNotifaction(entries_config.eventName);
	 this.d_entries.setPosition(entries_config.position);
	 this.d_entries.setAttr({lineWidth:1,strokeStyle:cc.color(0,0,0),fillStyle:cc.color(255,255,255)});
	 this.addChild(this.d_entries);


	 this.d_bomb = DNumFactory(bomb_config.defaultNum,bomb_config.size);
	 this.d_bomb.setSpeedRate(bomb_config.speedRate);
	 this.d_bomb.setNotifaction(bomb_config.eventName);
	 this.d_bomb.setPosition(bomb_config.position);
	 this.d_bomb.setAttr({lineWidth:2,strokeStyle:cc.color(0,0,0),fillStyle:cc.color(255,255,255)});
	 this.addChild(this.d_bomb); 


	 this.d_reveal = new cc.LabelTTF('0',GMAESETUP.font_face,35);
	 this.d_reveal.setPosition(cc.p(922,35));
        this.addChild(this.d_reveal);

        this.d_freespin = new cc.LabelTTF('0',GMAESETUP.font_face,80);
        this.d_freespin.setPosition(cc.p(1225,525));
        this.d_freespin.setVisible(false);
        this.addChild(this.d_freespin);
     },
     initRevealRadio:function(){ 
                
                this.btn_reveal_group  =new  RadioButtonGroup(this.d_reveal);
                this.btn_reveal_group.setPosition(cc.p(628,50));
                this.btn_reveal_group.setNotifaction(CEVENT.REVEAL_GROUP_CLICK);
                var reveals=[35,65,95,155,305];
                var fontsize = 30;
                var reveal_width = 72;
                var reveal_height=77;
                for(var i=0;i<reveals.length;i++){ 

                        var radio = new RadioButton(reveals[i],reveals[i],fontsize,res.RevealLiteNormal_png,res.RevealLiteDisabled_png,this.btn_reveal_group,this);
                        radio.setPosition(cc.p(reveal_width*(i-1),0));
                        radio.setTTFPosition(cc.p(reveal_width/2,reveal_height/2-5))
                        this.btn_reveal_group.addChild(radio);
                }
                this.btn_reveal_group.setDefault(GLOBAL_USER._num_reveal);
                this.addChild(this.btn_reveal_group);

     }
     ,initSwitchButton:function(){

             var bool = null;
             this.btn_swh_auto = new SwitchButton(res.AutoOn,res.AutoOff,cc.rect(0,0,93,64));
             this.btn_swh_auto.setNotifaction(CEVENT.SWITCH_AUTO_CHANGE);
             //this.btn_swh_auto.callback = function(b){userinfo.changeAuto(b);}//用户远程事件同步
             this.btn_swh_auto.setPosition(cc.p(1258,15));
             bool = GLOBAL_USER._setup_auto_on==true?1:0;
             this.btn_swh_auto.setStatus(bool);
             this.addChild( this.btn_swh_auto);
       
             this.btn_swh_bomb= new SwitchButton(res.BombOn,res.BombOff,cc.rect(0,0,90,63));
             this.btn_swh_bomb.setNotifaction(CEVENT.SWITCH_BOMB_CHANGE);
             //this.btn_swh_bomb.callback = function(b){userinfo.changeBomb(b);}//用户远程事件同步
             this.btn_swh_bomb.setPosition(cc.p(183,14));
             bool = GLOBAL_USER._setup_bomb_on==true?1:0;
             this.btn_swh_bomb.setStatus(bool);
             this.addChild(this.btn_swh_bomb);
     }
     ,
     changeUI:function(type,iscallback){
              
              var isc = iscallback;
              if(isc==undefined||isc ==null) isc = true;
              
              var self = this;
              var rect = cc.rect(0,0,1366,768);
              var normalUI = res.LayerUI_png;
              var freeUI = res.LayerUI_free_png;
              var frame =null;
              if(type==2)
              {
                   frame = new cc.SpriteFrame(freeUI,rect);
                   this.door.setVisible(false);
                   this.d_freespin.setVisible(true);
              }
              else
              {
                    frame = new cc.SpriteFrame(normalUI,rect);
                    this.door.setVisible(true);
                    this.d_freespin.setVisible(false);
              }

              
              this._UIBackgroundSprite.runAction(cc.sequence(
                        new cc.FadeOut(0.5),
                        new cc.CallFunc(function(){self._UIBackgroundSprite.setSpriteFrame(frame);self.changeDnumPos(type)},this),
                        new cc.FadeIn(0.5),
                        new cc.CallFunc(function(){
                           if(isc)
                           GAMEOB.sendNotifaction(CEVENT.PREPARE_NEXT_TURN,self)

                         },this)

                ));
     }
     ,
     changeDnumPos:function(type)
     {
                if(type==2)
                { 
                                 this.d_gamewin.setPosition(cc.p(800,46));
                                 this.d_totalwin.setPosition(cc.p(1260,136));
                                 this.d_entries.setPosition(cc.p(1260,248));
                                 this.d_reveal.setPosition(cc.p(487,35));
                }
                else
                {
                                 this.d_gamewin.setPosition(cc.p(1180,132));
                                 this.d_totalwin.setPosition(cc.p(1260,235));
                                 this.d_entries.setPosition(cc.p(1260,325));
                                 this.d_reveal.setPosition(cc.p(922,35));
                }
     }

 

});