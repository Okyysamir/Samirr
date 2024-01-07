module.exports.config = {
  name: "insta",
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
  const fs = require("fs");
  const axios = require("axios");
  const request = require("request");
  const res = await axios.get(`https://raw.githubusercontent.com/MR-NAYAN-404/ERROR/main/error.json`);
  var data = res.data.data;
  let error = `${res.data.error}`;
  const prompt = args.join(" ");
  if (!args[0]) return api.sendMessage("[ ! ] Input link.", threadID, messageID);

  const content = args.join(" ");
  if (!args[1]) api.sendMessage(`𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐈𝐍𝐆 𝗩𝗶𝗱𝗲𝗼 𝐅𝐎𝐑 𝐘𝐎𝐔\n\n𝐏𝐋𝐄𝐀𝐒𝐄 𝐖𝟖...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 20000));

 try { 
  let data = await axios.get(`https://api.nayan-project.repl.co/nayan/insdown?url==${content}`);
    
  var file = fs.createWriteStream(__dirname + '/cache/insta.mp4');
   
  const { link, type } = data.data.data.medias[0];
   const n = data.data.data.full_name;
   const u = data.data.data.username;
   const c = data.data.data.comment_count;
   const l = data.data.data.like_count;
   const t = data.data.data.caption;
  const rqs = request(encodeURI(`${link}`));

  rqs.pipe(file);  
  file.on('finish', () => {
    
    setTimeout(function() {
      
      return api.sendMessage({
        body: `====[ 𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠 𝐕𝐈𝐃𝐄𝐎 ]====\n━━━━━━━━━━━━━━━━━━━━━\n\n📱 𝐍𝐈𝐂𝐊𝐍𝐀𝐍𝐄: ${n}\n🎐 𝐔𝐒𝐄𝐑 𝐍𝐀𝐌𝐄: @${u}\n💭 𝐂𝐎𝐌𝐌𝐄𝐍𝐓: ${c}\n✔️𝗟𝗜𝗞𝗘: ${l}`,
        attachment: fs.createReadStream(__dirname + '/cache/insta.mp4')
      }, threadID, messageID)
    }, 5000)
  })
    } catch (err) {
    api.sendMessage(`${error}`, event.threadID, event.messageID);  
   }
};