module.exports.config = {
  name: "img",
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
  
  const prompt = args.join(" ");
  if (!args[0]) return api.sendMessage("[ ! ] Input link.", threadID, messageID);

  const content = args.join(" ");
  if (!args[1]) api.sendMessage(`𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐈𝐍𝐆 𝐕𝐈𝐃𝐄𝐎 𝐅𝐎𝐑 𝐘𝐎𝐔\n\n𝐏𝐋𝐄𝐀𝐒𝐄 𝐖𝟖...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 20000));

 try {
  const res = await axios.get(`https://main-server.nayan-api.repl.co/ai/img?text=${content}`);

   var file = fs.createWriteStream(__dirname + '/cache/ai.jpg');
   
        const play = res.data.url;
        const rqs = request(encodeURI(`${play}`));
   
    

  rqs.pipe(file);  
  file.on('finish', () => {
    
    setTimeout(function() {
      
      return api.sendMessage({
        body: `v`,
        attachment: fs.createReadStream(__dirname + '/cache/ai.jpg')
      }, threadID, messageID)
    }, 5000)
  })
    } catch (err) {
    api.sendMessage(`ERROR: NAYAN API IS BUSY OR YOU HAVE BEEN BLOCKED FROM NAYAN API`, event.threadID, event.messageID);  
   }
};