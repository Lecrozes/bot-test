import {Client} from "discord.js";
import {Config} from "./Config";
import ReadyListener from "./listeners/ReadyListener";

console.log('Bot is starting');

const client = new Client({
	intents: []
});

ReadyListener(client);
client.login(Config.BOT_TOKEN);