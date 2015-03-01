var LayerEffects = cc.Layer.extend({
	  _gameScript:null,
         /*绘制线条所用变量*/
         _symbolRect:cc.rect(0,0,180,180),
         _orginPoint:{x:68,y:183},
          _margin:15,
          _linedot:[
          [[5,7,3,11],[21,19,15,25]],
          [[13,9,1,8,12],[23,16,1,17,22]],
          [[10,2,6,4],[24,14,18,20]]],
          _numHeight:36,
          _nump:[183,355,562],
          _drawlineObjs:[],
          _specialObjs:[],
          _fireObjs:[],
          _longShank:null,
          _updatefuncs:[],
          _bigwin_obj:null,
          _freespin_shanks:[],
          _freespin_end_box:null,
          _voice_draw_line:null,
                ctor:function(){
                              this._super();
                              this.scheduleUpdate();
                              //this.test();

                },
                addUpdateFunc:function(func){ 

                              this._updatefuncs.push(func);
                }
                ,
               setGameScript:function(obj){
                             this._gameScript = obj;
               }
               ,
               bigwinAppear:function(){ 
                                this._bigwin_obj = new Bigwin();
                                this._bigwin_obj.setPosition(-30,550);
                                this._bigwin_obj.Begin();
                                this.addChild( this._bigwin_obj,5);
               },
               bigwinDisappear:function(){
                                this.removeChild(this._bigwin_obj,true);
                                this._bigwin_obj = null;
               }
               ,
               drawAllLine:function(line){
                          
                            this.drawLine(line,0,line.length);
               }
               ,
               showFreeSpinEndBox:function(score){ 
                            
                            var self = this;
                            this._freespin_end_box = new FreeSpinEndBox(score);
                            this._freespin_end_box.setPosition(250,250);
                            this._freespin_end_box.setScale(0.2,0.2);
                            this.addChild(this._freespin_end_box);
           
                            this._freespin_end_box.runAction(cc.sequence(
                                                 new cc.ScaleTo(0.5,1,1),
                                                 new cc.DelayTime(2),
                                                 new cc.ScaleTo(0.5,0.2,0.2),
                                                 new cc.CallFunc(function(){ 
                                                          self.removeChild(self._freespin_end_box);
                                                          GAMEOB.sendNotifaction(CEVENT.FREE_SPIN_END_BOX_DISAPPEAR,{s:score}); //准备下一次
                                                 },this)
 
                           ));
               }
               ,
               showFreeSpinBox:function(){

                           var freebox = new FreeSpinBox(3); 
                           freebox.setNotifaction(CEVENT.FREE_SPIN_BOX_DISAPPEAR); 
                           freebox.setPosition(cc.p(290,250));
                           this.addChild(freebox); 
                           this._freespin_shanks.push(freebox);
               }
               ,
               freespinShank:function(posarr){
                            
                            for(var i=0;i<posarr.length;i++)
                            {
                                         var col      = posarr[i].col;
                                         var row    = posarr[i].row;
                                         //计算出位置
                                         var xpos  = col*(this._symbolRect.width+this._margin)+this._orginPoint.x;
                                         var ypos  = (2-row)*this._symbolRect.height+this._orginPoint.y;
                                         
                                         var shank = new Shank();
                                         shank.setPosition(xpos,ypos);
                                         this.addChild(shank);
                                         this._freespin_shanks.push(shank);
                            }
               }
               ,
               clearFreespin:function(){
                             
                             for(var i=0;i<this._freespin_shanks.length;i++)
                             {
                                      this.removeChild(this._freespin_shanks[i],true);
                                      this._freespin_shanks[i]=null;
                             }
                             this._freespin_shanks = [];
               }
               ,
               //还要仔细处理
               specialEvent:function(wolfman,data){
                             //data
                             /*
                                  orders:[4,3,2,1] ,        //开始的位置
                                  firetimes:[2,2,2,2],   //每个方块开枪次数
                                  rights:[[2],[0],[],[]],          //命中位置 上->下 2->0

                             */
                              this._longShank = new LongShank();
                              this.addChild(this._longShank);
                              this._longShank.setVisible(false);
                              this._randerOneSpecialEvent(0,wolfman,data);
               }
               ,
               _randerOneSpecialEvent:function(index,wolfman,data){
                              var self = this;
                              if(index>=data.shunxu.length)
                              {         
                                    self.removeChild(self._longShank)
                                    self._longShank = null;
                                     GAMEOB.sendNotifaction(CEVENT.SPECIAL_EVENT_OVER,self);
                                    //还差一个通知特色事件结束了
                                    return ;
                              }

                              //根据枪击顺序 放置闪烁框
                              var sindex = data.shunxu[index];
                              this._longShank.setVisible(true);
                              var xpos =this._orginPoint.x+(this._symbolRect.width+this._margin)*sindex - 15;
                              this._longShank.setPosition(xpos,this._orginPoint.y-20);
                              
                              //开枪
                              this._fireOnce(0,wolfman,index,data);
               }
               ,
               _fireOnce:function(num,wolfman,index,data){
                                 
                                 var self = this;
                                 
                                 if(num>=data.firetimes)
                                 {
                                       self._randerOneSpecialEvent(index+1,wolfman,data);
                                       return;
                                 }
                                  
                                 var shooterTarget = data.shooters[index];
                                 var xpos = this._orginPoint.x+(this._symbolRect.width+this._margin)*(data.shunxu[index])
                                 var ypos = null;
                                 var isShooting = false;
                                 if(num<shooterTarget.length)
                                 {
                                    //打中
                                     ypos = this._orginPoint.y+this._symbolRect.height*(shooterTarget[num]);
                                     isShooting = true;
                                 }
                                 else
                                 {
                                     var rds = Math.round(Math.random()*2);
                                     ypos = this._orginPoint.y+this._symbolRect.height*(rds);
                                     //没有对应打中的位置
                                 }
                                 
                                 var endOnce = new cc.CallFunc(function(){
                                     self._fireOnce(num+1,wolfman,index,data);
                                 },this);

                                 if(isShooting)
                                 {
                                     self.runAction(cc.sequence(
                                     new cc.DelayTime(0.1),
                                     new cc.CallFunc(function(){
                                     wolfman.fire();
                                     cc.audioEngine.playEffect(res.Voice_shooted);
                                     var dandao = new DanDao();
                                     dandao.setPosition(xpos,ypos);
                                     self.addChild(dandao);
                                    
                                     },this),
                                     new cc.DelayTime(0.32),
                                     new cc.CallFunc(function(){
                                     wolfman.wait();
                                     cc.audioEngine.playEffect(res.Voice_shoot_broken);
                                     var smWild = new SimpleWildSymbol(1);
                                     smWild.setPosition(xpos,ypos);
                                     self.addChild(smWild);
                                     self._specialObjs.push(smWild);
                                     },this),
                                     endOnce
                                     ));

                                 }
                                 else
                                 {
                                     self.runAction(cc.sequence(
                                     new cc.DelayTime(1),
                                     new cc.CallFunc(function(){
                                      wolfman.fire();
                                     var dandao = new DanDao();
                                     dandao.setPosition(xpos,ypos);
                                     self.addChild(dandao);
                                     },this),
                                     new cc.DelayTime(0.5),
                                     new cc.CallFunc(function(){
                                     wolfman.wait();
                                     },this),
                                     endOnce
                                     ));
                                 }

               }
               ,
               drawLine:function(linearr,inum,total)
               {
                        if(inum>=total){
                                     
                                      cc.log('all line show over');
                                      GAMEOB.sendNotifaction(CEVENT.DRAW_LINE_OVER,{result:linearr});
                                      return;
                        }
                        //声效
                        if(this._voice_draw_line!=null)
                        	 cc.audioEngine.stopEffect(this._voice_draw_line);

                        this._voice_draw_line = cc.audioEngine.playEffect(res.Voice_winline);

                        var self = this;
                        var lineobj = linearr[inum];
                        var line = LINES[lineobj.line];
                        var dots = [];
                        var kuangcount = lineobj.count;
                        
                         /*Top obx*/
                        self._gameScript._layerUI.setText((lineobj.line+1)+"  LINE WIN  "+this._getLineScore(lineobj.count,lineobj.sb));

                        //结束之后清空
                        var endonce = new cc.CallFunc(function(){
                               var children = self._drawlineObjs;
                               for(var i=0;i<children.length;i++)
                               {
                                    self.removeChild(children[i]);
                                    children[i]=null;
                               }
                              inum+=1;
                              self.drawLine(linearr,inum,total);
                        },this);
                        
                        //初始化显示分数
                        var score_ttf = new cc.LabelTTF(this._getLineScore(lineobj.count,lineobj.sb),GMAESETUP.font_face,80);
                        score_ttf.attr({lineWidth:2,strokeStyle:cc.color(0,0,0),fillStyle:cc.color(0,255,0)});
                        score_ttf.runAction(cc.sequence(new cc.ScaleTo(0.3,1.5,1.5),new cc.ScaleTo(0.3,1,1),new cc.DelayTime(0.5),endonce));
              
                        //1-5竖排
                        for(var i=0;i<5;i++)
                        {
                                 var p = this._getPosition(i,line);
                                 var x  = this._orginPoint.x+(this._symbolRect.width+this._margin)*(i+0.5);
                                 var y  = this._orginPoint.y+(this._symbolRect.height)*(p+0.5);
                                 dots.push(cc.p(x,y));
                                  
                                //绘制闪烁的框框
                                if(i<lineobj.count)
                                {
                                      var kuang = new Kuang();
                                      this.addChild(kuang,3);
                                      var kx  = this._orginPoint.x+(kuang.width-17)*i -15;
                                      var ky = this._orginPoint.y+(kuang.height-27)*p- 15;
                                      kuang.setPosition(cc.p(kx,ky));
                                      this._drawlineObjs.push(kuang);
                                }

                                if(i==0)
                                {
                                      score_ttf.setPosition(x,y);
                                      this.addChild(score_ttf,4);
                                      this._drawlineObjs.push(score_ttf);
                                }


                        }
                         
                         /*指出是那条线条的位置*/
                          var ld = this._getLineDot(lineobj.line);
                          var sdot = null;
                          var sy = this._nump[ld.p]+this._numHeight*(ld.s+0.5);
                          if(ld.d==0)//左边
                          {       
                                  var sx = this._orginPoint.x-30;
                                  sdot = cc.p(sx,sy)
                                  dots.splice(0,0,sdot);      
                          }
                          else //右边
                          {
                                  var sx = this._orginPoint.x+(this._symbolRect.width+this._margin)*(5)+10;
                                  sdot = cc.p(sx,sy)
                                  dots.push(sdot);      
                          }
      
                       //绘制线条
               	  this._drawLineNode = new cc.DrawNode();
               	  this._drawLineNode.drawCatmullRom(dots,6,12,cc.color(252,68,96));
		         this._drawLineNode.drawCatmullRom(dots,6,8,cc.color(255,29,64));
		         this._drawLineNode.drawCatmullRom(dots,6,4,cc.color(255,255,255));
	                this.addChild(this._drawLineNode,2);
                       this._drawlineObjs.push(this._drawLineNode);
               }
               ,
               _getLineScore:function(count,sb){
                        
                        if(sb=='w')sb=0;
                        var symboldata = SymbolData[sb];
                        var index = 5-count;
                        return symboldata.score[index];
               }
               ,
               _getLineDot:function(linenum)
               {
                         for(var i=0;i<this._linedot.length;i++)
                         {
                               for(var j=0;j<this._linedot[i].length;j++)
                               {
                                      for(k=0;k<this._linedot[i][j].length;k++)
                                      {
                                            if(this._linedot[i][j][k]==(linenum+1))
                                            {
                                                  return {p:i,d:j,s:k}
                                            }
                                      }
                               }
                         }
               }
               ,
               _getPosition:function(n,line)
               {
                        var  indexs = [10,5,0];
                        for(var i=0;i<indexs.length;i++)
                        { 
                               var nx = n+indexs[i];
                               if(line[nx]==1)
                               return i;
                        }
               },
               update:function(dt)
               { 

                             for(var i=0;i<this._updatefuncs.length;i++)
                             	{ 
                                                   if(this._updatefuncs[i]!=undefined&&this._updatefuncs[i]!=null)
                                                   	{ 
                                                                     var func = this._updatefuncs[i];
                                                                     func(dt);
                                                   	}
                             	}

               }

});