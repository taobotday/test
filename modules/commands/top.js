module.exports.config = {
    name: "top",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "Raiden",
    description: "Bảng Xếp Hạng.",
    commandCategory: "system",
    usages: "[rank/vnd]",
    cooldowns: 5,
};
module.exports.run = async function ({ args, api, event, Currencies, client, Users}) {
    if (args[0] == "money") {
        var data = await client.allUser || []
        var top = [];
        for (var id of data) {
            const money = (await Currencies.getData(id)).money;
                         top.push({ id: id, money: money});
    }
top.sort((a, b) => {
            if (a.money > b.money) return -1;
            if (a.money < b.money) return 1;
        });
        let msg = [];
     for(let num = 0; num < 10; num++) {
         const  datame = await Users.getData(top[num].id);
         const namee = datame.name
         msg += `${num+1} . ${namee} với ${top[num].money} VNĐ \n`;
     } 
        api.sendMessage("Top 10 người giàu nhất\n" + msg, event.threadID);          
    }
if (args[0] == "rank") {
        var data = await client.allUser || []
        var top1 = [];
        for (var id of data) {
           var exp = parseInt((await Currencies.getData(id)).exp);
    exp = exp += 1;
const level = Math.floor((Math.sqrt(1 + (4 * (exp + 1) / 3) + 1) / 2));
                         top1.push({ id: id, level: level });
    }
var top = top1.sort((a, b) => {
            if (a.level > b.level) return -1;
            if (a.level < b.level) return 1;
        });
        let msg = [];
          
     for(let num = 0; num < 10; num++) {
     const  datamee = await Users.getData(top[num].id);
     const nameee = datamee.name;       
         msg += `${num+1} . ${nameee} với LV: ${top1[num].level}  \n`;
     } 
        api.sendMessage("Top 10 người có số rank cao nhất\n" + msg, event.threadID);          
    }
}
