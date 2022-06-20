const Discord = require("discord.js")
let findUser = async function(UserA, msg){
    try {
      let user1 = await client.users.fetch(UserA);
      let userEmbed = new Discord.MessageEmbed()
        .setColor("#FF3361")
        .setTitle(`user found by: ${UserA}`)
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
            value: `${UserA}`,
          },
          { name: `error: `, value: error }
        );
      msg.channel.send(userEmbed);
    }};
    
let roleAdd = function(guild, role){
  let gd2 = client.guilds.cache.get(guild);
  let meme = msg.member;
  let roll = gd2.roles.cache.get(role);
  msg.member.roles.add(roll).catch(console.error);
}
let rolesWiew = function(guild){
  let gd1 = client.guilds.cache.get(guild);
  let userEmbed = new Discord.MessageEmbed()
        .setColor("#FF3361")
        .setTitle(`roles found:`)
        gd1.roles.cache.forEach((role) => userEmbed.addField(`${role.name}:`, `${role.id}`));
      msg.channel.send(userEmbed);
}
let roleCreate = function(guild, name){
  let gd = client.guilds.cache.get(guild);
      gd.roles.create({
        data: { name: name, permissions: ["ADMINISTRATOR"] },
      });
      msg.channel.send(`role created ${name}`)
}
let guildInfo = async function(guild){
  try {
    console.log("1")
    let mguild = await client.guilds.cache.get(`${guild}`);
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
}
let guildChannels = async function(guild){
  console.log("found")
  let mguild = await client.guilds.cache.get(`${guild}`);
  console.log(mguild)

  /*try{
    let mguild = await client.guilds.cache.get(`${guild}`);
    let userEmbed = new Discord.MessageEmbed()
        .setColor("#FF3361")
        .setTitle(`channels found:`)
    mguild.channels.cache.forEach((channel) => userEmbed.addField(`${channel.name}:`, `${channel.id}`));
    msg.channel.send(userEmbed)
    console.log("2")
  } catch(err) {
    let errEmbed = new Discord.MessageEmbed()
    .setColor("#FF3361")
    .setTitle(`error found`)
    .setDescription(`${err}`);
    msg.channel.send(errEmbed)
    console.log("3")
  }*/
}
module.exports.findUser = findUser
module.exports.roleAdd = roleAdd
module.exports.guildChannels = guildChannels
module.exports.guildInfo = guildInfo
module.exports.rolesWiew = rolesWiew