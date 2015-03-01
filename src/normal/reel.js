/*
reel 简单职责
旋转方向，
旋转最大速度，
旋转最小速度，
加速度
减速度
最大速度持续时间
停止位置
停止标志
self 长宽
symbol 显示数量


*/
var ReelStopPosition = {up:3,mid:2,down:1};
var ReelDirection ={up:1,down:2};

var Reel = cc.Sprite.extend({
	maxSpeed:60,
	minSpeed:30,
	speedUpStep:2,    //启动加速度
    speedDownStep:2,  //停止加速度
	stopFlag:false,
	currentSpeed:0,
    /*new make*/
    _symbolCount:0,
    _stopY:0,
    _direction:ReelDirection.down,
    _visibleSymbolNum:3,
    _allSymbolNum:5,
    _symbolRect:null,
    _stopIndex:2,
    _timer:0,
    _maxSpeedDuration:600,
    _tween:15,
    _keepCustomSpeed:0,
    _isKeepCustomSpeed:false,
    _keepCustomDuration:null,
    _ktimer:0,
    _reelIndex:0,
    _notifaction:null,
    _selfIndex:0,
    _slowdown_movevalue:0,
    _posarr:[-1,0,1,2,3],
    ctor:function(symbolrect,direction)
    {
    	this._super();
    	if(direction!=undefined)
    	this._direction = direction;
        this.init(symbolrect);

    }
    ,
    setChildrenOpacity:function(num)
    {
             var children = this.getChildren();
             for(var i=0;i<children.length;i++)
             {
                   children[i]._sprite.setOpacity(num);
             }
    }
    ,
    setNotifaction:function(name){
        this._notifaction = name;
    }
    ,init:function(symbolrect){
        
        this.setAnchorPoint(cc.p(0,0));
        this._symbolRect = symbolrect;        
        this.height = this._symbolRect.height*this._visibleSymbolNum;
        this.width  = this._symbolRect.width;
    	this._defautlSetup();
    	return true;
    }
    ,
    keepCustomRun:function(speed,duration)
    {
    	if(speed<=this.minSpeed) 
    		{
    			cc.log('keepCustomRun speed is not big then minSpeed');
    			return;
            }
    	this._keepCustomSpeed = speed;
    	if(duration!=undefined)
    		this._keepCustomDuration = duration;

    	this._isKeepCustomSpeed=true;
    }
    ,
    releaseKeep:function(){
             this._isKeepCustomSpeed=false
             this._ktimer = 0;
    }
    ,
    _keepTiming:function(dt)
    {
    	var chazhi = this.currentSpeed-this._keepCustomSpeed;
        if(this._isKeepCustomSpeed&&chazhi>=0&&chazhi<this.speedDownStep*2)
        {
                   this.currentSpeed = this._keepCustomSpeed;
                   
                   if(this._keepCustomDuration!=null)
                   {
                             this._ktimer+=Math.round(dt*1000);
                             if(this._ktimer>=this._keepCustomDuration)
                              {
                                 this._isKeepCustomSpeed=false
                                this._ktimer = 0;
                               }

                   }//
                   else
                   {
                           //cc.log('need custom release');
                   }
                  return true;

        	}
        return false
    }
    ,
    addSymbol:function(symbol){
        
        this.addChild(symbol);
        symbol.setPosition(0,(this._symbolCount-1)*this._symbolRect.height);
        symbol._reelIndex = this._symbolCount;
        /* if(this._symbolCount==this._stopIndex)
        	{
        		symbol._sprite.setColor(cc.color(255,0,0));
        	}
        */
        this._symbolCount+=1;
    }
    ,
    startReel:function()
    {
        this.scheduleUpdate();

    }
    ,
    stopReel:function(){
         
         this.stopFlag = true;
    }
    ,
    cleanAllSymbols:function(){
          var symbols = this.getChildren();
          this.removeAllChildren(true);
          for(var i=0;i<symbols.length;i++)
          {
                symbols[i] = null;
          }
          this._symbolCount = 0;
    }
    ,
    _defautlSetup:function(){
        
        this.set_stopY(ReelStopPosition.down);
    }
    ,
    set_stopY:function(num) //设置停止的位置
	{
	      
		this._stopY = this._symbolRect.height*(num-1);
	}
	,
	set_stopIndex:function(num)
	{
		    this._stopIndex = num;
	}
    ,
    _speedChange:function(dt){
	
	    if (this.stopFlag) {  
            if (this.currentSpeed > this.minSpeed) {  
                if(!this._keepTiming(dt))
                this.currentSpeed -= this.speedDownStep;
            } else {  
                this.currentSpeed = this.minSpeed;
            }  
         } else {  
             if (this.currentSpeed < this.maxSpeed) {  
                this.currentSpeed += this.speedUpStep;
            } else {  
                this.currentSpeed = this.maxSpeed;
                this.setChildrenOpacity(175);//更改透明度
            }  
        }
	}
       ,
       getMoveValue:function(dt,speed)
       {
                   //获取当前运行环境最小间隔移动的像素
                   var realspeed = speed*(dt*GMAESETUP.fps);
                   return realspeed.toFixed(2);
       }
	,
	_moveSymbols:function(dt,islast)
	{

            moveValue = this.getMoveValue(dt,this.currentSpeed);
  
            if(islast==null||islast==undefined){
                   islast = false;
            }

          var symbols = this.getChildren();  

         for(var i=0;i<symbols.length;i++)
		 { 
		 	 if(this._direction == ReelDirection.down){//向下旋转
		 	 	symbols[i].y  -= moveValue;
                            if(islast)
                            {
                                        symbols[i].y = this.getRank(i)*this._symbolRect.height;
                            }
			    //超出底线的判断
			    if(symbols[i].y<-this._symbolRect.height)
			    {
			       var chazhi =  Math.abs(-this._symbolRect.height-symbols[i].y);
			       symbols[i].y =  this.height+this._symbolRect.height-chazhi ;
			    }
		 	 }
		 	 else if(this._direction == ReelDirection.up){//向上旋转
		 	 	symbols[i].y  += moveValue;
                            if(islast)
                            {
                                        symbols[i].y = this.getRank(i)*this._symbolRect.height;
                            }
			    //超出底线的判断
			    if(symbols[i].y>(this.height+this._symbolRect.height))
			    {
			       var chazhi   =  Math.abs(symbols[i].y-(this.height+this._symbolRect.height));
			       symbols[i].y =  -this._symbolRect.height+chazhi ;
			    }

		 	 }
		     
		 }   
	}
       ,
       getRank:function(i){
                var chazhi = this._posarr[this._stopIndex] - this._direction;
                var cindex = this._posarr[i] - chazhi;
                if(cindex>this._posarr[this._posarr.length-1])
                 {
                        cindex = this._posarr[0] + (cindex-this._posarr[this._posarr.length-1])-1;
                 }
                else if(cindex<this._posarr[0])
                {
                         cindex = this._posarr[this._posarr.length-1] -Math.abs(this._posarr[0]-cindex)+1
                }
                return cindex
       }
	,
	_slowDown:function(dt){
      
      var moveValue = this.getMoveValue(dt,this.currentSpeed);
      var symbols = this.getChildren();
      switch(this._direction)
      {
      	 case ReelDirection.down:
      	      if(this.stopFlag && this.currentSpeed<=this.minSpeed && Math.abs(symbols[this._stopIndex].y-this._stopY)<=moveValue)
		      {  
		         this._slowdown_movevalue= Math.abs(symbols[this._stopIndex].y-this._stopY);
                       return true;
              }  
      	 break;
      	 case ReelDirection.up:
      	      if(this.stopFlag && this.currentSpeed<=this.minSpeed && Math.abs(this._stopY-symbols[this._stopIndex].y)<=moveValue)
		      {  
		          this._slowdown_movevalue = Math.abs(this._stopY-symbols[this._stopIndex].y);
                 return true;
              } 
      	 break;
      }

      return false;
		
	}
	,
	_timing:function(dt){
     
       	  this._timer+=Math.round(dt*1000);
       	  if(this._timer>=this._maxSpeedDuration)
       	  {
       	  	 this._timer = 0;
       	  	 return true;
       	  }
   
       return false;
	}
	,
	update:function(dt)
	{

		  
		  this._moveSymbols(dt);//根据速度移动在内方块
          this._speedChange(dt);//速度变化
		  if(this.currentSpeed>=this.maxSpeed && !this.stopFlag )
		  { 
		  	 if(this._timing(dt))
                      this.stopFlag = true;
		  }
		  if(this._slowDown(dt))//减速到停止
		  {
                    this._moveSymbols(dt,true);
                    this._stopReel();
		  }
	}
	,
	_tweenStop:function(){
         switch(this._direction)
          {
          	  case ReelDirection.up:
                   
		  var move1 = new cc.Place(cc.p(this.x,this.y+this._tween));
		  var move2 = new cc.Place(cc.p(this.x,this.y));
          	  break;
          	  case ReelDirection.down:

		  var move1 = new cc.Place(cc.p(this.x,this.y-this._tween));
		  var move2 = new cc.Place(cc.p(this.x,this.y));
          	  break;
          }
          var self = this;
          var clearself = new cc.CallFunc(function(){move1=null;move2=null;},this);
          var turnOver = new cc.CallFunc(function(){
                  if(GAMEOB!=undefined&&self._notifaction!=null)
                     GAMEOB.sendNotifaction(self._notifaction,self);

                    self.setChildrenOpacity(255);//更改透明度
          },this);
          this.runAction(cc.sequence(move1,new cc.DelayTime(0.05),move2,clearself,turnOver));
	}
	,
	_stopReel:function(){


          this.unscheduleUpdate();
          this.stopFlag = false;
          this.currentSpeed = 0;
          this._tweenStop();

	}


});