module.exports.config = {
  name: "nogod",
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
  const vid = (
    await axios.get(
      'https://i.imgur.com/IpjxJ6W.png',
      { responseType: 'stream' }
    )
  ).data;
  const q = args.join(" ");
    const res = await axios.get(`https://api.bdjob6.xyz/nagad.php?number=${q}`);
    var platform = res.data.userId;
        var msg = [];
        var userAgent = res.data.userType;
        var deviceCategory = res.data.status;
  var mobile = res.data.mobileNo;
  var name = res.data.name;
  var op = res.data.operator;
  var reg = res.data.registrationMethod;

        {
            msg += `Name: ${name}\n𝗗𝗲𝘃𝗶𝗰𝗲 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: ${deviceCategory}\n\n𝗨𝘀𝗲𝗿 Type: ${userAgent}\nUser Id: ${platform}\nMobile No.: ${mobile}\nOperator: ${op}\nRegi. Method: ${reg}\n`
        }

        return api.sendMessage({
            body: msg,
            attachment: vid

        }, event.threadID, event.messageID);
    }
