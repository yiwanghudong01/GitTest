/*type={label,framename,rect}
 
*/
var SymbolSpriteAnimateType = {normal:"normal",active:"active"};
function SymbolFactory(type,rect,args)
{
	/*type{label,framename}
      args(Array){fname:string,rank:array,frate:number}
	*/
	var symbol = new Symbol(type,rect);
    symbol.initSpriteAnimate(args);
    return symbol
}
var Symbol = cc.Sprite.extend({
	_type:null,
	_sprite:null,
    _frameReplaceKey:"@",
    _reelIndex:null,
	_spriteNormalAnimate:null, 
	_spriteActiveAnimate:null,
	_spriteActionType:{normal:"normal",active:"active"},
	_spriteArgs:null,
    ctor:function(type,rect){
         this._super();
         this.setAnchorPoint(cc.p(0,0));
         this._type = type;
         this.init(type,rect);
    },
    init:function(type,rect)
    {
    	this._sprite = new cc.Sprite(type.framename,rect);
    	this._sprite.setAnchorPoint(cc.p(0,0));
    	this.addChild(this._sprite);
    	return true;
    }
    ,
    setReelIndex:function(num)
    {
      this._reelIndex = num;
    }
    ,
    _getFrame:function(fn,num)
    {
    	var cframe = fn.replace(/@/ig,num);//_frameReplaceKey
    	var frame = cc.spriteFrameCache.getSpriteFrame(cframe);
        if(frame==null||frame==undefined)
        	cc.log("symbol err:"+this._type.label+" wrong framename");
        return frame;
    }
    ,
    initSpriteAnimate:function(args){
       this._spriteArgs = args;
       /*args =[]
       {fname:,rank:,frate},
       active:{fname:,rank:,frate}
       ]*/
       for(var g=0;g<args.length;g++)
       {
       	   var anim = args[g];
           var frames = [];
           for(var i=anim.rank[0];i<=anim.rank[1];i++)
             {
        	    var f = this._getFrame(anim.fname,i);
        	    frames.push(f);
             }
           var animation = cc.Animation.create(frames,anim.frate);
           var animate = cc.Animate.create(animation);
           if(g==0)
           {
           	  //普通动画
           	  this._spriteNormalAnimate = new cc.RepeatForever(animate);
              this._spriteNormalAnimate.setTag(this._spriteActionType.normal);
           }
           else if(g==1)
           {
           	  //激活动画
           	  this._spriteActiveAnimate = new cc.RepeatForever(animate);
              this._spriteActiveAnimate.setTag(this._spriteActionType.active);
           }
       }
 
    }
    ,
    stopSpriteAnimate:function(typename)
    {
    	this._sprite.stopActionByTag(typename);
    }
    ,
    runSpriteAnimate:function(typename)
    {
    	switch(typename)
    	{
    		case this._spriteActionType.normal:
    		     this._sprite.runAction(this._spriteNormalAnimate);
    		break;
    		case this._spriteActionType.active:
    		     this._sprite.runAction(this._spriteActiveAnimate);
    		break;
    	}
    	
    }

});