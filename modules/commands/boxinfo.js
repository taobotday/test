const fs = require('fs');
const request = require('request');
module.exports.config = {
	name: 'boxinfo',
	version: '1.0.0',
	hasPermssion: 0,
	description: 'Xem thông tin box của bạn.',
	commandCategory: '1',
	cooldowns: 5,
	dependencies: []
};

module.exports.run = async function({ api, event, args, client, Users }) {
	var idbox = args.join(' ');

	try {
		var threadInfo = await api.getThreadInfo(args[0]);
	} catch (e) {
		var threadInfo = await api.getThreadInfo(event.threadID);
	}

	/*let idbox = args[0].trim();
  if (!idbox) {
    let threadInfo = await api.getThreadInfo(event.threadID);
  }
  let threadInfo = await api.getThreadInfo(idbox);*/
	var memLength = threadInfo.participantIDs.length;
	let threadMem = threadInfo.participantIDs.length;
	var nameMen = [];
	var gendernam = [];
	var gendernu = [];
	var nope = [];

	for (let z in threadInfo.userInfo) {
		var gioitinhone = threadInfo.userInfo[z].gender;

		var nName = threadInfo.userInfo[z].name;

		if (gioitinhone == 'MALE') {
			gendernam.push(z + gioitinhone);
		} else if (gioitinhone == 'FEMALE') {
			gendernu.push(gioitinhone);
		} else {
			nope.push(nName);
		}
	}

	var nam = gendernam.length;
	var nu = gendernu.length;
	let qtv = threadInfo.adminIDs.length;
	let sl = threadInfo.messageCount;
	let u = threadInfo.nicknames;
	let icon = threadInfo.emoji;
	let threadName = threadInfo.threadName;
	let id = threadInfo.threadID;
	var listad = '';
	var qtv2 = threadInfo.adminIDs;
	var fs = require("fs-extra");

	for (let i = 0; i < qtv2.length; i++) {
const infu = (await api.getUserInfo(qtv2[i].id));
const name = infu[qtv2[i].id].name;
		listad += '+ ' + name + '\n';
	}

	let sex = threadInfo.approvalMode;
	var pd = sex == false ? 'TẮT' : sex == true ? 'BẬT' : '';
	var pdd = sex == false ? '❎' : sex == true ? '✅' : '';
	api.sendMessage(
		`➤ Tên box: ${threadName}\n➤ ID Box: ${id}\n➤ Phê duyệt: ${pd}\n➤ Emoji: ${icon}\n➤ Tổng: ${threadMem} thành viên\n➤ Nam: ${nam} thành viên\n➤ Nữ: ${nu} thành viên\n\n➤ Quản trị viên gồm ${qtv} người:\n${listad}\nTổng số tin nhắn: ${sl} tin.`,
		event.threadID,
		event.messageID
	);
};
