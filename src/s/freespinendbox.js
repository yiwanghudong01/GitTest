var FreeSpinEndBox = cc.Sprite.extend({
	totalscore:null,
	box:{width:708,height:394},
	ctor:function(score){
		this._super(res.Freespin_end_box);
		this.setAnchorPoint(cc.p(0,0));

		var str = "";
		if(score==0)
			str = "0 ";
		else
			str=score;

		this.totalscore = new cc.LabelTTF(str,GMAESETUP.font_face,150);
	              this.totalscore.attr({lineWidth:2,strokeStyle:cc.color(0,0,0),fillStyle:cc.color(253,239,9)});
                            this.totalscore.setAnchorPoint(cc.p(0,0));
                            this.totalscore.setPosition(cc.p(this.box.width/2-100,this.box.height/2-100));
                            this.addChild(this.totalscore);
	 
	}
});