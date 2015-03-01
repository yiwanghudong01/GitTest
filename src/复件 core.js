//指定值是否在数组中
function in_array(value,arr)
{
     for(var i=0;i<arr.length;i++)
     {
      if(arr[i]==value) return true;
     }
     return false;
}


var RandomArrayMaker = function(){
    this.cursor = 0;
	this.rcursor= 0;
	this.arr    = new Array();
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



//抽象画 卷轴
/*
var Reels = new Array(5);
var ReelLength = 32;
var Symbols = ['w',1,2,3,4,5,6,7,8,9,10];

for(var i=0;i<Reels.length;i++)
{
      Reels[i] = new Array();
}


var SymbolsCount =[2,2,2,3,2,4,3,4,3,4,3]; //对应的数量

for(k=0;k<Reels.length;k++)
{
        for(i=0;i<SymbolsCount.length;i++)
        {
	var inum = SymbolsCount[i];
	for(var j=0;j<inum;j++)
	{
                     Reels[k].push(Symbols[i]);
	}
         } 
}

console.log(Reels);

var rr=[[],[],[],[],[]];
var rdmaker = new RandomArrayMaker();

for(i=0;i<Reels.length;i++)
{        
	
	rdmaker.make(1,[],32,31);
              for(j=0;j<rdmaker.arr.length;j++)
              {
	       var index = rdmaker.arr[j];
	        rr[i].push(Reels[0][index]);
              }
             rdmaker.reset();
}
console.log(rr);

for(i=0;i<rr.length;i++)
{
	for(j=0;j<rr[i].length;j++)
	{
		document.write(rr[i][j]+",");
	}
             document.write("<br />");

}  
*/
//准备好每个转轮
var myReels = [
[3,5,6,1,5,9,10,8,7,7,'w',9,2,7,9,10,6,3,4,6,3,2,5,7,8,4,1,'w',9,8,5,10],
[7,8,9,9,5,5,3,7,10,'w',10,2,6,1,3,6,6,7,8,7,2,9,3,4,8,5,5,10,1,9,'w',4],
[3,8,10,4,1,2,'w',8,7,3,4,5,7,5,6,10,9,9,6,'w',9,8,5,6,10,7,5,2,1,7,9,3],
[2,6,2,1,1,5,10,9,5,7,3,7,9,5,'w','w',10,8,5,6,4,3,10,6,7,4,3,8,7,9,9,8],
[9,4,7,7,3,2,4,10,8,'w','w',5,10,5,10,1,3,6,7,1,5,7,6,3,5,6,8,9,8,9,2,9]
];

//准备好每个转轮的指定位置
var chooseArr = [];
for(var i=0;i<myReels.length;i++)
{
        var rd = Math.floor(Math.random()*myReels[i].length);
        chooseArr.push(rd);
}

//根据 chooseArr 选出每个转轮的
var resultArr = [[],[],[],[],[]];

for(i=0;i<resultArr.length;i++)
{
	 var reels = myReels[i];

	var tindex = chooseArr[i];
	var pre_tindex  = tindex-1;
	var next_tindex = tindex+1;
              if(pre_tindex<0)pre_tindex = 30;
              if(next_tindex>31)next_tindex=0;
     
             resultArr[i].push(reels[pre_tindex]);
             resultArr[i].push(reels[tindex]);
             resultArr[i].push(reels[next_tindex]);
}

console.log(resultArr);
//检测这些转轮是否中奖了,还有中奖的详情
function findSameSymbol(csymbol,reel)
{
	  var r = [];
	  for(var i=0;i<reel.length;i++)
	  {
	  	if(reel[i]==csymbol||reel[i]=='w'||csymbol=='w')
	  	{
	                         r.push({index:i,symbol:reel[i]});
	  	}
	  }
	  return r;
}

var endr = new Array(3);
for(i=0;i<resultArr[0].length;i++)
{
	var currentSymbol = resultArr[0][i];
	 if(currentSymbol=='w')
	     {
                                 //第二组每一个都要去排查
	      }
               else
	      {

	      }
}

var Tindex = 0;

function findsb(n,csb){
                 if(n>=5)
                 	return csb;
                 else 
                 {
                            for(var i=0;i<resultArr[n].length;i++)
                           {
                     	    var currentSymbol = resultArr[n][i];
                     	    if(csb.length<=0)
                     	    {
                     	  	csb.push({nx:n,index:i,sb:currentSymbol});
                     	    }
                     	    else
                     	    {
                                         if(currentSymbol=='w')
                                          	csb.push({nx:n,index:i,sb:currentSymbol});
                                          else if(csb[csb.length-1].sb==currentSymbol)
                                          {
                                                         csb.push({nx:n,index:i,sb:currentSymbol});
                                          }
                     	    }//csb.length
                             
                         }	

                         return findsb(n+1,csb);

                 }//if(n>=5)


}

var okr = new Array(3);
for(i=0;i<resultArr[0].length;i++)
{         
            var s = {nx:0,index:i,sb:resultArr[0][i]}
            okr[i] = findsb(1,[s]);
}


console.log(okr);

//判断是否中奖
var canArray = [];
for(i=0;i<okr.length;i++)
{
	var canuser = true;
	//根据nx排序
	if(okr[i].length<=2)
	{
		canuser = false;
	}
	else
	{

		 var s_okr = okr[i].sort(function(a,b){a.nx-b.nx});
	               //console.log(s_okr);
                             if(s_okr[s_okr.length-1].nx<2)
                             {
                                      canuser = false;
                             }
                             else
                             {
                                             for(k=s_okr.length-1;k>0;k--)
                                                {
                                                      if((s_okr[k].nx-s_okr[k-1].nx)>1&&s_okr[k].nx>=2)
                                                   {
                                                          canuser = false;
                                                             break;
                                                    }
                                             }
                             }
                               
                              	 
	}

	if(canuser)
	{
                       console.log("can use:");
                       console.log(okr[i]);
                       canArray.push(okr[i]);
	}
	else
	{
                       console.log("can not use:");
                       console.log(okr[i]);
	}
	
}
 

function getIndexByRow(rule,index)
{
     var rowPosition = [0,5,10];
     for(var i=0;i<rowPosition.length;i++)
     {
       var tempIndex = rowPosition[i]+index;
       if(rule[tempIndex]==1)
       {
        return tempIndex;
       }
     }
}

function getRealPosition(nx,index)
{
	   var rp = [0,5,10];
	   return rp[index]+nx
}


if(canArray.length<=0)
{
	//这盘没有获胜的人
}
else if(canArray.length>0)
{
	console.log('jugg can find the line');
	//计算有可能获胜的组合是否满足 线条要求
	for(i=0;i<canArray.length;i++)
	{
		var currentCan = canArray[i];
		currentCan = currentCan.sort(function(a,b){a.nx-b.nx});
                            console.log(currentCan);
                            
                            var used = [];
                            //从第2个开始计算相同的
                            var samearr = new Array(currentCan.length);

                            for(j=1;j<currentCan.length;j++)
                            {
                                 
                                   if(in_array(currentCan[j],used))continue;
                                   samearr[j-1] = [];
                                   samearr[j-1].push(currentCan[j]);
                                   used.push(currentCan[j]);
                                   
                                   for(k=1;k<currentCan.length;k++)
                                   {
                                   	if(j!=k&&!in_array(currentCan[k],used))
                                   	{
                                   		if(currentCan[k].nx==currentCan[j].nx)
                                   		{
                                   			samearr[j-1] .push(currentCan[k]);
                                   			used.push(currentCan[k]);
                                   		}
 
                                   	}
                                   }  
                            }
                            console.log(currentCan[0]);
                            console.log(samearr);

                            //处理samearr 去掉undefined
                            var ptemp = [];
                            for(var p=0;p<samearr.length;p++)
                            {
                                    if(samearr[p]!=undefined)
                                      ptemp.push(samearr[p]);
                            }
                            samearr = ptemp;
                            
                            //获取线条总数
                            //肯定有1条
 
                            var total = 1;
                            for(i1=0;i1<samearr.length;i1++)
                            {
                                    if(samearr[i1]!=undefined)
                                    total*=samearr[i1].length;
                            }

                            var mylines  =  null;
   
   console.log("total line "+total);
   if(total==1)
   { 
                mylines = [[]];
                for(i1=0;i1<currentCan.length;i1++)
                {
                       mylines[0].push(currentCan[i1]);
                } 
   }
   else
   { 
                            mylines  = new Array(total);

                            for(i1=0;i1<mylines.length;i1++)
                            {
                            	mylines[i1] = [];
                            	mylines[i1].push(currentCan[0]);
                            }
                            console.log(currentCan[0]);
                            console.log('origin:');
                            console.log(mylines);

                            console.log('all combian lines');
                             
                            function getLineQueue(line)
                            {
                                            var str = "";
                                            for(var i=0;i<line.length;i++)
                                            {
                                                  str+=line[i].sb+","+line[i].index+":";
                                            }
                                            return str;
                            }

                            function getLineArrayObj(line,num)
                            {
                                            return getLineQueue(line)+"-"+num;
                            }


                            function getSameGroup(arr)
                            {
                                           
                                            var len = arr.length;
                                            var myarr = new Array(len);
                                            var used = [];

                                            for(var i=0;i<arr.length;i++)
                                            { 
                                                  var line_index_Obj = getLineArrayObj(arr[i],i);
                                                  //变成了带索引的序列
                                                  if(!in_array(line_index_Obj,used))
                                                  {
                                                        myarr[i]= new Array();
                                                        myarr[i].push(arr[i]);
                                                        used.push(line_index_Obj);
                                                  }
                                                  else
                                                    continue;

                                                  for(var j=0;j<len;j++)
                                                  {
                                                        var line_index_Obj_j = getLineArrayObj(arr[j],j);
                                                         if(i!=j&&!in_array(line_index_Obj_j,used))
                                                         {
                                                                    //index 排列序列相等
                                                                    if(getLineQueue(arr[i])==getLineQueue(arr[j]))
                                                                    {
                                                                          myarr[i].push(arr[j]);
                                                                          used.push(line_index_Obj_j);
                                                                    }          
                                                         }
                                                  }
                                            }
                                             
                                             
                                            var resultarr = [];
                                            for(i=0;i<myarr.length;i++)
                                            {
                                                   if(myarr[i]!=undefined)
                                                    resultarr.push(myarr[i]);
                                            }


                                            return resultarr;
  
                            }

                            function getAllLine(linesarr,sarr,depth)
                            {
                                            if(depth>=sarr.length) return linesarr;
                                            
                                            var currentSarr = sarr[depth] ; 
                                            var temparr = getSameGroup(linesarr);

                                            console.log('depth '+ depth+": ");
                                            console.log(temparr);
                                          
                                            var chuliarr = [];
                                            for(var i=0;i<temparr.length;i++)
                                            {
                                                    var myindex = 0;
                                                    for(var j=0;j<temparr[i].length;j++)
                                                    {
                                                            temparr[i][j].push(currentSarr[myindex]);
                                                            chuliarr.push(temparr[i][j]);
                                                            myindex++;
                                                            if(myindex>=currentSarr.length)
                                                              myindex = 0;
                                                    }
                                            }
                                            console.log('chuli :');
                                            console.log(chuliarr);
                                            return getAllLine(chuliarr,sarr,depth+1);
                            }
                          
                          //得到所有组合线条数组
                          mylines  =  getAllLine(mylines,samearr,0) ;
                            
  }//  if(total==1)
                            //--------获取所有线的组合------------
              
                            console.log("last lines:");
                            console.log(mylines);

                            console.log('single group has '+total+" combain");
                            //检验符合要求的线条
                            var reslutAllline = [];
                            for(j=0;j<mylines.length;j++)
                            {                            	
                                        var currenCheckLine = mylines[j];
                                         
                                         for(k=0;k<LINES.length;k++)
                                         {
                                         	     var tj = 0;
                                         	     var biyao = true;
                                                for(u=0;u<currenCheckLine.length;u++)
                                                {
                                                        var myrp = getRealPosition(currenCheckLine[u].nx,currenCheckLine[u].index);
                                                        if(LINES[k][myrp]==1)
                                                        {
                                                                  tj+=1;
                                                        }

                                                        if(u==1&&u==2)
                                                        {
                                                                 if(LINES[k][myrp]==0)
                                                                 	biyao = false;
                                                        }

                                                }
                                                if(tj>=3&&biyao)
                                                {
                                                           var lineobj = {sb:currenCheckLine[0].sb,line:k+1,count:tj,realcount:currenCheckLine.length};
                                                           if(reslutAllline.length>0)
                                                           { 
                                                                      var canadd = true;
                                                                      for(m=0;m<reslutAllline.length;m++)
                                                                      {
                                                                             if(reslutAllline[m].sb ==lineobj.sb && reslutAllline[m].line==lineobj.line)
                                                                             { 
                                                                                   if(reslutAllline[m].count<lineobj.count) 
                                                                                    {reslutAllline[m].count = lineobj.count;}
                                                                                    canadd = false;
                                                                                    break;
                                                                             }
                                                                      }
                                                                      if(canadd)
                                                                      reslutAllline.push(lineobj);
                                                           }
                                                           else
                                                                reslutAllline.push(lineobj);
                                                         
                                                	   //console.log(currenCheckLine[0].sb+" r:"+(k+1)+" line and count:"+tj+"--realcount:"+currenCheckLine.length);
                                                }

                                                

                                         }

                            }
                            console.log(reslutAllline);
                            console.log('<------------------------------------------------------>');
                     

	}
}


 