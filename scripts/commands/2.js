module.exports.config = {
  name: "bing",
  version: "0.0.2",
  permission: 0,
  prefix: true,
  credits: "Nayan",
  description: "",
  category: "user",
  usages: "",
    cooldowns: 5,
};





module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
    
    const { messageID, threadID } = event;
  if (!args[0]) return api.sendMessage("[ ! ] Input text.", threadID, messageID);

    let np = args.join(" ");
   if (!args.join(" ")) api.sendMessage(`creating img...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 2000000));

 try {
    const res = await axios.get(`
https://api.nayan-project.repl.co/nayan/bing?perams=${np}`);
    var data = res.data;
    var msg = [];
    let img1 = `${res.data.Url}`;

    let imgs1 = (await axios.get(`${img1}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/bing.jpg", Buffer.from(imgs1, "utf-8"));




    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/bing.jpg"));

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