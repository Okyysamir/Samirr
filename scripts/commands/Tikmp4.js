module.exports.config = {
  name: "tikmp3",
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
  
  api.setMessageReaction("✅", event.messageID, (err) => {
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
  if (!args[1]) api.sendMessage(`𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐈𝐍𝐆 𝗔𝗨𝗗𝗜𝗢 𝐅𝐎𝐑 𝐘𝐎𝐔\n\n𝐏𝐋𝐄𝐀𝐒𝐄 𝐖𝟖...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 10000));

 try {
  const res = await axios.get(`https://main-server.nayan-api.repl.co/tiktok/downloadvideo?url=${content}`);

   var file = fs.createWriteStream(__dirname + '/cache/tik.mp3');
   
        const { music, music_info } = res.data.data;
        const rqs = request(encodeURI(`${music}`));
   
    

  rqs.pipe(file);  
  file.on('finish', () => {
    
    setTimeout(function() {
      
      return api.sendMessage({
        body: `==[ 𝐌𝐔𝐒𝐈𝐂 𝐓𝐈𝐊𝐓𝐎𝐊 ]====\n━━━━━━━━━━━━━━\n\n💬 𝗧𝗶𝘁𝗹𝗲 𝗮𝘂𝗱𝗶𝗼: ${music_info.title}\n🗂 𝗔𝗹𝗯𝘂𝗺: ${music_info.album}\n✒ 𝐍𝐈𝐂𝐊𝐍𝐀𝐍𝐄: ${music_info.author}\n⏱ 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠 𝐓𝐢𝐦𝐞: ${music_info.duration} second`,
        attachment: fs.createReadStream(__dirname + '/cache/tik.mp3')
      }, threadID, messageID)
    }, 5000)
  })
    } catch (err) {
    api.sendMessage(`${error}`, event.threadID, event.messageID);  
   }
};