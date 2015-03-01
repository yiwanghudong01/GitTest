
var  CoreReels = function(count,len,symbols){
       this._reelsCount =   count;
       this._reelLength =   len;
       this._symbols      =  symbols;
       this._symbolsCountQueue = null;
}
CoreReels.prototype = {
         make:function(symbolCountQueue){
                  
                 this._symbolsCountQueue = symbolCountQueue;
                 if(this._symbols.length!=this._symbolsCountQueue.length)
                 {
                      cc.log("symbols.length not equire symbolsCountQueue.length");
                      return ;
                 }
                 if(!this._checkCount()) return;
                //初始化所有转轮
            
                       var moban = [];
                       //把模版
                       for(var j=0;j<this._symbolsCountQueue.length;j++)
                       {
                              for(var k=0;k<this._symbolsCountQueue[j];k++)
                              {
                                    moban.push(this._symbols[j]);
                              }
                             
                       }
                       //根据每个数量存放symbol 结束
                       
                       return this._makeRandomReel(moban);
                //
         },
         _checkCount:function(){
                  
                  var total = 0;
                  for(var i=0;i<this._symbolsCountQueue.length;i++)
                  {
                        total+= this._symbolsCountQueue[i];
                  }

                  if(total!=this._reelLength)
                  {
                        cc.log("symbolCountQueue sum != reelLength ");
                         return false;
                  }

                  return true;
   
         },
         _makeRandomReel:function(moban){
                 
                 var rr = new Array(this._reelsCount );
                 var rdmaker = new RandomArrayMaker();
                 for(var i=0;i<this._reelsCount;i++)
                 {
                        rr[i] = new Array();

                        rdmaker.make(1,[],this._reelLength,this._reelLength-1);
                        var temparr = rdmaker.arr;

                        for(j=0;j<temparr.length;j++)
                               {
                                           var index =temparr[j];
                                            rr[i].push(moban[index]);
                               }
                        rdmaker.reset();

                 }
                 return  rr;
         }

}

/*
制作内存中的转轮
var myCoreReels = new CoreReels(5,32, ['w',1,2,3,4,5,6,7,8,9,10]);
var t = myCoreReels.make([2,2,2,3,2,4,3,4,3,4,3]);
*/
 

var RandomRealReel = function(rr){
       this._reelsArray = rr;
       this._array_reel = new Array(rr.length);
}
RandomRealReel.prototype={ 
        makeVisibleSymbols:function(pre,next,max,min){
                   
                    for(var i=0;i<this._reelsArray.length;i++)
                    { 
                           var chooseNum =0;
                           var chooseNumArr = [];
                           var rd = Math.floor(Math.random()*this._reelsArray[i].length);
                           chooseNum =rd;
                          // console.log('choose num:');
                           //console.log(chooseNum);
                                   for(var j=pre;j>0;j--)
                                   {
                                          var currentNum = chooseNum - j;
                                          if(currentNum<min)
                                                currentNum = max-Math.abs(currentNum)+1;
                                         chooseNumArr.push(currentNum);
                                   }
                            chooseNumArr.push(chooseNum);
                                   for(j=1;j<=next;j++)
                                   {
                                          currentNum = chooseNum + j;
                                          if(currentNum>max)
                                                 currentNum =  min+(currentNum-max)-1;
                                          chooseNumArr.push(currentNum);
                                   }

                              //console.log(chooseNumArr);
                              this._array_reel[i] = chooseNumArr;
                    }
        }
        ,
        getVisibleSymbols:function(){
                var arr  = new Array(this._array_reel.length);
                for(var i=0;i<this._array_reel.length;i++)
                { 
                       arr[i] = [];
                       for(var j=0;j<this._array_reel[i].length;j++)
                       {
                           var num = this._array_reel[i][j]
                            arr[i].push(this._reelsArray[i][num]);
                       }
                }
                return arr;

        }

};

 function findsb(symbolarray)
{
                                      var w_arr = [];
                                      var s_arr = [];
                                      for(var i=0;i<symbolarray.length;i++)
                                      {
                                             var obj = symbolarray[i];
                                             if(obj.sb=='w')
                                                    w_arr.push(obj);
                                             else
                                                    s_arr.push(obj);
                                      }

                                      if(s_arr.length>0)
                                         return s_arr[0].sb;
                                      else
                                        return w_arr[0].sb;
 }


