module.exports.config={name:"update",eventType:["log:unsubscribe"],version:"beta",credits:"Nayan",description:"automatically delete data time join user when out"};const fs=require("fs");var path=__dirname+"/../commands/system/timejoin.json";module.exports.run=async function({event:e}){const logger = require("../../Nayan/catalogs/Nayanc.js");const{threadID:t,logMessageData:l}=e, {writeFileSync:w,readFileSync:r}=fs,{stringify:s,parse:p}=JSON;var v=l.leftParticipantFbId;let a=p(r(path));a[v+t] = "";w(path,s(a,null,2));logger('updated database successfully\n',"database")}

/*
var volk = event.logMessageData.leftParticipantFbId;
let ark = JSON.parse(readFileSync(path));
ark[volk + event.threadID] = "";
writeFileSync(path, JSON.stringify(ark, null, 2))

*/