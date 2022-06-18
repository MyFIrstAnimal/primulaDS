const Discord = require("discord.js");
const client = new Discord.Client();
const { RichEmbed } = require("discord.js");
import * as US from './userCms'
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
    case "create_role":
      US.roleCreate(no[1], no[2])
      break;
    case "wiew_roles":
      US.rolesWiew(no[1])
      break;
    case "role":
      US.roleAdd(no[1], no[2])
      break;
    case "find_user":
      US.findUser(no[1])
      break;
  }
});
client.login(process.env.token);