var ResultLine =  function(alls){
       this._all_symbol_array = alls;
       this._all_length = alls.length;

}
ResultLine.prototype={
        findCanUseSymbolArray:function(){
                              var self  = this;
                             
                             function findcan(n,symbolarray)
                             {
                                             if(n>=self._all_length) return symbolarray;

                                             for(var i=0;i<self._all_symbol_array[n].length;i++)
                                             {
                                                    var symbol = self._all_symbol_array[n][i];
                                                    if(symbolarray.length<=0){
                                                        symbolarray.push({nx:n,index:i,sb:symbol});
                                                    }
                                                    else{
                                                          if(symbol=="w")
                                                            symbolarray.push({nx:n,index:i,sb:symbol});
                                                          else
                                                          {
                                                                  var s = findsb(symbolarray)
                                                                  if(s=='w' || s==symbol)
                                                                    symbolarray.push({nx:n,index:i,sb:symbol});
                                                          }
                                                    }

                                             }//for 
                                             return findcan(n+1,symbolarray);
                             }

                              function wfindcan(n,symbolarray)
                             {
                                             if(n>=self._all_length) return symbolarray;
                                             for(var i=0;i<self._all_symbol_array[n].length;i++)
                                             {
                                                    var symbol = self._all_symbol_array[n][i];
                                                    if(symbol=="w")
                                                    {
                                                      symbolarray.push({nx:n,index:i,sb:symbol});
                                                    }
                                                    else
                                                    {
                                                                  var s = findsb(symbolarray)
                                                                  if(s=='w' || s==symbol)
                                                                    symbolarray.push({nx:n,index:i,sb:symbol});
                                                    }
                                             }//for 
                                             return findcan(n+1,symbolarray);
                             }
                            
                             var col_length = self._all_symbol_array[0].length;
                             var okr = new Array(col_length);
                             for(c=0;c<col_length;c++)
                             {         
                                      var s = {nx:0,index:c,sb:self._all_symbol_array[0][c]}
                                      okr[c] = findcan(1,[s]);
                                      /*
                                      if(self._all_symbol_array[0][c]=='w')
                                      {

                                          //还需要仔细处理  
                                         /* for(var p=0;p<3;p++)
                                          {
                                                var stemp = [];
                                                stemp.push(s);
                                                stemp.push({nx:1,index:p,sb:self._all_symbol_array[1][p]});
                                                for(var m=2;m<5;m++)
                                                {
                                                       var tempsb = self._all_symbol_array[m][]
                                                }
                                          }
                                          
                                          
                                      }
                                      else
                                      okr[c] = findcan(1,[s]); */
                              }

                            return okr;
        }
        ,
        getCanUseArray:function(array){

                //有点问题应该舍去 
                var canUseArray = new Array();
                var thisLineCanUse= null;

                for(var i=0;i<array.length;i++)
                {
                       thisLineCanUse = true;
                       if(array[i].length<=2) thisLineCanUse = false;
                      else{
                               
                              var sort_array = array[i].sort(function(a,b){a.nx-b.nx}); //根据 cols判续
                               if(sort_array[sort_array.length-1].nx<2)  //如果最多排列到 第2列 肯定这不能组成一个中奖线
                               {
                                      thisLineCanUse = false;
                               }
                               else
                               {    
                                      if(this._checkLine(sort_array)==false)
                                           thisLineCanUse = false ;
                                     else{
                                            thisLineCanUse = true;
                                            array[i] = this._checkLine(sort_array);
                                     }

                               }

                      }
                      
                      if(thisLineCanUse)canUseArray.push(array[i]); //存放可用的线数组
                }//for

                return canUseArray;

        }
        ,
        //检测线条有没有间隔
        _checkLine:function(sortarray){
                //从最后往前数,如果间隔大于 条件不成立
            var ispass1  = false;
            var ispass2  = false;
            var ispass3  = false;
            for(var i=0;i<sortarray.length;i++)
            { 
                  if(sortarray[i].nx==1)
                  {
                      ispass1 = true;
                  }  

                  if(sortarray[i].nx==2)
                  {
                       ispass2 = true;
                  }
                  
                  if(sortarray[i].nx==3)  //第四个位置存在值
                  {
                       ispass3 = true;
                  }
            }

                 if(ispass1&&ispass2)
                 {
                           //有索引1 和 2 即(2,3 位置)才能构成中奖线条
                           if(sortarray[sortarray.length-1].nx<=3){
                               return  sortarray;
                           }
                           else
                           {
                                    var newarr = [];
                                    if(ispass3==false) //第四个位置被架空,变化为3个线数组返回
                                    {
                                             for(i=0;i<3;i++)
                                             { 
                                                    newarr.push(sortarray[i]);
                                             }
                                             return newarr;
                                    }
                                    else{
                                      return  sortarray;
                                    }
                                          
                           }
                 }
                else
                {
                          return false;
                }

          
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
 
//序列化单条线
function getLineQueue(line)
{
                var str = "";
                for(var i=0;i<line.length;i++)
                 {
                      str+=line[i].sb+","+line[i].index+":";
                 }
                return str;
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

                                            //console.log('depth '+ depth+": ");
                                           // console.log(temparr);
                                          
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
                                            //console.log('chuli :');
                                            //console.log(chuliarr);
                                            return getAllLine(chuliarr,sarr,depth+1);
}
  
//根据在数组中的位置序列化
function getLineArrayObj(line,num)
{
                 return getLineQueue(line)+"-"+num;
}

function getSameIndexArray(canarr)
{
                var result = [];
                for(var i=0;i<canarr.length;i++)
                {
                       //循环每个可能的组合
                       var currentArr = canarr[i];
                       currentArr = currentArr.sort(function(a,b){a.nx-b.nx}); //nx排序之后
                       var sameNxArr = new Array(currentArr.length);  //备用储存数组
                       var used =[];
                       
                       var beginNum = 1; //从第二个开始 即 索引为1

                                  for(j=beginNum;j<currentArr.length;j++)
                                  {
                                        var sobj = getLineArrayObj(currentArr[j],j);
                                        if(in_array(sobj,used)) continue;
                                       
                                        var sindex = j-beginNum;
                                        sameNxArr[sindex] = new Array();
                                        sameNxArr[sindex].push(currentArr[j]);
                                        used.push(sobj);

                                        for(k=beginNum;k<currentArr.length;k++)
                                        {
                                                  var ssobj = getLineArrayObj(currentArr[k],k);
                                                  if(j!=k&&!in_array(ssobj,used))
                                                    {
                                                            if(currentArr[k].nx==currentArr[j].nx)
                                                             {
                                                                    sameNxArr[sindex] .push(currentArr[k]);
                                                                    used.push(ssobj);
                                                             }
 
                                                     }
                                        }//for k=beginNum

                                  }//for j=beginNum

                                  used = null; //清空

                                   //处理samearr 去掉undefined
                                  var ptemp = [];
                                  for(var p=0;p<sameNxArr.length;p++)
                                   {
                                        if(sameNxArr[p]!=undefined)
                                            ptemp.push(sameNxArr[p]);
                                  }
                                  sameNxArr = ptemp;

                                 result.push({first:currentArr[0],sameNx:sameNxArr});

                }//for
                return result;
}

//rs = getSameIndexArray result
//获得所有可中奖线条集合对应的组合线条数组
function getLastLines(rs){
          
          var allLinesArray = [];
          for(var i=0;i<rs.length;i++)
          {
                var currentObj   = rs[i];
                var firstSymbol  = currentObj.first;
                var sameNxArr  =  currentObj.sameNx;
                var myLines = null;
                var j = 0;

                var total = 1;
                for(j=0;j<sameNxArr.length;j++)
                {
                       total*=sameNxArr[j].length;
                }
                //console.log('can combain line count is :'+total);

                if(total ==1)
                {
                           myLines = [[]];
                           myLines[0].push(firstSymbol);
                           for(j=0;j<sameNxArr.length;j++)
                           {
                                  myLines[0].push(sameNxArr[j][0]);
                           } 
                           //得到最后线数组
                }
                else
                {
                       //多条先组合情况
                       myLines = new Array(total);
                       for(j=0;j<myLines.length;j++)
                            {
                                 myLines[j] = new Array(); 
                                 myLines[j].push(firstSymbol);
                            }
                       //每条线的第一组都存放第一个symbol对象

                      myLines  =  getAllLine(myLines,sameNxArr,0) ;
                }// if(total ==1)

                allLinesArray.push(myLines);
          }//for var i=0
          return allLinesArray;

} 

function getLinesBy(linearr)
{
     var myrs = []; 
     for(var i=0;i<linearr.length;i++)
     {
               var currenCheckLine = linearr[i];   
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

                                       if(u==0 || u==1 || u==2)
                                       {
                                               if(LINES[k][myrp]==0)
                                                biyao = false;
                                       }

                           }// for(u=0;u<currenCheckLine.length;u++)
                          
                          //如果是wild 必须满主 5个的出现
                          var  sbname = findsb(currenCheckLine);
                          if(sbname=='w'&&tj<5)biyao = false;

                           if(tj>=3&&biyao)
                           {
                                         var lineobj = {sb:sbname,line:k,count:tj,realcount:currenCheckLine.length};
                                          if(myrs.length>0)
                                          { 
                                                    var canadd = true;
                                                    for(m=0;m<myrs.length;m++)
                                                     {
                                                                if(myrs[m].sb ==lineobj.sb && myrs[m].line==lineobj.line)
                                                               { 
                                                                                   if(myrs[m].count<lineobj.count) {myrs[m].count = lineobj.count;}

                                                                                    canadd = false;
                                                                                    break;
                                                              }
                                                    }
                                                    if(canadd)
                                                    myrs.push(lineobj);
                                               }
                                              else
                                              {
                                                    myrs.push(lineobj);
                                              }
              
                              }//存储能成为线条的组合

                  }//检查拥有的30条线
                 
         }//for(var i=0;i<linearr.length;i++)

         return myrs; //看到底匹配了几条先

}


