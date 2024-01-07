module.exports.config = {
  name: "movie",
  version: "2.0.0",
  permission: 2,
  credits: "Nayan",
  description: "movie database",
  prefix: true,
  category: "user",
  usages: "movie name",
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
  if (!args[0]) return api.sendMessage("[ ! ] Input Movie Name.", threadID, messageID);

  const content = args.join(" ");
  if (!args[1]) api.sendMessage(`Collecting ${content} Database `, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 20000));

 try {
  const res = await axios.get(`https://main-server.nayan-api.repl.co/nayan/movie?url=${content}`);

   var file = fs.createWriteStream(__dirname + '/cache/tik.jpg');
   
        const { title, img, overview, lang, rl } = res.data;
  
        const rqs = request(encodeURI(`${img}`));
   

   
  rqs.pipe(file);  
  file.on('finish', () => {
    setTimeout(function() {
      
      return api.sendMessage({
        body: `====[ ${title} 𝗠𝗢𝗩𝗜𝗘 𝗗𝗔𝗧𝗔𝗕𝗔𝗦𝗘 ]====\n\n🖼𝗠𝗢𝗩𝗜𝗘 𝗡𝗔𝗠𝗘: ${title}\n🗓𝗥𝗘𝗟𝗘𝗔𝗦𝗘 𝗬𝗘𝗔𝗥: ${rl}\n👩‍❤️‍👨𝗢𝗥𝗜𝗚𝗜𝗡𝗔𝗟 𝗟𝗔𝗡𝗚𝗨𝗔𝗚𝗘: ${lang}\n\n⏏️𝗢𝗩𝗘𝗥𝗩𝗜𝗘𝗪: ${overview}`,
        attachment: fs.createReadStream(__dirname + '/cache/tik.jpg')
      }, threadID, messageID)
    }, 5000)
  })
    } catch (err) {
    api.sendMessage(`${error}`, event.threadID, event.messageID);  
   }
};