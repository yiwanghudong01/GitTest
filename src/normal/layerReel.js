var  LayerReel = cc.Layer.extend({
                reelArray:null,
                _reelCount:5,
                _symbolRect:cc.rect(0,0,180,180),
                _orginPoint:{x:68,y:183},
                _margin:15,
                background:null,
                _gameScript:null,
                ctor:function(){
                	 this._super();
                	 this.initBackground();
                	 this.initReel();
                }
                ,
                setGameScript:function(obj){
                          this._gameScript = obj;
                }
                ,
                initBackground:function(){

                	this.background = new cc.Sprite(res.GameBackground_png);
                	this.background.setAnchorPoint(cc.p(0,0));
                	this.background.setTag('Background');
                	this.background.setPosition(cc.p(this._orginPoint.x,this._orginPoint.y));
                	this.addChild(this.background,1);
                }
                ,
                initReel:function(){
                              

                              this.reelArray = [];
                               for(var i=0;i<this._reelCount;i++)
                               {
                                      var reel = new Reel(this._symbolRect);
                                      reel._selfindex = i;
                                      reel.setPosition(cc.p(this._orginPoint.x+(this._symbolRect.width+this._margin)*i,this._orginPoint.y));
                                      reel.setNotifaction(CEVENT.REEL_TURN_OVER);
                                      this.addChild(reel,2);
                                      this.reelArray.push(reel);
                                      /*for(var j=0;j<5;j++)
                                            {
                                                   var args = [
                                                  {fname:'beer_f0@.png',rank:[1,7],frate:0.1},
                                                  {fname:'beer_f0@.png',rank:[1,2],frate:0.1}];
                                                  var sbs = SymbolFactory({label:'c1',framename:"#beer_f01.png"},this._symbolRect,args);
                                                  reel.addSymbol(sbs);
                                           }
                                      */
                               }
                              
 
                            
                              /*var self = this;
                              setTimeout(function(){

                                          for(i=0;i<self.reelArray.length;i++)
                                           {
                              	  self.reelArray[i].cleanAllReel();
                                            } 

                              },6000);
*/
                              
                }


});