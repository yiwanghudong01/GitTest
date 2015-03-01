//20:46 2015/3/1 俐屎佚連。。。。。。。
var CEvent = function(eventName,func,i,tag){
    this._name = eventName;
    this._func = func;
    this._order = i;
    this._tag = '#';
    if(tag!=undefined)
        this._tag = tag;
}
CEvent.prototype={
    getName:function(){
    	return this._name;
    }
}
var CObserver = function(name){
	this._name = name;
    this._events = [];
}
CObserver.prototype = {
    register:function(name,func,i,tag)
    {
    	var order = i;
    	if(order==undefined||order==null)order=1;

    	if(!this._isExists(name,func,tag))
    	this._events.push(new CEvent(name,func,order,tag));
    },
    _isExists:function(name,func,tag){

        for(var i=0;i<this._events.length;i++)
    	{
                  if(this._events[i].getName()==name&&(this._events[i]._func==func||this._events[i]._tag ==tag))
                  {
                      return true;
                  }
    	}
    	return false;
    }
    ,
    sendNotifaction:function(name,target)
    {
    	//cc.log('this is a named ['+name+'] notifaction - -!');
    	var choosen = [];
    	for(var i=0;i<this._events.length;i++)
    	{
            if(this._events[i].getName()==name)
            {
                 choosen.push(this._events[i]);
            }
    	}
    	if(choosen.length<=0)return;
    	choosen = choosen.sort(function(a,b){return a._order-b._order});

    	for(i=0;i<choosen.length;i++)
    	{
                           if(target!=undefined)
    		choosen[i]._func(target);
                           else
                            choosen[i]._func();
    	}
    }
    ,
    destroy:function(name,func,tag)
    {
    	for(var i=0;i<this._events.length;i++)
    	{
                  if(this._events[i].getName()==name&&(this._events[i]._func==func||this._events[i]._tag==tag))
                  {
                       this._events.splice(i,1);
                       return ;
                   }
            }
    },
    cleanAll:function(){ 
          this._events = [];
    }

}
var GAMEOB = new CObserver('global');

