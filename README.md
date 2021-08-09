# twitch-bot-template

This is a simple twitch bot template with made with [tmi.js](https://tmijs.com/) and [typescript](https://www.typescriptlang.org/)

## How to use it

#### 1. Rename the `.env.sample` file to `.env`

#### 2. Fill the `.env` file with your own data

Here are what each variable means:

- TWITCH_USERNAME - twitch account username
- TWITCH_TOKEN - auth token, get it from here https://twitchapps.com/tmi/
- CHANNELS - which channels to watch, seperate with ,
- BOT_IDENTIFIER - what to write before the bot command

#### 3. Run `npm install` or `yarn install` to install dependencies

#### 4. Run `npm run dev` or `yarn dev` to start the app.

Note that if you did `yarn install` in the previous step, you have to do `yarn dev` in this step. Same with npm
