var GameScript = function(leffects,lUI,lreel){
       this._layerEffects = leffects;
       this._layerEffects.setGameScript(this);
       this._layerUI = lUI;
       this._layerUI.setGameScript(this)
       this._layerReel = lreel;
       this._layerReel.setGameScript(this);
        
        /*内存Reel 参数*/
        this._memReel = null;
        this._memReelLength = 32;
        this._memReelCount   = 5;
        this._stopIndex = 4;
        this._stopY = ReelStopPosition.up;
        this._everNum = 2;
        /**/
        this._winresult = null;
        /*bomb 操作对象*/
        this._bomb_num = 0;
        this._bomb_timing =0;
        this._bomb_pre  = 7;
        this._bomb_max = 25;
        this._bomb_can_dec = false;
        /*免费操作对象*/
        this._is_inFree = false;
        this._free_times = 0;
        this._free_pos = null;
        this._free_score = 0;
        this._free_box_isshow = null;
        this._free_end_over = false;
        /*bigwin 对象*/
        this.bigwin_appear = false;
        /*voice*/
        this.voice_wheeling = null;
        this.voice_wolfman_appear = null;
        this.voice_totalwin = null;
        //初始化对象
       this.init();
}
GameScript.prototype={
        init:function(){
        	 //初始化内存中的 Reel 数组
               this.makeMemReel(['w',1,2,3,4,5,6,7,8,9],[2,2,3,3,3,4,4,5,5,1]);
               this.initEvent();
               this.initVoice();

        }
        ,
        setBtnEnabled:function(bool){ 
               this._layerUI.btn_exit.setEnabled(bool);
	        this._layerUI.btn_help.setEnabled(bool);
	        this._layerUI.btn_buy.setEnabled(bool);
	        this._layerUI.btn_reveal.setEnabled(bool);
	        this._layerUI.btn_swh_bomb.setEnabled(bool);
        }
        ,
        initVoice:function(){ 
                cc.audioEngine.setMusicVolume(1);

        }
        ,
        initEvent:function(){
               
               var reelOverCount = 0;
               var self = this;
               
               
               //添加每帧执行函数之bomb事件
               this._layerEffects.addUpdateFunc(function(dt){ 
                       if(GLOBAL_USER._setup_bomb_on)
                       	{ 
   
                                    self._bomb_timing+= dt ;
                                    if(self._bomb_timing>=1)
                                    	{         
                                    	            if(self._bomb_num>0&&self._bomb_can_dec){ 
                                                                  self._bomb_num-=1;
                                    	                        self._layerUI .d_bomb.setNum(self._bomb_num);
                                    	            }
                                                      self._bomb_timing =  0;
                                    	}
                       	}
               });


              //开始一次旋转
        	GAMEOB.register(CEVENT.START_ONCE,function(){
        		   

                        if(self._is_inFree==true);
                        else
                        {
                               var reveal  =  GLOBAL_USER._num_reveal;
                               var entries = GLOBAL_USER._num_entries;
                                self._layerUI .d_entries.setNum(entries-reveal);
                                GLOBAL_USER.setEntries(entries-reveal);
                        }
        		    
                        self.setBtnEnabled(false);//设置按钮为不可用

                        /*Top obx*/
                        self._layerUI.setText('GOOD    LUCK!');

        	 },1);

               //出现bigwinl
              GAMEOB.register(CEVENT.BIGWIN_APPEAR,function(){
                                cc.log("big win appear!!!");
                                self._layerEffects.bigwinAppear();
               },1,'big_win_appear');

              
              


              
              //bomb_inc 增加
        	GAMEOB.register(CEVENT.START_ONCE,function(){
        		if(GLOBAL_USER._setup_bomb_on)
                       	{
                       	          self._bomb_can_dec = false;
                                      self._bomb_num+= self._bomb_pre ;
                                      if(self._bomb_num>self._bomb_max)
                                      	{ 
                                                self._bomb_num = self._bomb_max;
                                      	}
                                      self._layerUI .d_bomb.setNum(self._bomb_num);

                       	}

        	 },2,"bomb_inc");


        	  //更改reveal Group
        	GAMEOB.register(CEVENT.REVEAL_GROUP_CLICK,function(rdgroup){
        		 GLOBAL_USER.setReveal(rdgroup.currentValue);
        	 },1);

        	  //更改auto
        	GAMEOB.register(CEVENT.SWITCH_AUTO_CHANGE,function(btn){
        		var bool = btn.status==1?true:false;
        		GLOBAL_USER.setAutobState(bool);
        		 cc.log('auto change');
        	 },1);

        	  //更改bomb
        	GAMEOB.register(CEVENT.SWITCH_BOMB_CHANGE,function(btn){
        		var bool = btn.status==1?true:false;
        		GLOBAL_USER.setBombState(bool);
        		if(bool==false)
        			{ 
                                                  self._bomb_num    = 0;
                                                  self._bomb_timing =0;
                                                  self._layerUI .d_bomb.setNum(self._bomb_num);
        			}
        		cc.log('bomb change');
        	 },1);

        	  //没有足够积分
        	GAMEOB.register(CEVENT.NOT_ENOUGH_ENTRIES,function(obj){
        		  
        		 //要把自动给关闭 
        		 self._layerUI .btn_swh_auto.setStatus(0);
        		 GLOBAL_USER.setAutobState(false);

        	 },1);
               
               //其中一个转轮转完
               function oneReelOver(target)
               {
               	          cc.audioEngine.playEffect(res.Voice_reel_stop); //停止的声音
               	         var children = target.getChildren();
                                     for(var i=0;i<children.length;i++)
                                     {
                                            if(children[i].y>=3*self._layerReel._symbolRect.height || children[i].y<0)
                                              {
                                                 children[i]._sprite.setVisible(false);       
                                              }
                                            else
                                              {
                                                  children[i].runSpriteAnimate(SymbolSpriteAnimateType.normal);
                                              }

                                     }
                                     reelOverCount+=1;
                                     if(reelOverCount>=self._layerReel._reelCount)
                                     {       
                                     	    reelOverCount = 0;
                                     	    GAMEOB.sendNotifaction(CEVENT.ALL_REEL_TURN_OVER);
                                     }
               }

        	 GAMEOB.register(CEVENT.REEL_TURN_OVER,oneReelOver,1);
        	 GAMEOB.register(CEVENT.ALL_REEL_TURN_OVER,function(){
                                 
                                 cc.audioEngine.stopEffect(self.voice_wheeling);

                                 if(self._winresult.winstate){ 
                                 	 self._bomb_can_dec = false;
                                 
                                              /*判断得分多少设定bigwin是否出现*/
                                               var lines = self._winresult.lines;
                                               var totalscore = 0;
                                               for(var i=0;i<lines.length;i++)
                                               { 
                                                      totalscore+=getLineObjScore(lines[i]);
                                               } 
                                               if(totalscore>=GMAESETUP.bigwin)
                                               {
                                                      self.bigwin_appear = true;
                                                      GAMEOB.sendNotifaction(CEVENT.BIGWIN_APPEAR,self);
                                               }
                                                
                                                self._layerUI.setTotalText('TOTAL WIN '+totalscore); //设置显示文章

                                                self._layerEffects.drawAllLine(self._winresult.lines);
                                  }
                                  else{ 
                                  	 //准备下一次旋转
                                                  self._layerUI.setTotalText('WIN : 0'); //设置显示文章

                                  	 GAMEOB.sendNotifaction(CEVENT.PREPARE_NEXT_TURN,self);
                                  }
                                           

        	 },1);

              //线条画完了
        	GAMEOB.register(CEVENT.DRAW_LINE_OVER,function(obj){

                                var lines = obj.result;
                                var totalscore = 0;
                                for(var i=0;i<lines.length;i++)
                                { 
                                       totalscore+=getLineObjScore(lines[i]);
                                } 
                                
                                self.voice_totalwin = cc.audioEngine.playEffect(res.Voice_totalwin, true);

                                self._layerUI .d_gamewin.setInc(totalscore);  //会触发下一次

                                //如果在免费之中...
                                if(self._is_inFree)
                                	{ 
                                                          self._free_score+=totalscore;
                                                          //GAMEOB.sendNotifaction(CEVENT.DNUM_GAMEWIN_OVER); //准备下一次
                                	}
                                else
                                	{     
                                                          var totalwin = (totalscore*GLOBAL_USER._odds)
                                                          GLOBAL_USER.setTotalwin(totalwin);
                                                          self._layerUI .d_totalwin.setInc(totalwin);
                                	}
                                
                             
                                //-----------------------------------------------------------2015-1-26
                              

        	 },1);

              //触发FreeSpin的初始化
             GAMEOB.register(CEVENT.FREE_SPIN_HAPPEN,function(posdata){
                      var pos = posdata.pos;
                      self._free_box_isshow = false;
                      self._free_times += GMAESETUP.freeSpinTimes;
                      self._layerUI.btn_reveal_group.setEnabled(false);  //赔率按钮变灰
                      self._free_pos = pos; 
                      cc.log('freespin happend!!');
              },1);

             //freespin box end 
        	GAMEOB.register(CEVENT.FREE_SPIN_END_BOX_DISAPPEAR,function(obj){
                                            
                                            //释放在免费之中
                                 	        self._is_inFree = false;
                                 	        self._free_end_over = true;
                                           self._layerEffects._freespin_end_box = null;

                                            //清除start_once 的免费事件
                                            GAMEOB.destroy(CEVENT.START_ONCE,null,'start_once_in_free');
                                            //清除gamewin  的免费事件删除
                                            GAMEOB.destroy(CEVENT.DNUM_GAMEWIN_OVER,null,'dnum_gamewin_out_freespin');
                                            
                                            self._layerUI.changeUI(1,false); //变换UI,但是不触发事件
                                           
                                            setTimeout(function(){
                                                          self.freespinBtnVisible(true);
                                                          if(self._free_score==0){ 
                                                                    //没有得分直接去下一轮的准备
                                                                    GAMEOB.sendNotifaction(CEVENT.PREPARE_NEXT_TURN,self); //准备下一次
                                                            }
                                                            else
                                                            {
                                                       
                                                               self._layerUI.d_gamewin.changeTo(0);
                                                               var totalwin  = self._free_score*GLOBAL_USER._odds;
                                                               GLOBAL_USER.setTotalwin(totalwin);
                                                               self._layerUI .d_totalwin.setInc(totalwin);
                                                               self._free_score = 0;

                                                              }       
                                             },1200);     
                                            
        	 },1);

              
               
               //totalwin 计算结束
        	GAMEOB.register(CEVENT.DNUM_TOTAL_OVER,function(obj){
                                
                                //如果有bigwin 清除bigwin
                                if(self.bigwin_appear)
                                {
                                     self._layerEffects.bigwinDisappear();
                                     self.bigwin_appear = false;
                                }
        		      
                                 if(self.voice_totalwin!=null)
                                 	cc.audioEngine.stopEffect(self.voice_totalwin);

                                 cc.log('total num over!!');
                                self._layerUI .d_gamewin.runAction(cc.sequence(
                                	 new cc.DelayTime(1),
                                           new cc.Blink(1,2),
                                           new cc.CallFunc(function(){ 
                                                    self._layerUI .d_gamewin.setNum(0);
                                           },self),
                                           new cc.DelayTime(0.5),
                                           new cc.CallFunc(function(){ 
                                                      GAMEOB.sendNotifaction(CEVENT.PREPARE_NEXT_TURN,self); //准备下一次
                                           },self)
                                ));
 

        	 },1);

        	 //开始下一次旋转
        	GAMEOB.register(CEVENT.PREPARE_NEXT_TURN,function(obj){
                       
                       //是否显示了，动画拦截器
                       if(self._free_box_isshow ==false)
                       	{ 
                                
                                     self._free_box_isshow = true;
                                     self.changeToFreeSpinMode();
                                     return ;

                       	}
                         

                         //结束freespin拦截器
                         if(self._is_inFree&&self._free_times==0)
                         { 
                                               self._layerEffects.showFreeSpinEndBox(self._free_score);
                                                return ;
                         }
                       
                       //freespin 结束拦截器
                       if(self._free_end_over)
                       	{ 
                                      self._free_end_over = false;
                                      self._layerUI.btn_swh_auto.setStatus(0); 
                                      GAMEOB.sendNotifaction(CEVENT.SWITCH_AUTO_CHANGE,self._layerUI.btn_swh_auto);
                                      self._layerUI.btn_swh_auto.setEnabled(true);
                                      self._layerUI.btn_reveal_group.setEnabled(true);
                                      //self.perpareNext();
                                      //return ;
                       	}
                            
                             /*Top obx*/
                             self._layerUI.setTotalText('');
                             self._layerUI.setText('GAME     OVER');
                              
                             self.perpareNext();
                             cc.log('prepare next !');

                         
        	 },1);

              
              var layerUi_door_change = function(doorobj){
                     if(doorobj._isOpen)
                     {
                          cc.audioEngine.playEffect(res.Voice_open_door);
                          self._layerUI.wolfman.setVisible(true);
                          self._layerUI.wolfman.wait();
                     }
                     else if(doorobj._isOpen==false)
                     {
                          cc.audioEngine.playEffect(res.Voice_close_door);
                          self._layerUI.wolfman.setVisible(false);
                          self._layerUI.wolfman.stopAllActions();
                     }
              }
              GAMEOB.register(CEVENT.DOOR_STATE_CHANGE,layerUi_door_change,1); 
              

              //freespin提示框消失之后的事件
              GAMEOB.register(CEVENT.FREE_SPIN_BOX_DISAPPEAR,function(obj){
                             self._layerEffects.clearFreespin();
                             self._layerUI.d_freespin.setString(self._free_times);

                             
                             //如果不再免费模式之中一系列操作转化为免费模式,只带 prepare next turn
                             if(self._is_inFree==false){ 
                                      self._is_inFree = true;
                                       self.freespinBtnVisible(false);
                                       self._layerUI.btn_swh_auto.setStatus(1); 
                                       self._layerUI.d_freespin.setString(self._free_times);
                                       GAMEOB.sendNotifaction(CEVENT.SWITCH_AUTO_CHANGE,self._layerUI.btn_swh_auto);
                                       self._layerUI.btn_swh_auto.setEnabled(false);



                                        //gamewin 计算结束
                                       GAMEOB.register(CEVENT.DNUM_GAMEWIN_OVER,function(){

                                       	       if(self.voice_totalwin!=null)
                                 	           cc.audioEngine.stopEffect(self.voice_totalwin);

                                                 //如果有bigwin 清除bigwin
                                                 if(self.bigwin_appear)
                                                   {
                                                          self._layerEffects.bigwinDisappear();
                                                          self.bigwin_appear = false;
                                                   }
                                                GAMEOB.sendNotifaction(CEVENT.PREPARE_NEXT_TURN,self); //准备下一次
                                       },1,'dnum_gamewin_out_freespin');



                                       GAMEOB.register(CEVENT.START_ONCE,function(){

                                                self._free_times -=1;
                                                self._layerUI.d_freespin.setString(self._free_times);
                                        },2,'start_once_in_free');

                                       self._layerUI.changeUI(2); //需要设置一个启动, 因为会调用 触发,所以放到最后
                             }    
                             else
                             { 
                                     //已经在免费模式之中直接普通启动
                                     GAMEOB.sendNotifaction(CEVENT.PREPARE_NEXT_TURN,self);

                             }

              },1);

 



        }
        ,
        freespinBtnVisible:function(bool){
                           var self = this;
                           self._layerUI.btn_buy.setVisible(bool);
                           self._layerUI.btn_help.setVisible(bool);
                           self._layerUI.btn_exit.setVisible(bool);
                           self._layerUI.btn_reveal_group.setVisible(bool);

        }
        ,
        changeToFreeSpinMode:function(){
                  
                  this._layerEffects.freespinShank(this._free_pos);
                  cc.audioEngine.playEffect(res.Voice_freespin);
                  this._layerEffects.showFreeSpinBox();

        }
        ,
        /*
        getSymbolByPos:function(pos)
        {
                  var beginIndex = this._everNum;
                  var pos = this._free_pos;
                  var currentReel = this._layerUI.reelArray[pos.col];
                  var symbolIndex = beginIndex+pos.row;
                  return currentReel[symbolIndex];
        }
        ,*/
        perpareNext:function(){
              var self  =this
              
               self._bomb_can_dec = true;


               if(self._is_inFree==true ||  GLOBAL_USER._setup_auto_on==true);
                else{ 

                        self.setBtnEnabled(true);//设置按钮为可用
                }
               if(GLOBAL_USER._setup_auto_on)
                { 
                            setTimeout(function(){ 
                                                  self.wheelOnce();
                              },1200);
                }

                 /*Top obx*/
                setTimeout(function(){  self._layerUI.setText('PRESS    REVEAL');},800);
                

        }
        ,
        changeToHelpScene:function(){ 
          
                  cc.director.runScene(new GameHelperScene())
        }
        ,
        wheelOnce:function(){
                
                //检测积分是否够,并且不再免费之中
        	  if(this._is_inFree==false&&GLOBAL_USER.canStart()==false)
        	  	{ 
                                         GAMEOB.sendNotifaction(CEVENT.NOT_ENOUGH_ENTRIES,self); //发送一个没有住够积分的事件
                                         cc.log('not enough entries');
                                         return ;
        	  	}
               GAMEOB.sendNotifaction(CEVENT.START_ONCE);


                var WinResult = {winstate:false,board:[],lines:null}
                var rs = this.makeReusltBoard();
                 
               //测试处理
               //rs = this.speicaltest(rs,'2');

                WinResult.board = rs;
                var linefind = new FindLine(rs,[9]);  //排除第9 freespin
                var lineobjs = linefind.find();

                if(lineobjs.length<=0||lineobjs==null)
                {
                      WinResult.winstate = false
                }
                else
                {
                       WinResult.winstate = true;
                }

                WinResult.lines = lineobjs;
                cc.log(WinResult);

                this.addSymbols(WinResult.board);
                this._winresult = WinResult;
                WINRESULT = WinResult;
                 var self = this;
                 
                 var spmk = new SpecialEventMaker(WinResult.board);
                 var data = spmk.make();
                 //cc.log(data);
                 //延长特殊时间
                 if(data!=false)
                 this.setSpecialEvent(data);
                 spmk = null;

                 //freespin触发事件
                 var posdata = FreeSpinCheck(WinResult.board);
                if(posdata!=false)
                GAMEOB.sendNotifaction(CEVENT.FREE_SPIN_HAPPEN,{pos:posdata});

                setTimeout(function(){
                       self.voice_wheeling = cc.audioEngine.playEffect(res.Voice_wheeling,true); //播放转动声音
                       self.startReel();
                },100);

        }
        ,
        //用于测试特殊事件
        speicaltest:function(rs,sb)
        {

                for(var i=0;i<rs[0].length;i++)
                {
                      rs[0][i] = sb;
                }
                return rs;
        }
        ,
        //释放转轮
        releaseReel:function(){
                 var reels = this._layerReel.reelArray;
                 var interval = 0.1;
                 this._layerReel.runAction(cc.sequence(
                 new cc.CallFunc(function(){reels[1].releaseKeep();},this),
                 new cc.DelayTime(interval),
                 new cc.CallFunc(function(){reels[2].releaseKeep();},this),
                 new cc.DelayTime(interval),
                 new cc.CallFunc(function(){reels[3].releaseKeep();},this),
                 new cc.DelayTime(interval),
                 new cc.CallFunc(function(){reels[4].releaseKeep();},this),
                 new cc.DelayTime(interval)
                ));
        }
        ,
        setSpecialEvent:function(data){
                     var mydata  = data;
                     /*mydata = {
                                  shunxu:[4,3,2,1],
                                  firetimes:1,
                                  shooters:[[2],[0],[],[]]
                   }*/
                   //然后根据data 计算运转时间
                  //var one_shoot_time = 1400;//ms
                  //var keep_running_time = one_shoot_time*mydata.shunxu.length*mydata.firetimes;

                   var reels = this._layerReel.reelArray;
                   for(var i=1;i<reels.length;i++)
                   {
                         reels[i].keepCustomRun(40);
                   }
                   var self = this;

                   var open_door = function(reelobj){
                         if(reelobj._selfindex == 0 )
                         { 
                         	  self.voice_wolfman_appear =  cc.audioEngine.playEffect(res.Voice_cowboy);
                              self._layerEffects.runAction(cc.sequence(
                                      new cc.CallFunc(function(){self._layerUI.door.openDoor()},this),
                                      new cc.DelayTime(0.3),
                                      new cc.CallFunc(function(){ self._layerEffects.specialEvent(self._layerUI.wolfman,mydata)},this)
                              ));
   
                         }
                   }
                   
                   GAMEOB.register(CEVENT.REEL_TURN_OVER,open_door,2,'turn_over_open_door');
                 

                  //移除临时显示symbol
                  var specialEventOverReel = function(obj)
                  {
                          var children =self._layerEffects._specialObjs;
                          for(var i=0;i<children.length;i++)
                          {
                                 self._layerEffects.removeChild(children[i],true);
                                 children[i] = null;
                          }
                          cc.audioEngine.stopEffect(self.voice_wolfman_appear); //关闭声音
                          GAMEOB.destroy(CEVENT.ALL_REEL_TURN_OVER,specialEventOverReel,'special_event_over_reel');
                  }

                   var specialEventOver = function(lEffects){
                          
                          //注销特殊事件开启
                          GAMEOB.destroy(CEVENT.REEL_TURN_OVER,open_door,'turn_over_open_door');
                          //关闭门
                          self._layerUI.door.closeDoor();
                          self.releaseReel(); ////释放转轮
                           
                          GAMEOB.register(CEVENT.ALL_REEL_TURN_OVER,specialEventOverReel,2,'special_event_over_reel');
                   }
                   GAMEOB.register(CEVENT.SPECIAL_EVENT_OVER,specialEventOver,1,'special_event_over');

        }
        ,addSymbols:function(board){
                
                var reels = this._layerReel.reelArray;
                var stopY = this._stopY
                var stopIndex = this._stopIndex;
                var everNum = this._everNum; //从第3个开始放 ,且是倒叙
                for(var i=0;i<reels.length;i++)
                {
                	reels[i].cleanAllSymbols();
                	reels[i].set_stopY(stopY);
                	reels[i].set_stopIndex(stopIndex);
                            for(var j = 0;j<everNum;j++)
                            {
                                  var rd = Math.floor(Math.random()*SymbolData.length);

                                  var symboldata = SymbolData[rd];
                                  var sbs = SymbolFactory(symboldata.type,reels[i]._symbolRect,symboldata.args);
                                  reels[i].addSymbol(sbs);
                            }
                            for(j=4;j>=everNum;j--)
                            {
                            	var dataIndex = board[i][j-everNum];
                            	if(dataIndex=='w') dataIndex = 0;
                            	symboldata = SymbolData[dataIndex];
                            	sbs = SymbolFactory(symboldata.type,reels[i]._symbolRect,symboldata.args);
                                   reels[i].addSymbol(sbs);
                            }

                }//按照 结果板 放入相应方块
        }
        ,
        startReel:function(){
                 var reels = this._layerReel.reelArray;
                 var interval = 0.2;
                 this._layerReel.runAction(cc.sequence(
                 new cc.CallFunc(function(){reels[0].startReel();},this),
                 new cc.DelayTime(interval),
                 new cc.CallFunc(function(){reels[1].startReel();},this),
                 new cc.DelayTime(interval),
                 new cc.CallFunc(function(){reels[2].startReel();},this),
                 new cc.DelayTime(interval),
                 new cc.CallFunc(function(){reels[3].startReel();},this),
                 new cc.DelayTime(interval),
                 new cc.CallFunc(function(){reels[4].startReel();},this),
                 new cc.DelayTime(interval)
                  ));
        }
        ,
        makeMemReel:function(p1,p2)
        {
        	    var myCoreReels = new CoreReels(this._memReelCount,this._memReelLength,p1);  // ['w',1,2,3,4,5,6,7,8,9]
                  this._memReel = myCoreReels.make(p2); // [2,1,2,3,3,3,4,2,4,4,4]
                  myCoreReels = null;
                  cc.log(this._memReel);
        }
        ,
        makeReusltBoard:function()
        {
        	     var rrr =new  RandomRealReel(this._memReel);
                   rrr.makeVisibleSymbols(1,1,this._memReelLength-1,0);
                   var resultArr= rrr.getVisibleSymbols();

                   return resultArr;
        }
        ,
        makeCanReel:function(resultArr){
                   
                   //可能性1 挑选
                   var myresult = new ResultLine(resultArr);
                   var okr = myresult.findCanUseSymbolArray();
                   console.log("find can make line arr:");
                   console.log(okr);

                  //可能性2 挑选
                  var canArray = myresult.getCanUseArray(okr);
                  console.log('can use line arr:');
                  console.log(canArray);

                  if(canArray==undefined || canArray.length<=0)
                  	return false;

                   return canArray;
        }
        ,
        combinaLine:function(carr)
        {
        	   var  samelines = getSameIndexArray(carr);
                 //console.log(samelines);
                 var lines_array = getLastLines(samelines);
                 //console.log('last combain arr by one same arr:');
                 //console.log(lines_array);
                 return lines_array;
        }
        ,
        checkLineArr:function(linesarr){
                var winresult = [];
                for(i=0;i<linesarr.length;i++)
                  {
                          var lineObj =linesarr[i];
                          var okline = getLinesBy(lineObj);
                          //console.log(i+'th arr can combina '+okline.length+" lines can pipei:");
                          //console.log(okline);
                          if(okline.length>0) winresult.push(okline);
                  }
                  
                  if(winresult.length<=0)
                  	return false;

                  return winresult;

        }

}
