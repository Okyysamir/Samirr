module.exports.config = {
  name: "add",
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
  if (args.length !== 1) {
      api.sendMessage(`Invalid number of arguments. Usage: Replay 1 video then type ${global.config.PREFIX}add your name`, event.threadID, event.messageID);
      return;
  }
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
    const n = global.nayan_api;
  const linkanh = event.messageReply.attachments[0].url;
  const name = args[0];
  const allPromise = (await Promise.all(event.messageReply.attachments.map(item => axios.get(`https://api.nayan-project.repl.co/imgurv2?link=${encodeURIComponent(item.url)}`)))).map(item => item.data.uploaded.image);
    const res = await axios.get(`https://api.nayan-project.repl.co/mixadd?name=${name}&url=${allPromise.join('"\n"')}`);
        var msgs = [];
        var msg = res.data.msg;
var nam = res.data.data.name;
  var url = res.data.data.url;

        {
            msgs += `📩MASSAGE: ${msg}\n📛NAME: ${nam}\n🖇URL: ${url}`
        }

        return api.sendMessage({
            body: msgs,

        }, event.threadID, event.messageID);
}