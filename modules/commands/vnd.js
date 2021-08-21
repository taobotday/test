module.exports.config = {
	name: "vnd",
	version: "1.0.3-hotfix2",
	hasPermssion: 2,
	credits: "Raiden",
	description: "Tăng giảm VNĐ",
	commandCategory: "Economy",
	usages: "coins [args]",
    cooldowns: 5,
     info: [
    {
    	key: "inc",
    	prompt: "tăng VNĐ",
    	type: 'admin',
    	example: 'vnd inc'
    },
    {
    	key: "dec",
    	prompt: "giảm VNĐ",
    	type: 'admin',
    	example: 'vnd dec'
    }] 
};

module.exports.run = async ({ event, api, Currencies, args, utils }) => {
	let { threadID, messageID, senderID } = event;
	const coins = parseInt(args[2])
	const userID = Object.keys(event.mentions)[0];
	var nameL
	switch(args[0]) {
		case "inc": {
		if (args[1] == 'me') return api.sendMessage({ body: `Đã thêm cho bản thân ${coins} VNĐ`}, threadID, async () => {
            await Currencies.increaseMoney(senderID, coins);}, messageID);
        if(userID) nameL = event.mentions[userID].split(" ").length
		return api.sendMessage({ body: 'Đã chuyển cho ' + event.mentions[userID].replace(/@/g, "") + ` ${args[1+ nameL]} VNĐ`}, threadID, async () => {
            await Currencies.increaseMoney(userID, parseInt(args[1+ nameL]));
            }, messageID);
       }
			break;
		case "dec": {
		if (args[1] == 'me') {
		let balance = (await Currencies.getData(userID)).money;
		if(args[2] == "all") return api.sendMessage(`Bạn đã giảm toàn bộ VNĐ của bản thân`, threadID, async () => {
            await Currencies.decreaseMoney(senderID, balance);}, messageID);
		 if(!isNaN(args[2])){ 
		 if(coins > balance) return api.sendMessage("Số VNĐ bạn giảm lớn hơn số VNĐ hiện có",threadID,messageID)
	       	else return api.sendMessage(`Đã giảm ${coins} VNĐ của bản thân`, threadID, async () => {
            await Currencies.decreaseMoney(senderID, coins);}, messageID);
            }
         else return api.sendMessage("Vui lòng nhập số VNĐ muốn giảm",threadID,messageID)
        }
	    else if(userID){
	    nameL = event.mentions[userID].split(" ").length
	    let balance = (await Currencies.getData(userID)).money;
	    if(args[1+ nameL] == "all") return api.sendMessage(`Bạn đã giảm toàn bộ VNĐ của ${event.mentions[userID].replace(/@/g, "")}`, threadID, async () => {
            await Currencies.decreaseMoney(userID, balance);}, messageID);
        
	    api.sendMessage({ body: `Đã giảm ${args[1+ nameL]} VNĐ của ` + event.mentions[userID].replace(/@/g, "")}, threadID, async () => {
            await Currencies.decreaseMoney(userID, parseInt(args[1+nameL]));}, messageID);
            }
        else return api.sendMessage("Bạn muốn giảm VNĐ của ai",threadID,messageID)
        }
			break;
		default:
		return utils.throwError("vnd", threadID, messageID);
		break;
		}
	}
