var LayerContent  = cc.Layer.extend({
    contentArray:null,
    pagecount:0,
    page:0,
    showObj:null,
    frameprefix:"helpercontent",
    ctor:function(){
    	this._super();
        this.init();
    },
    init:function(){
        //资源设置完毕
        this.contentArray = [res.HelpCont_01_png,res.HelpCont_02_png,res.HelpCont_03_png,res.HelpCont_04_png,res.HelpCont_05_png];
        this.pagecount = this.contentArray.length;
        this.page = 1; 
        
        //显示精灵
        this.showObj = new cc.Sprite();
        this.showObj.setAnchorPoint(cc.p(0,0));
        this.showObj.setPosition(cc.p(80,100));
        this.addChild(this.showObj);
        
        //初始化帧
        for(var i=0;i<this.contentArray.length;i++)
        {
            var frame = new cc.SpriteFrame(this.contentArray[i],cc.rect(0,0,1200,535));
            cc.spriteFrameCache.addSpriteFrame(frame,this.frameprefix+(i+1));
        }
        
        this.showContent(); //先显示第一帧帮助
    	return true;
    }
    ,
    showContent:function()
    {
    	 var frame = cc.spriteFrameCache.getSpriteFrame(this.frameprefix+this.page);
    	 this.showObj.setSpriteFrame(frame);
    }
    ,
    prePage:function(){

         this.page-=1;
         if(this.page<=0)
         {
         	 this.page=1;
         	 return false;
         }
         else if(this.page==1)
         {
         	 this.showContent();
         	 return false ;
         }
         this.showContent();
         return true;
    }
    ,
    nextPage:function(){

         this.page+=1;
         if(this.page>this.pagecount)
         {
         	this.page=this.pagecount;
         	return false;
         }
         else if(this.page==this.pagecount)
         {
         	   this.showContent();
         	   return false;
         }
         this.showContent();
         return true;
    }


});