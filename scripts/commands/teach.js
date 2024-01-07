module.exports.config = {
    name: "teach2",
    version: "1.0.2",
    permission: 0,
    credits: "ryuko",
    prefix: false,
    description: "talk teach",
    category: "without prefix",
    usages: "your ask - my answer",
    cooldowns: 0
};

const axios = require('axios');

module.exports.run = async ({ api, event, args }) => {
    let { messageID, threadID } = event;
    let work = args.join(" ");
    let fw = work.indexOf(" - ");
    let { teach } = global.apiNayan;
    if (fw == -1) {
        api.sendMessage(`wrong format\ntry : ${global.config.PREFIX}${this.config.name} (your ask) - (my answer)`,threadID,messageID);
    } else {
        let ask = work.slice(0, fw);
        let answer = work.slice(fw + 3, work.length);
        if (ask=="") {api.sendMessage("wrong format",threadID,messageID)} else {
            if (!answer) {api.sendMessage("wrong format",threadID,messageID)} else {
                    axios.get(encodeURI(`${teach}${ask}&&${answer}`)).then(res => {
                        if (res.data.reply == "key and value have all cmnr, add the cc"){
                            api.sendMessage("question, answer already exists",threadID,messageID)} else {
                                if (res.data.reply == "there's something wrong with cc, i don't know") {api.sendMessage('unknown error.',threadID,messageID)} else {
                                    api.sendMessage(res.data.reply,threadID,messageID);
                                }
                            }
                    })
            }
        }
    }
                        }