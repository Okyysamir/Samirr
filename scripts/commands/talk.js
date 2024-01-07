module.exports.config = {
     name: "Talk",
     version: "1.1.0",
     permission: 0,
     credits: "Nayan",
     description: "talk reply",
     prefix: false,
     category: "without prefix",
     cooldowns: 0
};


const axios = require('axios');

module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const log = require('../../Nayan/catalogs/Nayanc.js');
    const path = resolve(__dirname, 'system', 'system.json');
    if (!existsSync(path)) {
        const obj = {
            ryuko: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('Nayan')) data.ryuko = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}

module.exports.handleEvent = async ({ api, event, args, Threads }) => {
    const { threadID, messageID } = event;
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'system', 'system.json');
    const { talk } = global.apiNayan;
    const { ryuko } = require(path);

    if (ryuko.hasOwnProperty(threadID) && ryuko[threadID] == true) {
      if (event.senderID !== api.getCurrentUserID()) {
      axios.get(encodeURI(`${talk}${event.body}`)).then(res => {
            if (res.data.reply == "null" || res.data.reply == "i didn't understand you, teach me.") {
                api.sendMessage("i didn't understand you, teach me.",threadID,messageID)
            } else {
                return api.sendMessage(res.data.reply, threadID, messageID);
            }
    })
    }  
    }
}

module.exports.run = async ({ api, event, args, permssion }) => {
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, 'system', 'system.json');
    const { threadID, messageID } = event;
    const database = require(path);
    const { talk } = global.apiNayan;
    const { ryuko } = database;

    if (!args[0]) { api.sendMessage("enter a message", threadID, messageID) } else {
        switch(args[0]) {
            case "on": {
              if (permssion != 1) return api.sendMessage('only group admins can use this commands', threadID, messageID);
                ryuko[threadID] = true;
                api.sendMessage("successfully turned on talk.", threadID);
                break;
            }
            case "off": {
              if (permssion != 1) return api.sendMessage('only group admins can use this commands', threadID, messageID);
                ryuko[threadID] = false;
                api.sendMessage("successfully turned off talk.", threadID);
                break;
            }
            default:
            axios.get(encodeURI(`${talk}${args.join(" ")}`)).then(res => {
            if (res.data.reply == "null" || res.data.reply == "i didn't understand you, teach me.") {
                api.sendMessage("i didn't understand you, teach me.",threadID,messageID)
            } else {
                return api.sendMessage(res.data.reply, threadID, messageID);
            }
            });
            break;
        }
        writeFileSync(path, JSON.stringify(database, null, 4));
    }
}