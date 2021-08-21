module.exports.config = {
	name: "restart",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Raiden",
	description: "Khởi Động Lại Bot.",
	commandCategory: "system",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>api.sendMessage("Chờ tao 1 phút khởi động lại...",event.threadID, () =>process.exit(1))
