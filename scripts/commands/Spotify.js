module.exports.config = {
  name: "sp",
	version: "0.0.2",
	permission: 0,
  prefix: true,
	credits: "Nayan",
	description: "sad video",
	category: "admin",
	usages: "",
    cooldowns: 5,
};

module.exports.languages = {
	"vi": {
		"missingInput": "Hãy nhập đầu vào để có thể tạo qr code"
	},
	"en": {
		"missingInput": "Enter input to create qr code"
	}
}



module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
    const { NAYAN } = global.apiNayan; 
    const text = args.join(" ")
    /*if(!text) return api.sendMessage(getText("missingInput"),event.threadID);*/
    const res = await axios.get(`https://main-server.nayan-api.repl.co/spotify/track?url=${text}`);
    var data = res.data;
    var msg = [];
    let img1 = `${res.data.audio}`;
    let cp = `${res.data.title}`

    let imgs1 = (await axios.get(`${img1}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img1.mp3", Buffer.from(imgs1, "utf-8"));
    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/img1.mp3"));
	
    {
        msg += `${cp}`
    }
    
    return api.sendMessage({
        body: msg,
        attachment: allimage
    }, event.threadID, event.messageID);
}