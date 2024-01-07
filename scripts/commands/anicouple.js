module.exports.config = {
    name: "anicouple",
    version: "1.0.5",
    permission: 0,
    prefix: true,
    credits: "Nayan",
    description: "Anime couple photo",
    category: "prefix",
    cooldowns: 2
};
const fs = require("fs");
const axios = require("axios");
module.exports.run = async function({ 
  api, 
  event, 
  args
}) {
  try {
      const cdp1 = __dirname + "/cache/anicouple1_" + event.senderID + ".png";
      const cdp2 = __dirname + "/cache/anicouple2_" + event.senderID + ".png";
      const { nayan } = global.apiNayan;
      const coupleLink = await axios.get(`https://api.nayan-project.repl.co/images/ppcouple`);
      const responsecdp1 = coupleLink.data.url.male;
      const responsecdp2 = coupleLink.data.url.female;
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      const getcdp1 = (await axios.get(responsecdp1, {
          responseType: 'arraybuffer'
      })).data;
      fs.writeFileSync(cdp1, Buffer.from(getcdp1, 'utf-8'));
      const getcdp2 = (await axios.get(responsecdp2, {
          responseType: 'arraybuffer'
      })).data;
      fs.writeFileSync(cdp2, Buffer.from(getcdp2, 'utf-8'));
      api.sendMessage({
          attachment: [
              fs.createReadStream(cdp1),
              fs.createReadStream(cdp2)
          ]
      }, event.threadID, (err) => {
          fs.unlinkSync(cdp1);
          fs.unlinkSync(cdp2);
          if (err) return api.sendMessage(`Failed to fetch anime couple picture. Try again later.`, event.threadID, event.messageID);
      }, event.messageID);
  } catch (err) {
      api.sendMessage(`Error. Try again later.`, event.threadID, () => api.setMessageReaction("❌", event.messageID, (err) => {}, true), event.messageID);
  }
}
