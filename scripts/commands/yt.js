module.exports.config = {
  name: "yt",
  version: "0.0.2",
  permission: 0,
  prefix: true,
  credits: "Nayan",
  description: "fb video",
  category: "user",
  usages: "",
    cooldowns: 5,
};





module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
    
    const { messageID, threadID } = event;
  if (!args[0]) return api.sendMessage("[ ! ] Input link.", threadID, messageID);

    const { NAYAN } = global.apiNayan;
    let np = args.join(" ");
   if (!args[1]) api.sendMessage(`𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐈𝐍𝐆 𝐕𝐈𝐃𝐄𝐎 𝐅𝐎𝐑 𝐘𝐎𝐔\n\n𝐏𝐋𝐄𝐀𝐒𝐄 𝐖𝟖...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 20000));

 try {
    const res = await axios.get(`https://api.nayan-project.repl.co/nayan/ytv2?url=${np}`);
    var data = res.data.data;
    var msg = [];
    let img1 = `${res.data.hd}`;
    let time = `${res.data.title}`;

    let imgs1 = (await axios.get(`${img1}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/fbvideo.mp4", Buffer.from(imgs1, "utf-8"));
    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/fbvideo.mp4"));

    {
        msg += `✅Downloaded Successfully\n🔰TITLE : ${time}`
    }

    return api.sendMessage({
        body: msg,
        attachment: allimage
    }, event.threadID, event.messageID);
} catch (err) {
    api.sendMessage(`error`, event.threadID, event.messageID);  
   }
};