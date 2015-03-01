//{label:'c1',framename:"#c4_f01.png",rect:this._symbolRect},args
/*
var args = [
                                                  {fname:'c4_f0@.png',rank:[1,7],frate:0.1},
                                                  {fname:'c4_f0@.png',rank:[1,2],frate:0.1}];
*/
var SymbolFrame = {wild:'wild_f0',C1:'wolf_f0',C2:'start_f0',C3:'money_f0',C4:'gun_f0',C5:'bult_f0',C6:'beer_f0',C7:'xr_f0', C8:'rope_f0',C9:'freespin_f0'}

var SymbolData = [
{type:{label:'wild',framename:"#"+SymbolFrame.wild+"1.png"},
args:[{fname:SymbolFrame.wild+"@.png",rank:[1,7],frate:0.1},
          {fname:SymbolFrame.wild+"@.png",rank:[1,2],frate:0.1}],score:[1000]},

{type:{label:'wolf',framename:"#"+SymbolFrame.C1+"1.png"},
args:[{fname:SymbolFrame.C1+"@.png",rank:[1,7],frate:0.1},
          {fname:SymbolFrame.C1+"@.png",rank:[1,2],frate:0.1}],score:[700,250,70]},

{type:{label:'start',framename:"#"+SymbolFrame.C2+"1.png"},
args:[{fname:SymbolFrame.C2+"@.png",rank:[1,7],frate:0.1},
          {fname:SymbolFrame.C2+"@.png",rank:[1,2],frate:0.1}],score:[500,100,40]},

{type:{label:'money',framename:"#"+SymbolFrame.C3+"1.png"},
args:[{fname:SymbolFrame.C3+"@.png",rank:[1,7],frate:0.1},
          {fname:SymbolFrame.C3+"@.png",rank:[1,2],frate:0.1}],score:[300,75,30]},

{type:{label:'gun',framename:"#"+SymbolFrame.C4+"1.png"},
args:[{fname:SymbolFrame.C4+"@.png",rank:[1,7],frate:0.1},
          {fname:SymbolFrame.C4+"@.png",rank:[1,2],frate:0.1}],score:[250,50,20]},

{type:{label:'bult',framename:"#"+SymbolFrame.C5+"1.png"},
args:[{fname:SymbolFrame.C5+"@.png",rank:[1,7],frate:0.1},
          {fname:SymbolFrame.C5+"@.png",rank:[1,2],frate:0.1}],score:[200,25,15]},

{type:{label:'beer',framename:"#"+SymbolFrame.C6+"1.png"},
args:[{fname:SymbolFrame.C6+"@.png",rank:[1,7],frate:0.1},
          {fname:SymbolFrame.C6+"@.png",rank:[1,2],frate:0.1}],score:[125,15,5]},

{type:{label:'xr',framename:"#"+SymbolFrame.C7+"1.png"},
args:[{fname:SymbolFrame.C7+"@.png",rank:[1,7],frate:0.1},
          {fname:SymbolFrame.C7+"@.png",rank:[1,2],frate:0.1}],score:[150,20,10]}, //litefree

{type:{label:'rope',framename:"#"+SymbolFrame.C8+"1.png"},
args:[{fname:SymbolFrame.C8+"@.png",rank:[1,7],frate:0.1},
          {fname:SymbolFrame.C8+"@.png",rank:[1,2],frate:0.1}],score:[100,10,5]},

{type:{label:'freespin',framename:"#"+SymbolFrame.C9+"1.png"},
args:[{fname:SymbolFrame.C9+"@.png",rank:[1,7],frate:0.1},
          {fname:SymbolFrame.C9+"@.png",rank:[1,2],frate:0.1}],score:[0]}
];

function getSymbolDataByLabel(lb)
{
                 for(var i=0;i<SymbolData.length;i++)
                 {
                        if(SymbolData[i].type.label==lb)
                        {
                             return SymbolData[i];
                        }
                 }
                 cc.log('this '+lb+' is not exists!');
                 return null;
}