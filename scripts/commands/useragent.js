module.exports.config = {
  name: "useragent",
	version: "0.0.2",
	permission: 0,
  prefix: true,
	credits: "Nayan",
	description: "sad video",
	category: "admin",
	usages: "",
    cooldowns: 5,
};





module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
    const n = global.nayan_api;
    const res = await axios.get(`${n}/random/useragent`);
    var platform = res.data.platform;
        var msg = [];
        var userAgent = res.data.userAgent;
        var deviceCategory = res.data.deviceCategory;

        {
            msg += `𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: ${platform}\n𝗗𝗲𝘃𝗶𝗰𝗲 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: ${deviceCategory}\n\n𝗨𝘀𝗲𝗿 𝗔𝗴𝗲𝗻𝘁: ${userAgent}`
        }

        return api.sendMessage({
            body: msg,
            attachment: fs.createReadStream(__dirname + "/Nayan/u.jpeg")

        }, event.threadID, event.messageID);
    }