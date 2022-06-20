
const Discord = require("discord.js")
const client = new Discord.Client();
const US = require('./userCms.js')
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
        US.guildInfo(no[2])
        break;
      case "gd":
        try {
          let mguild = await client.guilds.fetch(no[2]);
          console.log(mguild.cache);
        } catch (err) {
          console.log(err);
        }
      default:
        break;
    }
  }
  switch (no[0]) {
    case "create_role":
      try{
      US.roleCreate(no[1], no[2])
      } catch(err) {
        msg.channel.send(err)
      }
      break;
    case "wiew_roles":
      try {
      US.rolesWiew(no[1])
      } catch(err) {
        msg.channel.send(err)
      }
      break;
    case "role":
      try{
      US.roleAdd(no[1], no[2])
      } catch(err) {
        msg.channel.send(err)
      }
      break;
    case "find_user":
      US.findUser(no[1])
      break;
    case "channels":
      let userEmbed = new Discord.MessageEmbed()
          .setColor("#FF3361")
          .setTitle(`the error found`)
          .setDescription("params:")
          .addFields(
            {
              name: `command: `,
              value: `server_invite [channel_id] [invite_members_count]`,
            },
            { name: `error: `, value: error }
          );
        msg.channel.send(userEmbed);
      break;
      case "server_invite":
        try {
          let invitelink = await client.channels.cache
            .get(`${no[1]}`)
            .createInvite({ unique: true, maxUses: `${no[2]}` });
          msg.channel.send(`https://discord.gg/${invitelink.code}`);
        } catch (error) {
          let userEmbed = new Discord.MessageEmbed()
            .setColor("#FF3361")
            .setTitle(`78632874875`)
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
        case "restart":
          console.log("restarting")
          client.destroy()
          break;
  }

});
client.login(token);