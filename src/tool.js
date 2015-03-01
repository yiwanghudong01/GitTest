var GMAESETUP={
    fps:60,
    font_face:"Impact",
    bigwin:1000,
    freeSpinTimes:7,
    interval:0.017

};
var WINRESULT = null;
//指定值是否在数组中
function in_array(value,arr)
{
     for(var i=0;i<arr.length;i++)
     {
      if(arr[i]==value) return true;
     }
     return false;
}

//返回对象类型
function getObjType(obj)
{
	  return Object.prototype.toString.call(obj);   
}

//随机数生成对象
var RandomArrayMaker = function(){
    this.cursor = 0;
	this.rcursor= 0;
	this.arr    = new Array();
}

//获取线条对于分数
function getLineObjScore(lineObj)
{ 
                 var index = lineObj.sb;
                 if(index=='w')
                 	index = 0;

                  var scorearr = SymbolData[index].score;
                  if(scorearr.length==1)
                  	          return 10;
                  else
                  	{ 
                                       var scoreIndex = Math.abs(5-lineObj.count);
                                       return scorearr[scoreIndex];
                  	}        
}

RandomArrayMaker.prototype={
      isInArray:function(v,arr){
	      var t=0;
          for(var i=0;i<arr.length;i++)
		  {
		     if(arr[i]==v)
			 {
			    t++;
			 }
		  }
		  return t;
	  },
	  InArray:function(v,arr)
	  {
	      for(var i=0;i<arr.length;i++)
		  {
		     if(arr[i]==v)
			 {
			    return true;
			 }
		  }
		  return false;
	  }
	  ,make:function(repeats,noin,arrlength,maxnum){
	        var self = this;
			if(self.arr.length>=arrlength)return;
			if(this.rcursor==0)this.rcursor = arrlength-1;
			
			var rd = Math.round(Math.random()*maxnum);
			//如果出现在不改出现的数组中
			 if(noin!=null && self.InArray(rd,noin))
			 {
			    self.make(repeats,noin,arrlength,maxnum);
			    return;
			 }
			
			 var myt = self.isInArray(rd,self.arr);
			 if(myt==0 || myt<repeats)
		     {
		       self.arr.push(rd);
		     }
			
             self.make(repeats,noin,arrlength,maxnum);			
	  },
	  reset:function(){
	       this.arr =[];
		   this.cursor = 0;
	       this.rcursor= 0;
	  }
	  ,getRdnum:function(){
	         
		      var num = this.arr[this.cursor];
			  this.cursor++;
			  if(this.cursor>=this.arr.length)this.cursor=0;
			  return num;
	  }
	  ,
	  getRdnumRe:function(){
	         var num = this.arr[this.rcursor];
	         this.rcursor--;
			 if(this.rcursor<0)this.rcursor=(this.arr.length-1);
			 return num;
	  }

}

