//游戏帮助类
/*
   先显示线条数量
   1 ， w,1,2
   2 4中获奖
   3 3种获奖 加 respin
   4 3个 litespin  7次免费

*/
var GameHelperScene = cc.Scene.extend({
    onEnter:function(){
            this._super();

            var content = new LayerContent();
            this.addChild(content);

            var ui = new LayerHelpUI(function(){var b=content.prePage();ui.showBtns(b,'pre'); cc.audioEngine.playEffect(res.Voice_btn_click);},function(){var b=content.nextPage();ui.showBtns(b,'next'); cc.audioEngine.playEffect(res.Voice_btn_click);});
            this.addChild(ui);



    }

});