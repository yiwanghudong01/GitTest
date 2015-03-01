//20:47 2015/3/1  缓存之前测试
var GameUser =  function(){ 
       this._num_reveal    = 0;
       this._num_entries   = 0;
       this._num_totalwin = 0;

       this._odds =0;

        this._setup_bomb_on = false;
        this._setup_auto_on    = false;
}
GameUser.prototype = { 
        canStart:function(){ 
                 if(this._num_reveal>this._num_entries)
                 	return false;

                 return true;
        },
        setReveal:function(num){ 
                   this._num_reveal = num;
        },
        setEntries:function(num){ 
                   this._num_entries = num;
        },
        setTotalwin:function(num){ 
                   this._num_totalwin += num;
        },
        setBombState:function(bool)
        { 
                     this._setup_bomb_on = bool;
        },
         setAutobState:function(bool)
        { 
                     this._setup_auto_on = bool;
        }
        ,
        init:function(){ 
              this.getRemoteSetup();


        }
        ,getRemoteSetup:function(){ 

                        this._num_reveal    = 35;
                        this._num_entries   = 90000;
                        this._num_totalwin = 0;

                        this._odds = 0.01;

                        this._setup_bomb_on = true;
                        this._setup_auto_on    = false;
        }

}

//全局用户对象
var GLOBAL_USER = new GameUser();
GLOBAL_USER.init();