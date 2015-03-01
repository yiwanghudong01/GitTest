var InfoBoard = cc.Sprite.extend({
	_ttf:null,
    ctor:function(){
         this._super();
         this.init();
    },
    init:function(){
    	var fontDef = new cc.FontDefinition();
            fontDef.fontName = "Arial";
            fontDef.fontSize = "32";
            this._ttf = new cc.LabelTTF('hello buddy',fontDef);
            this.addChild(this._ttf);

    }

});