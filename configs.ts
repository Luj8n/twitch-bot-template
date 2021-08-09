import type { Options } from "tmi.js";
import * as dotenv from "dotenv";
import { resolve } from "path";

// load environment variables
dotenv.config({
  path: resolve(__dirname, "../.env"),
});

export const ACCOUNT: Options = {
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_TOKEN,
  },
  channels: process.env.CHANNELS?.split(",") ?? [],
};

export const IDENTIFIER = process.env.BOT_IDENTIFIER ?? "!";
