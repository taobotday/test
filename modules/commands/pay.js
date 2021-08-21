module.exports.config = {
	name: "pay",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Raiden",
	description: "Chuyển tiền.",
	commandCategory: "Economy",
	usages: "[tag]",
    cooldowns: 5,
    dependencies: ["parse-ms"],
    envConfig: {
        cooldownTime: 5
    }
};

module.exports.run = async function ({ event, api, Currencies, __GLOBAL }) {
			var {body} = event;
    var prefix = ";";
			var content = body.slice(prefix.length + 4, body.length);
			var moneyPay = content.substring(content.lastIndexOf(" ") + 1);
	    var a = moneyPay;		
		var moneydb = (await Currencies.getData(event.senderID)).money;
				if (isNaN(moneyPay) || moneyPay.indexOf("-") !== -1){
				 return api.sendMessage('Nó không phải là một con số!', event.threadID, event.messageID);
				}
					var mention = Object.keys(event.mentions)[0];
				if (moneyPay > moneydb) {
                 var sd = moneyPay - moneydb;
					return api.sendMessage(`Bạn không đủ điều kiện, bạn vẫn thiếu ${sd} VNĐ.`, event.threadID, event.messageID);
				}
				if(moneyPay < 100) {
					return api.sendMessage('Số VNĐ chuyển của bạn quá thấp, tối thiểu là 100 VNĐ.', event.threadID, event.messageID);
				}
				if (moneyPay < moneydb) {
                var b = a/100*10;
                var c = a-b
				return api.sendMessage({
					body:`Bạn đã chuyển ${c} VNĐ cho ${event.mentions[mention].replace("@", "")}\nPhí giao dịch là 10% `,
					mentions: [{
						tag: event.mentions[mention].replace("@", ""),
						id: mention
					}]
				}, event.threadID, async ()  => {
					await Currencies.increaseMoney(mention, parseInt(moneyPay));
					await Currencies.decreaseMoney(event.senderID, parseInt(moneyPay));
				}, event.messageID);
	      }
       }
       
