const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports.config = {
  name: "dark",
  version: "1.0.0",
  permssion: 0,
  credits: "Mohammad Nayan",
  description: "",
  category: "Dark photo",
  prefix: true,
    cooldowns: 2,
};

  module.exports.run = async function({ api, event, args, Users, Threads, Currencies}) {
    const info = args.join(" ");
    if (args.length !== 1) {
      api.sendMessage(`Invalid number of arguments. Usage: Replay 1 photo then type ${global.config.PREFIX}dark [no.]`, event.threadID);
      return;
    }
    const uid = event.senderID;

    var n = global.nayan_api
  var ThreadInfo = await api.getThreadInfo(event.threadID);
    const linkanh = event.messageReply.attachments[0].url;
     if (!linkanh) {
       return api.sendMessage('[⚜️]➜ Please give feedback or enter the image link', event.threadID, event.messageID);
     }
    else {
      const count = args[0];
      const allPromise = (await Promise.all(event.messageReply.attachments.map(item => axios.get(`https://api.nayan-project.repl.co/imgur?link=${encodeURIComponent(item.url)}`)))).map(item => item.data.uploaded.image);

      api.sendMessage(`Your photo is being blacked out, please wait...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 5000));

      const img = `https://api.nayan-project.repl.co/nayan/dark?url=${allPromise.join('"\n"')}&no=${count}`

      try {
        const response = await axios.get(img, { responseType: 'arraybuffer' });
        const image = await jimp.read(response.data);
        const outputPath = `./dark_${uid}.png`;
        await image.writeAsync(outputPath);

        const attachment = fs.createReadStream(outputPath);
        api.sendMessage({ 
          body: `Here's your photo😘`,
          attachment
        }, event.threadID, () => fs.unlinkSync(outputPath));
      } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while generating the Dark Photo.", event.threadID);
      }
    }
  };
