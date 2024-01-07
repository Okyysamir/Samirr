module.exports.config = {
  name: "sad",
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
    const { NAYAN } = global.apiNayan;
    const res = await axios.get(`${NAYAN}/video/sadstory`);
    var data = res.data.url;
    var msg = [];
    let img1 = `${res.data.url.link}`;
    let cp = `${res.data.url.cp}`

    let imgs1 = (await axios.get(`${img1}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img1.mp4", Buffer.from(imgs1, "utf-8"));
    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/img1.mp4"));
	
    {
        msg += `${cp}`
    }
    
    return api.sendMessage({
        body: msg,
        attachment: allimage
    }, event.threadID, event.messageID);
}