module.exports.config = {
    name: "ring",
    version: "1.0.5",
    permission: 0,
    prefix: true,
    credits: "Nayan",
    description: "Ringtone Down",
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
      const ring1 = __dirname + "/cache/ring1_" + event.senderID + ".mp3";
    const q = args.join(" ");
      const { nayan } = global.apiNayan;
      const res = await axios.get(`https://api.nayan-project.repl.co/ringtone?name=${q}`);
      const link = res.data.link.url;
      const title = res.data.link.title;
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      const get1 = (await axios.get(link, {
          responseType: 'arraybuffer'
      })).data;
      fs.writeFileSync(ring1, Buffer.from(get1, 'utf-8'));
      api.sendMessage({
          body: `☎️Ringtone Name: ` +title,
          attachment: [
              fs.createReadStream(ring1)
          ]
      }, event.threadID, (err) => {
          fs.unlinkSync(ring1);
          if (err) return api.sendMessage(`Failed to fetch Ringtone. Try again later.`, event.threadID, event.messageID);
      }, event.messageID);
  } catch (err) {
      api.sendMessage(`Error. Try again later.`, event.threadID, () => api.setMessageReaction("❌", event.messageID, (err) => {}, true), event.messageID);
  }
}
