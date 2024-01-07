module.exports.config = {
    name: "out",
	version: "1.0.5",
	credits: "nayan",
	prefix: false,
	permission: 2,
	description: "out bot",
	category: "admin",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
        if (!args[0]) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
        if (!isNaN(args[0])) return api.removeUserFromGroup(api.getCurrentUserID(), args.join(" "));
}