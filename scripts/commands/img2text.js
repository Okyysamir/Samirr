module.exports.config = {
  name: "text",
  version: "0.0.2",
  permission: 0,
  prefix: true,
  credits: "Nayan",
  description: "image to text",
  category: "user",
  usages: "",
    cooldowns: 5,
};





module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
    const n = global.nayan_api;
  const linkanh = event.messageReply.attachments[0].url || args.join(" ");
  const allPromise = (await Promise.all(event.messageReply.attachments.map(item => axios.get(`https://api.nayan-project.repl.co/imgur?link=${encodeURIComponent(item.url)}`)))).map(item => item.data.uploaded.image);
    const res = await axios.get(`https://api.nayan-project.repl.co/nayan/img2text?url=${allPromise.join('"\n"')}`);
        var msg = [];
        var text = res.data.text;

        {
            msg += `${text}`
        }

        return api.sendMessage({
            body: msg,

        }, event.threadID, event.messageID);
}