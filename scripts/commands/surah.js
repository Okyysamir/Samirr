module.exports.config = {
  name: "surah",
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
    const n = global.nayan_api;
    const { messageID, threadID } = event;
  if (!args[0]) return api.sendMessage("[ ! ] Input link.", threadID, messageID);
    
    const { NAYAN } = global.apiNayan;
    let np = args.join(" ");

 try {
    const res = await axios.get(`https://quran-api.santrikoding.com/api/surah/${np}`);
    var data = res.data.data;
    var msg = [];
    let ring1 = `${res.data.audio}`;
    let name = `${res.data.nama_latin}`;
    let ayat = `${res.data.jumlah_ayat}`;

    let a = (await axios.get(`${ring1}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/ring1.mp3", Buffer.from(a, "utf-8"));
    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/ring1.mp3"));
   
    {
        msg += `🕋NAME: ${name}\n🕋AYAT: ${ayat}`
    }

    return api.sendMessage({
        body: msg,
        attachment: allimage
    }, event.threadID, event.messageID);
} catch (err) {
    api.sendMessage(`error`, event.threadID, event.messageID);  
   }
};