module.exports.config = {
  name: "tik",
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
  const n = global.nayan_api
  const fs = require("fs");
  const axios = require("axios");
  const request = require("request");
  const res = await axios.get(`https://raw.githubusercontent.com/MR-NAYAN-404/ERROR/main/error.json`);
  var data = res.data.data;
  let error = `${res.data.error}`;
  const prompt = args.join(" ");
  if (!args[0]) return api.sendMessage("[ ! ] Input link.", threadID, messageID);

  const content = args.join(" ");
  if (!args[1]) api.sendMessage(`𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐈𝐍𝐆 𝐕𝐈𝐃𝐄𝐎 𝐅𝐎𝐑 𝐘𝐎𝐔\n\n𝐏𝐋𝐄𝐀𝐒𝐄 𝐖𝟖...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 20000));

 try {
  const res = await axios.get(`https://api.nayan-project.repl.co/tiktok/downloadvideo?url=${content}`);

   var file = fs.createWriteStream(__dirname + '/cache/tik.mp4');
   
        const { play, author, digg_count, comment_count, play_count, share_count, download_count, title, duration, region } = res.data.data;
        const rqs = request(encodeURI(`${play}`));
   
    

  rqs.pipe(file);  
  file.on('finish', () => {
    
    setTimeout(function() {
      
      return api.sendMessage({
        body: `====[ 𝐓𝐈𝐊𝐓𝐎𝐊 𝐕𝐈𝐃𝐄𝐎 ]====\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🌎 𝐂𝐎𝐔𝐍𝐓𝐑𝐘: ${region}\n📱 𝐍𝐈𝐂𝐊𝐍𝐀𝐍𝐄: ${author.nickname}\n🎐 𝐔𝐒𝐄𝐑 𝐍𝐀𝐌𝐄: ${author.unique_id}\n👁 𝐕𝐈𝐄𝐖𝐒: ${digg_count}\n💭 𝐂𝐎𝐌𝐌𝐄𝐍𝐓: ${comment_count}\n👀 𝐏𝐋𝐀𝐘: ${play_count}\n🔗 𝐒𝐇𝐀𝐑𝐄: ${share_count}\n📥 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃: ${download_count}\n⏱ 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠 𝐓𝐢𝐦𝐞: ${duration} second\n💬 𝗧𝗶𝘁𝗹𝗲: ${title}`,
        attachment: fs.createReadStream(__dirname + '/cache/tik.mp4')
      }, threadID, messageID)
    }, 5000)
  })
    } catch (err) {
    api.sendMessage(`${error}`, event.threadID, event.messageID);  
   }
};