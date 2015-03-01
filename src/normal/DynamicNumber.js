var DNumType = {INT:1,FLOAT:2};
//动态数字构造工厂
function DNumFactory(defaultnum,fontsize,type,prefix,floatlong)
{
     var dnum = new DNum(fontsize);
     if(type!=undefined)dnum._type = type;
     if(floatlong!=undefined)dnum._floatlong = floatlong;
     if(prefix!=undefined)dnum.setPrefix(prefix);
     if(defaultnum!=undefined)dnum.setNum(defaultnum);
     return dnum;
}
var DNum = cc.Sprite.extend({
    _currentNum:0,
    _floatlong:2,
    _type:DNumType.INT,
    _prefix:' ',
    _ttf:null,
    _duration:0,
    _delta:0,
    _tempWay:'',
    _tj:0,
    _result:0,
    _fps:40,
    _fontsize:30,
    _speedRate:2,
    _notifaction:null,
    ctor:function(fontsize){
    	this._super();
    	if(fontsize!=undefined)this._fontsize = fontsize;
    	this.init();
    },
    setNotifaction:function(name){
        this._notifaction = name;
    },
    setSpeedRate:function(num){ 
         this._speedRate = num;
    }
    ,
    init:function(){
        
        this._ttf = new cc.LabelTTF(this._prefix+this.getNumString(),GMAESETUP.font_face,this._fontsize);
        this.addChild(this._ttf);
    	return true;
    }
    ,
    //获取数字字符
    getNumString:function(){
         switch(this._type){
             
             case DNumType.FLOAT:
                var ten_sq = Math.pow(10,this._floatlong);
                return (this._currentNum/ten_sq).toFixed(2).toString();
             break;
             case DNumType.INT:
                return (this._currentNum).toString();
             break;
         }
    }
    ,
    updateTTF:function(){

    	 this._ttf.setString(this._prefix+this.getNumString());
    }
    ,
    setPrefix:function(str){
         this._prefix = str;
    }
    ,
    //设定数字
    setNum:function(num){
          if(this._type==DNumType.FLOAT)
          {
          	  var ten_sq = Math.pow(10,this._floatlong);
          	  this._currentNum = num*ten_sq;
          }
          else if(this._type==DNumType.INT)
          {
          	   this._currentNum = num;
          }
          this.updateTTF();
    }
    ,
    getInputNum:function(num){
    	  if(this._type==DNumType.FLOAT)
          {
          	  var ten_sq = Math.pow(10,this._floatlong);
          	  return num*ten_sq;
          }
          else if(this._type==DNumType.INT)
          {
          	   return num;
          }
    }
    ,
	setAttr:function(a)
	{
		//设置字体格式
	    this._ttf.attr(a);
	}
	,
	getDuration:function(){
        //cc.log(this._duration);
		return this._duration;
	}
	,
	setInc:function(num)
	{
        var num_c = this.getInputNum(num);
        this._result = this._currentNum+num_c;
        this._delta = this._speedRate;
        this._duration = num_c*(1/(GMAESETUP.fps*this._speedRate)); //根据速率技术生命周期
        this._tempWay = 'inc';
        var self = this;
        this.runAction(cc.sequence(new cc.DelayTime(0.2),new cc.CallFunc(function(){self.scheduleUpdate()},this)));
	}
	,
	setDec:function(num)
	{
       
        var num_c = this.getInputNum(num);
        this._result = this._currentNum-num_c;
        this._delta = this._speedRate;
        this._duration = num_c*(1/(GMAESETUP.fps*this._speedRate)); //根据速率技术生命周期
        this._tempWay = 'dec';
        var self = this;
        this.runAction(cc.sequence(new cc.DelayTime(0.2),new cc.CallFunc(function(){self.scheduleUpdate()},this)));
	}
	,
	changeTo:function(num){
                         var mynum = this.getInputNum(num);
         //if(d==undefined)d=1;
                        var numc = Math.abs(this._currentNum-mynum);
                        if(this._currentNum>mynum)
                        {
                             this.setDec(numc);
                        }
                      else
                      {
                           this.setInc(numc);
                      }
	}
	,
	reset:function(){
    //结束这次变化的临时变量
        //this._duration = 0;
        this._tj = 0;
        this._delta  = 0;
        this._result = 0;
	}
	,
	//最后更新
	updateOver:function(){
         this._currentNum = this._result;
         this.reset();
         this.unscheduleUpdate();
         this.updateTTF(); //更新字符显示
         
         //结束时发送通知
         if(GAMEOB!=undefined&&this._notifaction!=null)
         GAMEOB.sendNotifaction(this._notifaction);
	}
	,
	update:function(dt)
	{

        //根据当前结果状态
        switch(this._tempWay)
        {
        	case 'inc':
             this._currentNum+=this._delta;
        	 if(this._currentNum>=this._result)
              {
                 this.updateOver();
                 return; 
              }
        	break;
        	case 'dec':
        	 this._currentNum-=this._delta;
        	 if(this._currentNum<=this._result)
              {
                 this.updateOver();
                 return; 
              }
        	break;
        }

        this.updateTTF(); //更新字符显示

        //根据执行周期判断生命周期
        this._tj +=cc.director.getSecondsPerFrame();
        if(this._tj>=this._duration)
        {
            this.updateOver();
           	return; 
        }
	}


});