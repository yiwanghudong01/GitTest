//代码格式怎么乱了？20:45 2015/3/1
//20:48 2015/3/1 乱码
//TESTOK 003
var GameMainScene = cc.Scene.extend({
    layerUI:null,
    layerReel:null,
    layerEffects:null,
    gameScript:null,
    onEnter:function () {
        this._super();
        this._loadSpriteFrame();
        this.init();
    }
    ,
    _loadSpriteFrame:function(){
        cc.spriteFrameCache.addSpriteFrames(res.Symbols_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Door_plist);
        cc.spriteFrameCache.addSpriteFrames(res.WolfMan_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Kuang_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Special_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Bigwin_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Freespin_plist);
    } 
    ,
    init:function(){

        this.layerUI = new LayerUI();
        this.addChild(this.layerUI,9);
        
        this.layerReel= new LayerReel();
        this.addChild(this.layerReel,8);
       
        this.layerEffects =new LayerEffects();
        this.addChild(this.layerEffects,10);
 
        GAMEOB.cleanAll();
        this.gameScript = new GameScript(this.layerEffects,this.layerUI,this.layerReel);

    }
});

