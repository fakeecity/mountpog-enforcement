require('dotenv').config()
const fs = require('fs')
const { Client, Intents } = require('discord.js');
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES);

const client = new Client({ intents: myIntents });

client.login(process.env.BOT_TOKEN)

client.on("ready", () => {
    console.log("Success!")
    const guild = client.guilds.cache.get('669657216852295691');
    console.log("j")
    memberCount = 0
    
    guild.members.fetch().then(members =>
        {
            console.log("p")
            members.forEach(member =>
            {
                console.log(member.user.tag)
                memberCount = memberCount + 1
            });
        });
    fs.writeFile('members.txt', String(memberCount), err => {
        if (err) {
            console.error(err)
            return
        }
    });
})

client.on("presenceUpdate", async function(oldMember, newMember) {
    if (!newMember.activities || newMember.activities.length == 0) {} 
    else if(newMember.activities.filter(myActivity => myActivity.type == "PLAYING").length != 0){
        currentGame = newMember.activities.filter(myActivity => myActivity.type == "PLAYING")[0]
        console.log(currentGame.name)
        if(String(currentGame.name).toLowerCase() == "osu!"){
            fs.writeFile('hall-of-shame.txt', String(newMember.name), err => {
                if (err) {
                    console.error(err)
                }
                else{
                    try {
                        newMember.user.send("you smell horrible, take a shower and come back in 30 mins");
                        newMember.user.kick()
                    } 
                    catch (error) {
                        console.error(error);
                    }
                }
                
            })
            console.log(newMember.activities[0])
        }
    }
})