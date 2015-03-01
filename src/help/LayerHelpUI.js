var LayerHelpUI  = cc.Layer.extend({
    prefunc:null,
    nextfunc:null,
    ctor:function(pre,next){
    	this._super();
    	//背景图片
    	this.background = new cc.Sprite(res.HelperUI_png);
    	this.addChild(this.background);
    	this.background.setAnchorPoint(cc.p(0,0));
    	
        this.prefunc = pre;
        this.nextfunc = next;
        
        //初始化按钮
        this.initMenu();

       
        return true;
    },
    showBtns:function(bool,type){

        if(type=='pre' && bool==false)
        { 
            this.backItem.setVisible(false);

        }
        else if(type=='next' && bool==false)
        {
             this.nextItem.setVisible(false);
        }
        else
        {
             this.backItem.setVisible(true);
             this.nextItem.setVisible(true);

        }

    }
    ,
    //初始化菜单按钮
    initMenu:function(){
        
        this.resumeItem = new cc.MenuItemImage(res.ResumeNormal_png,res.ResumeSelected_png,function(){
 cc.audioEngine.playEffect(res.Voice_btn_click);
        	cc.director.runScene(new GameMainScene())},this);
		this.resumeItem.attr({
		    x: -60,
            y: 25,
            anchorX:0,
            anchorY:0});
		this.backItem = new cc.MenuItemImage(res.BackNormal_png,res.BackSelected_png,this.prefunc,this);
		this.backItem.attr({
		    x: -200,
            y: 25,
            anchorX:0,
            anchorY:0});
        this.backItem.setVisible(false);//第一页 返回按钮隐藏
	    
		this.nextItem = new cc.MenuItemImage(res.nextNormal_png,res.nextSelected_png,this.nextfunc,this);
		this.nextItem.attr({
		    x: 130,
            y: 25,
            anchorX:0,
            anchorY:0});

		this.menu = new cc.Menu(this.resumeItem);
		this.menu.setPosition(cc.p(683,10));
		this.menu.addChild(this.backItem);
		this.menu.addChild(this.nextItem);
		
		this.addChild(this.menu,2);

    }



});