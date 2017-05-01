'use strict'

const fs=require('fs');
const readline=require('readline');
const rs=fs.ReadStream('./popu-pref.csv');
const rl=readline.createInterface({'input':rs,'output':{}});
var map=new Map();
rl.on('line',(str)=>{
    const inputDate=str.split(',');
    const year=parseInt(inputDate[0]);
    const prefecture=inputDate[2];
    const popu =parseInt(inputDate[7]);

    if(year===2010||year ===2015){
        let value=map.get(prefecture);
        if(!value){
            value={
                p10:0,
                p15:0,
                change:0
            };
        }
        if(year===2010){
            value.p10+=popu;
        }
        else if(year===2015){
            value.p15+=popu;
        }

        map.set(prefecture,value);
        // console.log(value.p10);
    }
});

rl.resume();

rl.on('close',()=>{
    // for(var [key,value] of map){
    //     console.log(value.p10);
    // }
            for (let pair of map) {
            const value = pair[1];
            value.change = value.p15 / value.p10;
        }
        const rank=Array.from(map).sort((p1,p2)=>{
            return p2[1].change-p1[1].change;
        });
        const rankstr=rank.map((p,i)=>{
            return i+1+'位\t'+p[0]+':'+p[1].p10+'=>'+p[1].p15+'変化率'+p[1].change;
        });
        console.log(rankstr);
});