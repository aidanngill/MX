# MX

General purpose Discord bot for small servers. Currently a large work in progress, although it provides a good boilerplate for new **discord.js** bots.

## Requirements

* Node.js <sup>v16.3.0</sup>
* MongoDB <sup>v4.2.3</sup>
* Discord bot

## Getting Started

Firstly you'll need to download the files. If you have `git` installed, you can do this easily by typing the following.

```bash
git clone https://github.com/ramadan8/MX
cd MX
```

Next, create a file called `config.json` and enter the following values, editing them where necessary for your own bot.

```json
{
    "token": "YOUR_DISCORD_BOT_TOKEN",
    "clientId": "YOUR_DISCORD_BOT_CLIENT_ID"
}
```

The following will *deploy* the commands to your servers, and *start* the bot up.

```bash
npm run deploy
npm run start
```

At this point you could use **systemd** or **pm2** to run the bot 24/7.
