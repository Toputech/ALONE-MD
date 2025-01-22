"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { topu } = require("../framework/topu");

topu({ nomCom: "repo", catégorie:"Général", reaction: "✨", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
  const githubRepo = 'https://api.github.com/repos/Toputech/ALONE-MD';
  const img = 'https://files.catbox.moe/4tu6s0.jpg';

  try {
    const response = await fetch(githubRepo);
    const data = await response.json();

    if (data) {
      const repoInfo = {
        stars: data.stargazers_count,
        forks: data.forks_count,
        lastUpdate: data.updated_at,
        owner: data.owner.login,
      };

      const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
      const lastUpdateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

      const gitdata = `*hellow whatsaap user
this is* *ALONE_md.*\n support our channel *by*,  https://whatsapp.com/channel/0029VaeRrcnADTOKzivM0S1r

🗼 *REPOSITORY:* ${data.html_url}
🌟 *STARS:* ${repoInfo.stars}
🧧 *FORKS:* ${repoInfo.forks}
📅 *RELEASE DATE:* ${releaseDate}
🕐 *UPDATE ON:* ${repoInfo.lastUpdate}
👨‍💻 *OWNER:* *Topu tech*
💞 *THEME:* *TOPU*
🥰*ONLY Enjoyment is interesting!👑*
__________________________________
            *Made With Toputech Tech*`;

      await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });
    } else {
      console.log("Could not fetch data");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
});
