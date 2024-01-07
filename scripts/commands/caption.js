module.exports.config = {
  name: "caption",
  version: "2.0.0",
  permission: 0,
  credits: "Nayan",
  description: "Download video from facebook",
  prefix: true,
  category: "admin",
  usages: "link",
  cooldowns: 5,
  dependencies: {
        'image-downloader': '',
  }
};
module.exports.run = async function({ api, event, args }) {
  
  api.setMessageReaction("😘", event.messageID, (err) => {
  }, true);
  api.sendTypingIndicator(event.threadID, true);
  
  const { messageID, threadID } = event;
  const { nayan } = global.apiNayan;
  const fs = require("fs");
  const axios = require("axios");
  const request = require("request");
  const res = await axios.get(`https://raw.githubusercontent.com/MR-NAYAN-404/ERROR/main/error.json`);
  var data = res.data.data;
  let error = `${res.data.error}`;
  const prompt = args.join(" ");
  if (!args[0]) return api.sendMessage("[ ! ] Input link.", threadID, messageID);

  const content = args.join(" ");
  if (!args[1]) api.sendMessage(`Colleacting 3 Caption For Your Photo\n\nPlease W8😙 `, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 20000));

 try {
  const res = await axios.get(`https://main-server.nayan-api.repl.co/nayan/caption?url=${content}`);
   
        const { cp1, cp2, cp3 } = res.data;
   
     
  //file.on('finish', () => {
    
    setTimeout(function() {
      
      return api.sendMessage({
        body: `====[ 𝗛𝗔𝗥𝗘 𝗬𝗢𝗨𝗥 𝗣𝗛𝗢𝗧𝗢 𝗖𝗔𝗣𝗧𝗜𝗢𝗡 ]====\n━━━━━━━━━━━━━━\n\n1️⃣ 𝗖𝗔𝗣𝗧𝗜𝗢𝗡: ${cp1}\n\n2️⃣ 𝗖𝗔𝗣𝗧𝗜𝗢𝗡: ${cp2}\n\n3️⃣ 𝗖𝗔𝗣𝗧𝗜𝗢𝗡: ${cp3}`,
        //attachment: fs.createReadStream(__dirname + '/cache/tik.mp4')
      }, threadID, messageID)
    }, 5000)
  //})
    } catch (err) {
    api.sendMessage(`${error}`, event.threadID, event.messageID);  
   }
};