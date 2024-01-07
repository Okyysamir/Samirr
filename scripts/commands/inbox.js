module.exports.config = {
name: "inbox",
  version: "",
  permssion: 2,
  credits: "Nayan",
  description: "",
  category: "spam",
  usages: "inbox",
  prefix: true,
  cooldowns: 5,
  dependencies: "",
};

module.exports.run = async function ({ api, event, Users, args }) {

  var id = Object.keys(event.mentions)[0] || event.senderID;
  var name = await Users.getNameUser(id);
  if (!args[0]) api.sendMessage(`✅ SUCCESSFULLY SEND MSG\n\n🔰 [${name}] PLEASE CK YOUR INBOX OR MSG REQUEST BOX`, event.threadID)

  var { threadID, messageID } = event;
  var k = function (k) { api.sendMessage(k, id)};



  const msg = `✅ SUCCESSFULLY ALLOW\n🔰 NOW YOU CAN USE ${global.config.BOTNAME} HERE`;


  //*vonglap
{
 k(`${msg}`);
}

}