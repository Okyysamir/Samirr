const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports.config = {
  name: "gfx",
  version: "1.0.0",
  permssion: 0,
  credits: "Mohammad Nayan",
  description: "",
  category: "gfx",
  prefix: true,
    cooldowns: 2,
};

  module.exports.run = async function({ api, event, args, Users, Threads, Currencies}) {
    const uid = event.senderID;
    const info = args.join(" ");
    var n = global.nayan_api
    var id = Object.keys(event.mentions)[0] || event.senderID;
  var nam = await Users.getNameUser(id);
  var ThreadInfo = await api.getThreadInfo(event.threadID);
    if (!info) {
      return api.sendMessage(`Please enter in the format:\n${global.config.PREFIX}gfx name - number(1-3)`, event.threadID);
    } else {
      const msg = info.split("-");
      const name = msg[0].trim();
      const am = msg[1].trim();

      api.sendMessage(`Processing your name edit , please wait...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 5000));

      const img = `https://api.nayan-project.repl.co/nayan/gfx${am}?text=${name}`

      try {
        const response = await axios.get(img, { responseType: 'arraybuffer' });
        const image = await jimp.read(response.data);
        const outputPath = `./fbcover_${uid}.png`;
        await image.writeAsync(outputPath);

        const attachment = fs.createReadStream(outputPath);
        api.sendMessage({ 
          body: ``,
          attachment
        }, event.threadID, () => fs.unlinkSync(outputPath));
      } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while generating the Name Edit.", event.threadID);
      }
    }
  };
