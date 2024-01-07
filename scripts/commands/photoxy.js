const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
var nayan = "Mohammad Nayan"//type your name

module.exports.config = {
  name: "photoxy",
  version: "1.0.0",
  permssion: 0,
  credits: "Mohammad Nayan",
  description: "",
  category: "edit",
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
      return api.sendMessage(`🔰Use ${global.config.PREFIX}photoxy [no.] [text]\n🔰Example:${global.config.PREFIX}photoxy 1 ${nayan}\n\n🔥Total Edit limit 30...`, event.threadID);
    } else {
      const msg = info.split(" ");
      const num = msg[0].trim();
      const name = msg[1].trim();


      api.sendMessage(`Processing your name edit, please wait...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 5000));

      const img = `https://textproapi--api-nayan.repl.co/api/photooxy/${num}?text=${name}`;

      try {
        const response = await axios.get(img, { responseType: 'arraybuffer' });
        const image = await jimp.read(response.data);
        const outputPath = `./photoxy_${uid}.png`;
        await image.writeAsync(outputPath);

        const attachment = fs.createReadStream(outputPath);
        api.sendMessage({ 
          body: `❐ THIS IS YOUR NAME EDIT ✌️\n\n___________________________________\n\n❐ This Bot Name : ${global.config.BOTNAME} 🤖\n❐ This Bot Owner : ${nayan}😘\n❐ Your Input Name : ${name}\n\n___________________________________\n⚡  Photoxy Api  👉M0H4MM4D N4Y4N  🔥`,
          attachment
        }, event.threadID, () => fs.unlinkSync(outputPath));
      } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while generating the Nane edit.", event.threadID);
      }
    }
  };