var FindLine = function(board)
{
     this.allines = LINES;
     this.board = board;       
}
FindLine.prototype={
      find:function(){
          var self = this;
          var winLines =[];
          var line_symbols = null;
          for(var i=0;i<self.allines.length;i++)
          {
              var line = self.allines[i];
              line_symbols = [];
              for(var j=0;j<5;j++)
              {
                  var pos = self._getPosByNx(j,line);
                  line_symbols.push(self.board[j][pos]);
              }
               
              //对该线条所包涵的symbol进行判断
              var lineObj = this._judgeLine(line_symbols);
              //符合要求放入赢得线条的数组
              if(lineObj!=false){
                 lineObj.line = i;
                 winLines.push(lineObj);
              }
                
          }
          return winLines;
      }
      ,
      _judgeLine:function(myarr)
      {
             
              var checkarr = null; 
              var maxCount = 5;
              checkarr = [];
              for(var k=0;k<maxCount;k++)
              {
                  if(myarr[k]=='w' || this._is_can_push(myarr[k],'w',checkarr))
                  {
                        checkarr.push(myarr[k]);
                  }
                  else if(k==1||k==2)
                  {
                          break;
                  }
              }

              if(checkarr.length<3)
                 return false;
              else
                 return {line:null,sb:this._getSymbol('w',checkarr),count:checkarr.length};
      }
      ,
      _getSymbol:function(wild,sbarr)
      { 
           for(var i=0;i<sbarr.length;i++)
           {
               if(sbarr[i]!=wild) return sbarr[i]; 
           }
           return wild;   
      }
      ,
      _is_can_push:function(v,wild,arr)
      {
          if(arr.length==0) return true;
          
          var wildtj = 0;
          for(var i=0;i<arr.length;i++)
          {
              if(arr[i]==v)return true;

              if(arr[i]==wild)wildtj+=1;
          }

          if(wildtj==arr.length)return true;

          return false;
      }
      ,
      _getPosByNx:function(nx,line)
      {
           var row_index = [0,5,10];
           for(var i=0;i<row_index.length;i++)
           {
               var index = row_index[i]+nx;
               if(line[index]==1)
               {
                  return i;
               }
           }
      }

}



//制作内存中的转轮

 
 

//根据生成的转轮 生成随机一个盘面
/*
 

var myresult = new ResultLine(resultArr);

var okr = myresult.findCanUseSymbolArray();
console.log("find can make line arr:");
console.log(okr);

var canArray = myresult.getCanUseArray(okr);
 console.log('can use line arr:');
 console.log(canArray);

console.log('get combain arr:');
var  samelines = getSameIndexArray(canArray);
console.log(samelines);
var lines_array = getLastLines(samelines);
console.log('last combain arr by one same arr:');
console.log(lines_array);

for(i=0;i<lines_array.length;i++)
{
     
            var lineObj =lines_array[i];
            var okline = getLinesBy(lineObj);
            console.log(i+' combain '+okline.length+" lines can pipei:");
            console.log(okline);
}

 */

 