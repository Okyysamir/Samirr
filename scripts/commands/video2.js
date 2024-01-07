
module.exports.config = {
  name: "video2",
	version: "0.0.2",
	permission: 0,
  prefix: true,
	credits: "Nayan",
	description: "Rendom video",
	category: "user",
	usages: "",
    cooldowns: 5,
};


module.exports.run = async function({
	event: e,
	api: a,
	args: n
}) {
	if (!n[0]) return a.sendMessage("====「 𝐕𝐈𝐃𝐄𝐎 」====\n━━━━━━━━━━━━━\n𝟙. 𝐋𝐎𝐕𝐄 𝐕𝐈𝐃𝐄𝐎 💞 \n𝟚. 𝐂𝐎𝐔𝐏𝐋𝐄 𝐕𝐈𝐃𝐄𝐎 💕\n𝟛. 𝐒𝐇𝐎𝐑𝐓 𝐕𝐈𝐃𝐄𝐎 📽\n𝟜. 𝐒𝐀𝐃 𝐕da𝐄𝐎 😔\n𝟝. 𝐒𝐓𝐀𝐓𝐔𝐒 𝐕𝐈𝐃𝐄𝐎 📝\n𝟞. 𝐒𝐇𝐀𝐈𝐑𝐈\n𝟟. 𝐁𝐀𝐁𝐘 𝐕𝐈𝐃𝐄𝐎 😻\n𝟠. 𝐀𝐍𝐈𝐌𝐄 𝐕𝐈𝐃𝐄𝐎 \n𝟡. 𝐇𝐔𝐌𝐀𝐈𝐘𝐔𝐍 𝐅𝐎𝐑𝐈𝐃 𝐒𝐈𝐑 ❄\n𝟙𝟘. 𝐈𝐒𝐋𝐀𝐌𝐈𝐊 𝐕𝐈𝐃𝐄𝐎 🤲\n\n===「 𝟏𝟖+ 𝐕𝐈𝐃𝐄𝐎 」===\n━━━━━━━━━━━━━\n𝟙𝟙. 𝐇𝐎𝐑𝐍𝐘 𝐕𝐈𝐃𝐄𝐎 🥵\n𝟙𝟚. 𝐇𝐎𝐓 🔞\n𝟙𝟛. 𝐈𝐓𝐄𝐌\n\nTell me how many video numbers you want to see by replaying this message", e.threadID, ((a, n) => {
		global.client.handleReply.push({
			name: this.config.name,
			messageID: n.messageID,
			author: e.senderID,
      type: "create"
		})
	}), e.messageID)
}, module.exports.handleReply = async ({
	api: e,
	event: a,
	client: n,
	handleReply: t,
	Currencies: s,
	Users: i,
	Threads: o
}) => {
	var { p, h } = linkanh();
  const request = require("request");
	if ("create" === t.type) {
		const n = (await p.get(h)).data.data;
    const cap = (await p.get(h)).data.nayan;
    const cn = (await p.get(h)).data.count;
		let t = (await p.get(n, {
			responseType: "stream"
		})).data;
		return e.sendMessage({
			body: `${cap}` + `\n\n¤《𝐓𝐎𝐓𝐀𝐋 𝐕𝐈𝐃𝐄𝐎: ${cn}》¤`,
			attachment: t
		}, a.threadID, a.messageID)
	}

    function linkanh() {
        const p = require("axios");
        const n = global.nayan_api;
        if ("1" == a.body)
            var h = `${n}/video/love`;
        else if ("2" == a.body)
         var   h = `${n}/video/cpl`;
        else if ("3" == a.body)
         var   h = `${n}/video/shortvideo`;
        else if ("4" == a.body)
          var  h = `${n}/video/sadvideo`;
        else if ("5" == a.body)
          var  h = `${n}/video/status`;
        else if ("6" == a.body)
          var  h = `${n}/video/shairi`;
        else if ("7" == a.body)
          var  h = `${n}/video/baby`;
        else if ("8" == a.body)
          var  h = `${n}/video/anime`;
        else if ("9" == a.body)
         var   h = `${n}/video/humaiyun`;
        else if ("10" == a.body)
         var  h = `${n}/video/islam`;
        else if ("11" == a.body)
         var  h = `${n}/video/horny`;
        else if ("12" == a.body)
          var  h = `${n}/video/hot`;
        else if ("13" == a.body)
          var  h = `${n}/video/item`;
        return { p, h };
    }
};