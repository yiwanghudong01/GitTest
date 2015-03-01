var RadioButtonGroup = cc.Menu.extend({ 
       currentValue:null,
       currentShowObj:null,
       _notifaction:null,
       ctor:function(labelttf){ 
                this._super();
                this.setAnchorPoint(cc.p(0,0));
                this.currentShowObj = labelttf;
       },
        setNotifaction:function(name){
                 this._notifaction = name;
       },
       _setShowValue:function()
       { 
                 this.currentShowObj .setString(this.currentValue);
       }
       ,
       onClickBtn:function(value)
       { 
       	    this.currentValue = value;
                  this._setShowValue();
                  var btns = this.getChildren();
                   if(btns==null)
                   	{
                                 cc.log('RadioButtonGroup no child');
                   	     return; 
                   	}
                    //设置按钮闪速

                   for(var i=0;i<btns.length;i++)
                   	{ 

                                   if(btns[i].value==value){ 
                                                  btns[i].startBlink();  
                                   	}
                                   else{ 
                                   	       
                                                   btns[i].stopBlink();  
                                   }
                   	}

                    GAMEOB.sendNotifaction(this._notifaction,this);

       },
       setDefault:function(value){ 
                    this.currentValue = value;
                    this.onClickBtn(value);
       }
       ,
       setEnabled:function(bool){ 
                      var btns = this.getChildren();
                      for(var i=0;i<btns.length;i++)
                      {
                             btns[i].setEnabled(bool);
                      }
       }

});



var RadioButton =cc.MenuItemImage.extend({ 
       text:null,
       value:null,
       _ttf:null,
       _onSelected:false,
       _blinkAction:null,
       ctor:function(text,value,size,normal,disable,fobj,obj){ 
       	  this.text = text;
       	  this.value = value;
       	  var self = this;
                this._super(normal,normal,disable,function(){ 
                        self.parent.onClickBtn(self.value);
                },obj);

                this.initTTF(size);
       }
       ,
       initTTF:function(size){ 
                this._ttf = new cc.LabelTTF(this.text,GMAESETUP.font_face,size);
                this._ttf.attr({strokeStyle:cc.color(21,84,27),lineWidth:2});
                this.addChild(this._ttf);
                this.initBlink();
       },
       setTTFPosition:function(point)
       { 
                this._ttf.setPosition(point);
       }
       ,
       initBlink:function(){ 
                  this._blinkAction =  new cc.RepeatForever(cc.sequence(new cc.TintTo(0.1,0,255,0),new cc.DelayTime(0.5),new cc.TintTo(0.1,255,255,255),new cc.DelayTime(0.5)));
       }
       ,
       _backToWhite:function(){ 
                  this._ttf.setColor(cc.color(255,255,255));
       }
       ,
       startBlink:function() { 
       	if(this._blinkAction!=null)
       	this._ttf.runAction(this._blinkAction);
       }
       ,
       stopBlink:function(){ 
       	this._ttf.stopAllActions();
       	this._backToWhite();
       }


});