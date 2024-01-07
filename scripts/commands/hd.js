module.exports.config = {
  name: "hd",
  version: "1.0.0",
  permission: 0,
  credits: "Nayan",
  description: " ",
  prefix: true, 
  category: "user", 
  usages: "@",
  cooldowns: 5,
};

let eta = 3;
module.exports.run = async o=> {
  let send = msg => o.api.sendMessage(msg, o.event.threadID, o.event.messageID);

  if (o.event.type != 'message_reply')return send(`Please reply 1 picture.!`);
  send(`Increase resolution for ${o.event.messageReply.attachments.length} picture (${o.event.messageReply.attachments.length*eta}𝘀)...`);

  let stream = [];
  let exec_time = 0;
  for (let i of o.event.messageReply.attachments)try {
    let res = await require('axios').get(encodeURI(`https://nams.live/upscale.png?{"image":"${i.url}","model":"4x-UltraSharp"}`), {
      responseType: 'stream',
    });

    exec_time+=+res.headers.exec_time;
    eta = res.headers.exec_time/1000<<0;
    res.data.path = 'tmp.png';
    stream.push(res.data);
  } catch (e) {};

  send({
    body: `🖼️ ==『 Your photo hd is complete 』==🖼️\n━━━━━━━━━━━━━━━━━━━\n[⏰] → Hd test time: ${exec_time/1000<<0}𝘀)`,
    attachment: stream,
  });
};