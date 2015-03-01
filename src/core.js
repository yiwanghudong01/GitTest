//TEST etst002   OKKO
//005 test
//18:48 2015/3/1


//18:50 2015/3/1  测试，不是乱码

//20:42 2015/3/1

//20:44 2015/3/1 代码加入测试
var  CoreReels = function(count,len,symbols){
       this._reelsCount =   count;
       this._reelLength =   len;
       this._symbols      =  symbols;
       this._symbolsCountQueue = null;
       TEst001=100;
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
 

var FindLine = function(board,symbols)
{
     this.allines = LINES;
     this.board = board; 
     this.noSymbols = null;
     if(symbols!=undefined)
     this.noSymbols =  symbols;
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
                  else if(k>0)
                  {
                          break;
                  }
              }

              if(checkarr.length<3)
                 return false;
              else{
                          var symbols = this._getSymbol('w',checkarr);
                          //如果有黑名单，并且标志在黑名单里面直接跳过
                          if(this.noSymbols!=null&&in_array(symbols,this.noSymbols)){ 

                                  return false;
                          }

                          return {line:null,sb:symbols,count:checkarr.length};

              }
               
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

var SpecialEventMaker = function(board){
       this.board = board;
}
SpecialEventMaker.prototype = {
        make:function(){
          if(this._check()==true)
          {
                  var shunxus = [4,3,2,1];
                  var allarr = [];
                  var  ft = 1;
                  for(var i=0;i<shunxus.length;i++)
                  {
                         var currentBoard =  this.board[shunxus[i]];
                         var currentarr =new Array();
                         for(var j=0;j<currentBoard.length;j++)
                         {
                                if(currentBoard[j]=='w')
                                {
                                       currentarr.push(2-j);
                                }
                         }
                         allarr.push(currentarr);
                  }
                  //按拥有wild 数量进行排列
            
                  ft =this.getFiretimes(allarr);
                  if(ft==0)ft = 1;


                  var data = {shunxu:shunxus,firetimes:ft,shooters:allarr};
                  return data ;
                  
          }
          else
          {
                 //该盘面无法生成特殊枪击事件
                 return false;
          }
        }
        ,
        getFiretimes:function(arr)
        {
                var max = 0;
                for(var i=0;i<arr.length;i++)
                {
                       if(arr[i].length>max)
                       {
                             max = arr[i].length;
                       }
                }
                return max;
        }
        ,
        _check:function(){
              var firstCol = this.board[0];
              for(var i=0;i<firstCol.length-1;i++)
              {
                      if(firstCol[i]!=firstCol[i+1])
                      {
                            return false;
                      }
              }
              return true; 
        }

}


function FreeSpinCheck(board)
{
                var freeSpinSymbol = SymbolData.length-1;
                var minNeed = 3;
                var arr = [];
                for(var i=0;i<board.length;i++)
                {
                      for(var j=0;j<board[i].length;j++)
                      {
                              if(board[i][j]==freeSpinSymbol)
                              {
                                    arr.push({col:i,row:j});
                              }
                      }
                }

               if(arr.length>=minNeed)
                return arr;
              else 
                return false;
}