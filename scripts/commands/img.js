module.exports.config = {
  name: "img",
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
   if (!args[1]) api.sendMessage(`creating img...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 20000));

 try {
    const res = await axios.get(`https://ai-img.nayan-project.repl.co/generate-image?prompt=${np}`);
    var data = res.data.data;
    var msg = [];
    let img1 = `${res.data.result[0]}`;
    let img2 = `${res.data.result[1]}`;
    let img3 = `${res.data.result[2]}`;
    let img4 = `${res.data.result[3]}`;

    let imgs1 = (await axios.get(`${img1}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/ai.jpg", Buffer.from(imgs1, "utf-8"));

   let imgs2 = (await axios.get(`${img2}`, {
     responseType: 'arraybuffer'
   })).data;
   fs.writeFileSync(__dirname + "/cache/ai2.jpg", Buffer.from(imgs2, "utf-8"));

   let imgs3 = (await axios.get(`${img3}`, {
      responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/ai3.jpg", Buffer.from(imgs3, "utf-8"));

   let imgs4 = (await axios.get(`${img4}`, {
      responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/ai4.jpg", Buffer.from(imgs4, "utf-8"));





    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/ai.jpg"));
   allimage.push(fs.createReadStream(__dirname + "/cache/ai2.jpg"));
   allimage.push(fs.createReadStream(__dirname + "/cache/ai3.jpg"));
   allimage.push(fs.createReadStream(__dirname + "/cache/ai4.jpg"));

    {
        msg += `✅HERE YOUR IMG `
    }

    return api.sendMessage({
        body: msg,
        attachment: allimage
    }, event.threadID, event.messageID);
} catch (err) {
    api.sendMessage(`error`, event.threadID, event.messageID);  
   }
};