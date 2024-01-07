module.exports.config = {
  name: "join",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "Nayan",
  description: "join and welcome notification",
  dependencies: {
    "jimp": ""
  }
};
module.exports.run = async function({ api, event }) {
  const axios = require("axios")
const vid = (
    await axios.get(
      'https://i.postimg.cc/SNQXkB0y/lv-0-20231018174834.gif',
      { responseType: 'stream' }
    )
  ).data;

  const request = require("request");
  const { threadID } = event;
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`[ ${global.config.PREFIX} ] • ➠${(!global.config.BOTNAME) ? "bot" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    const fs = require("fs");
    return api.sendMessage("চলে এসেছি আমি পিচ্চি নয়ন তোমাদের মাঝে🤭", event.threadID, () => api.sendMessage({body:`${global.config.BOTNAME} CONNECTED«\n\nAssalamualaykum☘️
<------------------------------>  
BOT CONNECTED SUCCESFUL !!! 

APPROVAL ALLOW IN THIS GROUP!!!
<------------------------------>\n\nTO VIEW ANY COMMAND Use👉${global.config.PREFIX}help\nSee command👉 ${global.config.PREFIX}command
\n\EXAMPLE:👇\n${global.config.PREFIX}admin (information)\n${global.config.PREFIX}islam (video)\n${global.config.PREFIX}tik (link)\n${global.config.PREFIX}fbvideo (link)\n${global.config.PREFIX}photoxy (no.) (name)\n${global.config.PREFIX}textpro (no.) (name)
<------------------------------>
AND FOR ANY COMPLAINTS OR CONTACT BOT OPERATOR 

DEVELOPER :Mohammad Nayan 

🟣Facebook Account Link: 

https://www.facebook.com/www.xnxx.com169

🔵WHATSAPP NUMBER: wa.me/+8801615298449

🟢SUPPORT EMAIL: www.mdmnnm2004@gmail.com`, attachment: vid
    } ,threadID));
  }
  else {
    try {
    const request = require("request");
      const fs = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);

      const threadData = global.data.threadData.get(parseInt(threadID)) || {};

      var mentions = [], nameArray = [], memLength = [], i = 0;

    let addedParticipants1 = event.logMessageData.addedParticipants;
        for (let newParticipant of addedParticipants1) {
   let userID = newParticipant.userFbId
api.getUserInfo(parseInt(userID), (err, data) => {
      if(err){ return console.log(err)}
     var obj = Object.keys(data);
    var userName = data[obj].name.replace("@", "");     	if (userID !== api.getCurrentUserID()) {  

        nameArray.push(userName);
        mentions.push({ tag: userName, id: userID, fromIndex: 0 });

        memLength.push(participantIDs.length - i++);
memLength.sort((a, b) => a - b);

      (typeof threadData.customJoin == "undefined") ? msg = "Hello {uName}\nWelcome to {threadName}\nyou're the {soThanhVien}th member on this group please enjoy" : msg = threadData.customJoin;
      msg = msg
      .replace(/\{uName}/g, nameArray.join(', '))
      .replace(/\{type}/g, (memLength.length > 1) ?  'you' : 'Friend')
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName);			

      var link = [
"https://drive.google.com/uc?id=1ceZl-f5X0lQcXtJzX3TKkvDxeWZawmco"
      ];
        var callback = () => api.sendMessage({ body: msg, attachment: fs.createReadStream(__dirname + "/cache/Nayan.jpg"), mentions }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/Nayan.jpg"));
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/Nayan.jpg")).on("close", () => callback());       
            }
})
        }
    }catch (err) {
            return console.log("ERROR: "+err);
    }
  }
}