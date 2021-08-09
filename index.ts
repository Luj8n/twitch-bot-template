import tmi from "tmi.js"; // some documentation here: https://github.com/tmijs/docs/tree/gh-pages/_posts/v1.4.2
import type { ChatUserstate } from "tmi.js";
import { ACCOUNT, IDENTIFIER } from "./configs.js";

// create a client with selected options
const client = new tmi.Client(ACCOUNT);

async function onMessage(
  channel: string,
  userstate: ChatUserstate,
  message: string,
  self: boolean
) {
  // ignore message if it is is the bot's message or it doesn't start with the modifier
  if (self || !message.startsWith(IDENTIFIER)) return;
  message = message.slice(1); // remove the identifier

  const words = message.match(/\S+/g) ?? []; // get words with regex
  const command = (words[0] ?? "").toLowerCase(); // get the command and make it lowercase
  const args = words.slice(1); // get the arguments

  const isMod = userstate.mod || userstate.username === channel.slice(1); // is true if the message sender is a mod

  console.log(`* got: command - "${command}", arguments: "${args}"`);

  let reply = "";

  // -----------------------------------------------------------------------------------------
  // change the reply variable to a string if you want to send it to chat

  switch (command) {
    case "ping":
      reply = "Pong!";
      break;
    case "pong":
      reply = "Ping?";
      break;
    case "say":
      reply = args.join(" ");
      break;
    case "amiamod":
      reply = isMod
        ? `Yes, @${userstate["display-name"]}. You are a mod!`
        : `No, @${userstate["display-name"]}.`;
      break;
  }

  // -----------------------------------------------------------------------------------------

  // don't send the reply if it's an empty string or the bot account is anonymous
  if (reply === "" || typeof ACCOUNT["identity"] === "undefined") return;

  await client.say(channel, reply);
  console.log(`* replied with "${reply}"`);
}

// register event handlers
client.on("connected", (address: string, port: number) => {
  console.log(`* connected to: address - ${address}, port - ${port}`);
});

client.on("message", onMessage);

// connect to Twitch
client.connect();
