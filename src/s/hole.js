var Hole = cc.Sprite.extend({
	ctor:function(){
		this._super("#hole.png");
		this.setAnchorPoint(cc.p(0,0));
		this.width  = 180;
		this.height =180;
	}
});