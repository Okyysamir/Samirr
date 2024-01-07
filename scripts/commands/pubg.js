const tientrochoi = 1000
module.exports.config = {
  name: "pubg",
  version: "1.0.0",
  permssion: 0,
  credits: "Raiden Shogun",
  prefix: true,
  description: "random câu hỏi về pubg",
  category: "Trò Chơi",
  usages: "",
  cooldowns: 0
};
module.exports.run = async function ({ api, args, event, Currencies, Users }) {
  const axios = require("axios");
  const { nayan } = global.apiNayan;
    const fs = require("fs-extra");
    const { senderID ,threadID, messageID } = event;
     
        
     let res = (await	axios.get(encodeURI(`${nayan}/game/pubg`))).data.data;
      let pubg = (await axios.get(`${res.link}`, { responseType: "arraybuffer" } )).data;
      fs.writeFileSync( __dirname + "/cache/pubg.png", Buffer.from(pubg, "utf-8"));
    var namePlayer_react = await Users.getData(event.senderID)
     return api.sendMessage({body:`🌸====[𝐏𝐔𝐁𝐆 𝐐𝐔𝐈𝐙]====🌸\n\n${res.body}\n\nReply to this message with your chosen results (-${tientrochoi}$)`,attachment: fs.createReadStream(__dirname + `/cache/pubg.png`)}, event.threadID, async (err, info) => {
                    client.handleReply.push({
                        type: "random",
                        name: this.config.name,
                        senderID: event.senderID,
                        messageID:  info.messageID,
                        replyID: event.messageID, 
                        threadID: event.threadID,
                        answer_ :res.answer
                    },event.messageID);
        await new Promise(resolve => setTimeout(resolve, 120))
        })    
}  
module.exports.handleReply = async function({ api, event, args, handleReply, client, global, Threads, Users, Currencies }) {
    if (event.senderID == api.getCurrentUserID()) return;

    let { senderID, messageID, threadID } = event;
    let name = (await Users.getData(senderID)).name;
    var money = parseInt(Math.floor(Math.random() * 5000))
    switch (handleReply.type) {
        case "random": {
           
      if(event.body.toUpperCase() == handleReply.answer_) return api.sendMessage({body :`Good Luck, Good Luck ${name} Wow You Correct ${money}$ 😽`}, handleReply.threadID, () => api.unsendMessage(handleReply.messageID) + Currencies.increaseMoney(event.senderID, money));    
      else return api.sendMessage({body :`It's so wrong ${handleReply.answer_} Ask for accuracy 🍄`}, handleReply.threadID, () => api.unsendMessage(handleReply.messageID));    
      handleReply.splice(0, 1);
    }
    }
};