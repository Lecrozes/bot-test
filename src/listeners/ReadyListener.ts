import {AnyChannel, Client, TextChannel} from "discord.js";
import {Config} from "../Config";

export default (client: Client): void => {
	let textArr = [];
	textArr.push("[HIGH] Alert for Central Command [I GUESS]: Firewall Gateway Down");
	textArr.push("[MEDIUM] Alert for Central Command [I GUESS]: Advanced Threat detected");
	textArr.push("[HIGH] Alert for Central Command [I GUESS]: DDOS detected");
	textArr.push("[MEDIUM] Alert for Central Command [I GUESS]: Illegal access detected");

	function createTimeout(millis: number, channel: TextChannel): void {
		console.log('createTimeout() called');
		let nextDate = new Date();
		nextDate.setMilliseconds(nextDate.getMilliseconds() + millis);
		console.log('next message date: ' + nextDate.toISOString());
		const timeout = setTimeout(async () => {
			await channel.send(textArr[Math.floor(Math.random() * textArr.length)]);
			clearTimeout(timeout);
			const newMillis = Math.floor(Math.random() * (17280000000 - 432000)) + 43200000;
			createTimeout(newMillis, channel);
		}, millis);
	}

	client.on('ready', async () => {
		if (!client.user || !client.application)
			return;
		console.log(`${client.user.username} is online`);

		let channel: AnyChannel;
		await client.channels
			.fetch(Config.CHANNEL_ID)
			.then(c => channel = c);

		if (!(channel instanceof TextChannel))
			return;

		const textChannel: TextChannel = channel;

		await textChannel.send('Your Server is now protected by Sophoz');

		createTimeout(Math.floor(Math.random() * (172800000 - 43200000)) + 43200000, textChannel);
	});
}