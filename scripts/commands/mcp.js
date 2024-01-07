const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports.config = {
  name: "mcp",
  version: "1.0.0",
  permssion: 0,
  credits: "Mohammad Nayan",
  description: "female cover",
  category: "fbcover",
  Usage: "fcp or /fcp @tag",
  prefix: true,
    cooldowns: 2,
};

  module.exports.run = async function({ api, event, args, Users, Threads, Currencies}) {
    const uid = event.senderID;
    const info = args.join(" ");
    var id = Object.keys(event.mentions)[0] || event.senderID;
  var nam = await Users.getNameUser(id);
  var ThreadInfo = await api.getThreadInfo(event.threadID);
  if (!id) {
      return api.sendMessage(" ", event.threadID);
    } else {

      api.sendMessage(`Processing your cover, please wait...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 5000));

      const img = `https://main-server.nayan-api.repl.co/nayan/mcp?uid=${id}`;

      try {
        const response = await axios.get(img, { responseType: 'arraybuffer' });
        const image = await jimp.read(response.data);
        const outputPath = `./mcp_${uid}.png`;
        await image.writeAsync(outputPath);
        
        const attachment = fs.createReadStream(outputPath);
        api.sendMessage({ 
          body: `HERE YOUR COVER PHOTO😙`,
          attachment
        }, event.threadID, () => fs.unlinkSync(outputPath));
      } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while generating the FB cover.", event.threadID);
      }
    }
  };
