module.exports.config = {
  name: "art",
  version: "1.0.0",
  permission: 2,
  credits: "Nayan",
  description: "msg",
  prefix: true, 
  category: "user", 
  usages: "",
  cooldowns: 5,
  dependencies: {
	}
};

module.exports.run = async function({ api, event, args, getText }) {
    const prompt = args.join(" ");
    if (!prompt) return api.sendMessage(getText("syntaxError"), event.threadID, event.messageID);

    const axios = require("axios");
    const { getStreamFromURL } = global.utils;

    try {
        const { data } = await axios({
            url: "https://goatbotserver.onrender.com/taoanhdep/openjourney",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                prompt,
                parameters: {}
            }
        });

        const imageUrl = data[0];
        const imageStream = await getStreamFromURL(imageUrl, "openjourney.png");
        return api.sendMessage({ attachment: imageStream }, event.threadID, event.messageID);
    } catch (e) {
        console.error(e);
        return api.sendMessage(getText("error"), event.threadID, event.messageID);
    }
}
