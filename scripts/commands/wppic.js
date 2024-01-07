module.exports.config = {
  name: "wp",
  version: "2.0.0",
  permission: 0,
  credits: "Nayan",
  description: "",
  prefix: true,
  category: "user",
  usages: "link",
  cooldowns: 5,
  dependencies: {
        'image-downloader': '',
  }
};
module.exports.run = async function({ api, event, args }) {
  
  api.setMessageReaction("😻", event.messageID, (err) => {
  }, true);
  api.sendTypingIndicator(event.threadID, true);
  
  const { messageID, threadID } = event;
  const { nayan } = global.apiNayan;
  const fs = require("fs");
  const axios = require("axios");
  const request = require("request");
  const prompt = args.join(" ");
  if (!args[0]) return api.sendMessage("[ ! ] Input Number With Contry Code", threadID, messageID);

  const content = args.join(" ");
  if (!args[1]) api.sendMessage(`Data is being collected for this number[${content}]`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 10000));

 try {
  const res = await axios.get(`https://api.nayan-project.repl.co/nayan/wp?num=${content}`);

   var file = fs.createWriteStream(__dirname + '/cache/wp.jpg');
   
        const url = res.data.result.profilePic;
   const code = res.data.result.countryCode;
   const number = res.data.result.phone;
   const server = res.data.result.id.server;
   const error = res.data.result.error;
        const rqs = request(encodeURI(url));
   
    

  rqs.pipe(file);  
  file.on('finish', () => {
    
    setTimeout(function() {
      
      return api.sendMessage({
        body: `🌏COUNTRY CODE: ${code}\n🔢NUMBER,: ${number}\n⛎️SERVER: ${server}`,
        attachment: fs.createReadStream(__dirname + '/cache/wp.jpg')
      }, threadID, messageID)
    }, 5000)
  })
    } catch (err) {
    api.sendMessage(`please enter your balid number without country code`, event.threadID, event.messageID);  
   }
};