import tmi from "tmi.js";
import { ACCOUNT, IDENTIFIER } from "./configs.js";

// create a client with selected options
const client = new tmi.client(ACCOUNT);

function onMessage(channel, tags, message, self) {
  // ignore message if it is is the bot's message or it doesn't start with the modifier
  if (self || !message.startsWith(IDENTIFIER)) return;
  message = message.slice(1); // remove the identifier

  const words = message.match(/\S+/g) || []; // get words with regex
  const command = (words[0] || "").toLowerCase(); // get the command and make it lowercase
  const args = words.slice(1) || []; // get the arguments

  console.log(`* got: command - "${command}", arguments: "${args}"`);

  let reply;

  // -----------------------------------------------------------------------------------------
  // change the reply variable, if you want to send it in chat
  // NOTE: it can't be an anonymous account

  if (command === "ping") {
    reply = "Pong!";
  } else if (command === "pong") {
    reply = "Ping?";
  } else if (command === "say") {
    reply = args.join(" ");
  }

  // -----------------------------------------------------------------------------------------

  // don't send the reply if it isn't a string or the account is anonymous
  if (typeof reply !== "string" || typeof ACCOUNT["identity"] === "undefined") return;
  client.say(channel, reply);
  console.log(`* replied with "${reply}"`);
}

// register event handlers
client.on("connected", (address, port) => {
  console.log(`* connected to: address - ${address}, port - ${port}`);
});

client.on("message", onMessage);

// connect to Twitch
client.connect();
