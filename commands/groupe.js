const {
  exec
} = require("child_process");
const {
  zokou
} = require("../framework/zokou");
const {
  Sticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  ajouterOuMettreAJourJid,
  mettreAJourAction,
  verifierEtatJid
} = require('../bdd/antilien');
const {
  atbajouterOuMettreAJourJid,
  atbverifierEtatJid
} = require('../bdd/antibot');
const {
  search,
  download
} = require('aptoide-scraper');
const fs = require('fs-extra');
const conf = require("../set");
const {
  default: axios
} = require("axios");
const {
  getBinaryNodeChild,
  getBinaryNodeChildren
} = require("@whiskeysockets/baileys")['default'];
zokou({
  'nomCom': "apk",
  'aliases': ["app", 'application'],
  'reaction': '🖕',
  'categorie': 'Download'
}, async (_0x3b6cd2, _0x40c1a6, _0x58d857) => {
  const {
    repondre: _0x472679,
    arg: _0x590c90,
    ms: _0x36a73a
  } = _0x58d857;
  try {
    const _0x29f462 = _0x590c90.join(" ");
    if (!_0x29f462) {
      return _0x472679("*Enter the name of the application to search for*");
    }
    const _0x161b72 = await axios.get('https://api.junn4.my.id/search/playstore?query=' + encodeURIComponent(_0x29f462));
    const _0x45ac1e = _0x161b72.data;
    if (_0x45ac1e.status !== 0xc8 || !_0x45ac1e.result || _0x45ac1e.result.length === 0x0) {
      return _0x472679("*Can't find application, please enter another name*");
    }
    const _0x4bc3a6 = _0x45ac1e.result[0x0];
    const _0x1e917f = "*🌟ALPHA-MD APP 🌟*\n\n" + ("*Name:* " + _0x4bc3a6.nama + "\n") + ("*Developer:* " + _0x4bc3a6.developer + "\n") + ("*Rating:* " + _0x4bc3a6.rate + "\n") + ("*Download Link:* " + _0x4bc3a6.link + "\n") + ("*Developer's Apps:* " + _0x4bc3a6.link_dev);
    const _0x53c77e = {
      'image': {
        'url': _0x4bc3a6.img
      },
      'caption': _0x1e917f
    };
    await _0x40c1a6.sendMessage(_0x3b6cd2, _0x53c77e, {
      'quoted': _0x36a73a
    });
    _0x472679("Application details and link to the Play Store have been sent.");
  } catch (_0x42b6b8) {
    console.error("Error during apk command processing:", _0x42b6b8.response ? _0x42b6b8.response.data : _0x42b6b8.message);
    _0x472679("*Error during apk command processing: " + _0x42b6b8.message + '*');
  }
});
zokou({
  'nomCom': 'add',
  'categorie': "Group",
  'reaction': '🖕'
}, async (_0x24f18e, _0x4375b2, _0x500bd4) => {
  let {
    repondre: _0x132613,
    verifAdmin: _0x2dac04,
    msgRepondu: _0x5e0fe4,
    infosGroupe: _0x554e14,
    auteurMsgRepondu: _0x10e456,
    verifGroupe: _0x44fbb9,
    auteurMessage: _0x416a0c,
    superUser: _0x1ad6e8,
    idBot: _0x3a1d08,
    arg: _0x3e9fea
  } = _0x500bd4;
  if (!_0x44fbb9) {
    return _0x132613("*This command works in groups only!*");
  }
  if (!_0x1ad6e8) {
    _0x132613("You are too weak to do that");
    return;
  }
  ;
  if (!_0x2dac04) {
    _0x132613("You are not an admin here!");
    return;
  }
  ;
  let _0x1fd727;
  try {
    _0x1fd727 = await _0x4375b2.groupMetadata(_0x24f18e);
  } catch (_0x23156a) {
    return _0x132613("Failed to fetch group metadata.");
  }
  let _0xc8dec2 = _0x1fd727.participants;
  if (!_0x3e9fea[0x0]) {
    return _0x132613("Provide number to be added. Example:\nadd 254722222222");
  }
  let _0x4cb0cb = _0x3e9fea.join(" ");
  const _0x5abc4d = _0xc8dec2.map(_0xd268e8 => _0xd268e8.id);
  let _0xee4f6b = [];
  let _0x4ae008 = [];
  try {
    const _0x190ed5 = await Promise.all(_0x4cb0cb.split(',').map(_0xd59024 => _0xd59024.replace(/[^0-9]/g, '')).filter(_0x50909e => _0x50909e.length > 0x4 && _0x50909e.length < 0x14).map(async _0x59d2ca => [_0x59d2ca, await _0x4375b2.onWhatsApp(_0x59d2ca + "@s.whatsapp.net")]));
    _0x190ed5.forEach(([_0xd9f32a, _0x2639c9]) => {
      const _0x1a902c = _0xd9f32a + "@s.whatsapp.net";
      if (_0x5abc4d.includes(_0x1a902c)) {
        _0x4ae008.push(_0x1a902c);
      } else if (_0x2639c9[0x0]?.["exists"]) {
        _0xee4f6b.push(_0xd9f32a + "@c.us");
      }
    });
  } catch (_0x13e463) {
    return _0x132613("Error validating phone numbers.");
  }
  for (const _0x4eef69 of _0x4ae008) {
    _0x132613("That user is already in this group!");
  }
  let _0x366035;
  try {
    if (_0xee4f6b.length > 0x0) {
      _0x366035 = await _0x4375b2.query({
        'tag': 'iq',
        'attrs': {
          'type': 'set',
          'xmlns': "w:g2",
          'to': _0x24f18e
        },
        'content': _0xee4f6b.map(_0x2bfc5b => ({
          'tag': "add",
          'attrs': {},
          'content': [{
            'tag': "participant",
            'attrs': {
              'jid': _0x2bfc5b
            }
          }]
        }))
      });
      for (const _0x3c35cc of _0xee4f6b) {
        _0x132613("Successfully added @" + _0x3c35cc.split('@')[0x0]);
      }
    }
  } catch (_0x4e3a9f) {
    return _0x132613("Failed to add user to the group!");
  }
  let _0x3f6faa;
  try {
    _0x3f6faa = await _0x4375b2.profilePictureUrl(_0x24f18e, "image")["catch"](() => "https://telegra.ph/file/39436fea9098ae0aeded3.jpg");
  } catch (_0x6d1bf4) {
    _0x3f6faa = "https://telegra.ph/file/39436fea9098ae0aeded3.jpg";
  }
  let _0x4d0c6a = Buffer.alloc(0x0);
  if (_0x3f6faa) {
    try {
      const _0x54d4d5 = await fetch(_0x3f6faa);
      if (_0x54d4d5.ok) {
        _0x4d0c6a = await _0x54d4d5.buffer();
      } else {
        console.error("Failed to fetch profile picture:", _0x54d4d5.statusText);
      }
    } catch (_0x3cebff) {
      console.error("Error fetching profile picture:", _0x3cebff);
    }
  }
  const _0x9b3264 = _0x366035?.["content"]["find"](_0x494271 => _0x494271.tag === "add");
  const _0x267a0b = _0x9b3264?.["content"]['filter'](_0x265691 => _0x265691.attrs.error == 0x193);
  let _0x36611d;
  try {
    _0x36611d = await _0x4375b2.groupInviteCode(_0x24f18e);
  } catch (_0x1031b3) {
    return _0x132613("Failed to generate group invite code.");
  }
  for (const _0x116dc4 of _0x267a0b || []) {
    const _0x4766bc = _0x116dc4.attrs.jid;
    const _0x5488b4 = _0x116dc4.content.find(_0x31f672 => _0x31f672.tag === "add_request");
    const _0x4f92a4 = _0x5488b4.attrs.code;
    const _0x19afe6 = _0x5488b4.attrs.expiration;
    const _0x794f96 = "I cannot add @" + _0x4766bc.split('@')[0x0] + " due to privacy settings, Let me send an invite link instead.";
    await _0x132613(_0x794f96);
    let _0x599fb8 = "You have been invited to join the group " + _0x1fd727.subject + ":\n\nhttps://chat.whatsapp.com/" + _0x36611d + "\n\n*POWERRD BY ALONE-MD*";
    await _0x4375b2.sendMessage(_0x4766bc, {
      'image': {
        'url': _0x3f6faa
      },
      'caption': _0x599fb8
    }, {
      'quoted': _0x5e0fe4
    });
  }
});
zokou({
  'nomCom': "broadcast",
  'aliases': ['bc', "cast"],
  'reaction': '🚀',
  'categorie': 'General'
}, async (_0x323461, _0x4cdb8c, _0x4c87e6) => {
  const {
    ms: _0x54b6b4,
    repondre: _0xb269b7,
    arg: _0x17b399,
    nomAuteurMessage: _0x271224,
    superUser: _0x291ccf
  } = _0x4c87e6;
  let _0x1360fc = _0x17b399.join(" ");
  if (!_0x17b399[0x0]) {
    _0xb269b7("After the command *broadcast*, type your message to be sent to all groups you are in💀,,,.");
    return;
  }
  if (!_0x291ccf) {
    _0xb269b7("hey you!! fuck off i can't broadcast your message");
    return;
  }
  let _0x52c320 = await _0x4cdb8c.groupFetchAllParticipating();
  let _0x254221 = Object.entries(_0x52c320).slice(0x0).map(_0x35bfa1 => _0x35bfa1[0x1]);
  let _0x115598 = _0x254221.map(_0x6b0f9 => _0x6b0f9.id);
  await _0xb269b7("*ALONE-MD is sending this message to all groups you are in*...");
  for (let _0x398282 of _0x115598) {
    let _0x25a35f = "‼️‼️ALONE-𝐌𝐃 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓️‼️️‼️\n\n❗*message* : " + _0x1360fc + "\n\n️‼️ *Author*: " + _0x271224;
    await _0x4cdb8c.sendMessage(_0x398282, {
      'image': {
        'url': "https://files.catbox.moe/4tu6s0.jpg"
      },
      'caption': '' + _0x25a35f
    });
  }
});
zokou({
  'nomCom': "disap-off",
  'categorie': "Group",
  'reaction': '👹'
}, async (_0x1f053f, _0x40fcb7, _0x521ba1) => {
  const {
    ms: _0x4f524c,
    repondre: _0x331c17,
    arg: _0x2634cc,
    verifGroupe: _0x579411,
    nomGroupe: _0x441450,
    infosGroupe: _0x9588f8,
    nomAuteurMessage: _0x28b6f4,
    verifAdmin: _0x256b35,
    superUser: _0x29b8fc
  } = _0x521ba1;
  if (!_0x579411) {
    _0x331c17("This command works in groups only");
    return;
  }
  ;
  if (!_0x256b35) {
    _0x331c17("You are not an admin here!");
    return;
  }
  ;
  await _0x40fcb7.groupToggleEphemeral(_0x1f053f, 0x0);
  _0x331c17("Dissapearing messages successfully turned off!");
});
zokou({
  'nomCom': "disap",
  'categorie': "Group",
  'reaction': '👹'
}, async (_0x541352, _0x3aeb98, _0x44eb36) => {
  const {
    ms: _0x193b28,
    repondre: _0x59b8c1,
    arg: _0x28473d,
    verifGroupe: _0xc3435d,
    nomGroupe: _0x4683a9,
    infosGroupe: _0x5c3552,
    nomAuteurMessage: _0x309bce,
    verifAdmin: _0x2ed7b0,
    superUser: _0x3fd9b9
  } = _0x44eb36;
  if (!_0xc3435d) {
    _0x59b8c1("This command works in groups only");
    return;
  }
  ;
  if (!_0x2ed7b0) {
    _0x59b8c1("You are not an admin here!");
    return;
  }
  ;
  _0x59b8c1("*Do you want to turn on disappearing messages?*\n\nIf yes type _*disap1* for messages to disappear after 1 day._\n_or *disap7* for messages to disappear after 7 days._\n_or *disap90* for messages to disappear after 90 days._\n\n To turn in off, type *disap-off*");
});
zokou({
  'nomCom': "req",
  'categorie': 'Group',
  'reaction': '👹'
}, async (_0x3f37d6, _0x3d6273, _0x16b776) => {
  const {
    ms: _0xb9a750,
    repondre: _0x31754e,
    arg: _0x12666e,
    verifGroupe: _0x28f964,
    nomGroupe: _0x53e2e0,
    infosGroupe: _0x3bff2d,
    nomAuteurMessage: _0x400ed4,
    verifAdmin: _0x24be95,
    superUser: _0x557f97
  } = _0x16b776;
  if (!_0x28f964) {
    _0x31754e("This command works in groups only");
    return;
  }
  ;
  if (!_0x24be95) {
    _0x31754e("You are not an admin here, what will you do if there are pending requests?!");
    return;
  }
  ;
  const _0x47a8dc = await _0x3d6273.groupRequestParticipantsList(_0x3f37d6);
  if (_0x47a8dc.length === 0x0) {
    return _0x31754e("there are no pending join requests.");
  }
  let _0x4143c3 = '';
  _0x47a8dc.forEach((_0x153f0a, _0x52939c) => {
    _0x4143c3 += '+' + _0x153f0a.jid.split('@')[0x0];
    if (_0x52939c < _0x47a8dc.length - 0x1) {
      _0x4143c3 += "\n";
    }
  });
  _0x3d6273.sendMessage(_0x3f37d6, {
    'text': "Pending Participants:- 🕓\n" + _0x4143c3 + "\n\nUse the command approve or reject to approve or reject these join requests."
  });
  _0x31754e(_0x4143c3);
});
zokou({
  'nomCom': 'disap90',
  'categorie': "Group",
  'reaction': '👹'
}, async (_0x58e845, _0x202cf5, _0x2bdac3) => {
  const {
    ms: _0x57db2c,
    repondre: _0x5f3128,
    arg: _0x3d77a8,
    verifGroupe: _0x2c2a4b,
    nomGroupe: _0x257f19,
    infosGroupe: _0x3f3b71,
    nomAuteurMessage: _0x37fb1a,
    verifAdmin: _0x51a02a,
    superUser: _0xcdccad
  } = _0x2bdac3;
  if (!_0x2c2a4b) {
    _0x5f3128("This command works in groups only");
    return;
  }
  ;
  if (!_0x51a02a) {
    _0x5f3128("You are not an admin here!");
    return;
  }
  ;
  await _0x202cf5.groupToggleEphemeral(_0x58e845, 0x76a700);
  _0x58e845("Dissapearing messages successfully turned on for 90 days!");
});
zokou({
  'nomCom': "reject",
  'aliases': ["rejectall", "rej", "reject-all"],
  'categorie': "Group",
  'reaction': '👹'
}, async (_0x1ca2e8, _0x2c301e, _0x483ebc) => {
  const {
    repondre: _0x241d6c,
    verifGroupe: _0x599a8e,
    verifAdmin: _0x377b7b
  } = _0x483ebc;
  if (!_0x599a8e) {
    _0x241d6c("This command works in groups only");
    return;
  }
  if (!_0x377b7b) {
    _0x241d6c("You are not an admin here!");
    return;
  }
  const _0x131a72 = await _0x2c301e.groupRequestParticipantsList(_0x1ca2e8);
  if (_0x131a72.length === 0x0) {
    return _0x241d6c("There are no pending join requests for this group.");
  }
  for (const _0x1d01ca of _0x131a72) {
    const _0x24fec1 = await _0x2c301e.groupRequestParticipantsUpdate(_0x1ca2e8, [_0x1d01ca.jid], "reject");
    console.log(_0x24fec1);
  }
  _0x241d6c("All pending join requests have been rejected.");
});
zokou({
  'nomCom': 'disap7',
  'categorie': "Group",
  'reaction': '👹'
}, async (_0xdb7461, _0x152ba7, _0x3f9021) => {
  const {
    ms: _0x1f5ca5,
    repondre: _0x22ec79,
    arg: _0x9e9021,
    verifGroupe: _0x1828ed,
    nomGroupe: _0x1e981d,
    infosGroupe: _0x21cc83,
    nomAuteurMessage: _0x29176e,
    verifAdmin: _0x533a23,
    superUser: _0x247ddd
  } = _0x3f9021;
  if (!_0x1828ed) {
    _0x22ec79("This command works in groups only");
    return;
  }
  ;
  if (!_0x533a23) {
    _0x22ec79("You are not an admin here!");
    return;
  }
  ;
  await _0x152ba7.groupToggleEphemeral(_0xdb7461, 0x93a80);
  _0xdb7461("Dissapearing messages successfully turned on for 7 days!");
});
zokou({
  'nomCom': "disap1",
  'categorie': "Group",
  'reaction': '👹'
}, async (_0x5c9d47, _0x445664, _0x4266de) => {
  const {
    ms: _0x5a95d5,
    repondre: _0x569e5a,
    arg: _0x2f6dd1,
    verifGroupe: _0x5ad8b0,
    nomGroupe: _0x3cb0f5,
    infosGroupe: _0x1da057,
    nomAuteurMessage: _0x20e12e,
    verifAdmin: _0x1906b2,
    superUser: _0x2fe79c
  } = _0x4266de;
  if (!_0x5ad8b0) {
    _0x569e5a("This command works in groups only");
    return;
  }
  ;
  if (!_0x1906b2) {
    _0x569e5a("You are not an admin here!");
    return;
  }
  ;
  await _0x445664.groupToggleEphemeral(_0x5c9d47, 0x15180);
  _0x5c9d47("Dissapearing messages successfully turned on for 24 hours");
});
zokou({
  'nomCom': 'approve',
  'aliases': ["approve-all", "accept"],
  'categorie': "Group",
  'reaction': '💯'
}, async (_0x43946b, _0x2c3517, _0x3f224a) => {
  const {
    repondre: _0x298913,
    verifGroupe: _0x208f8e,
    verifAdmin: _0x43a6a3
  } = _0x3f224a;
  if (!_0x208f8e) {
    _0x298913("This command works in groups only");
    return;
  }
  if (!_0x43a6a3) {
    _0x298913("You are not an admin here!");
    return;
  }
  const _0x2bc3fc = await _0x2c3517.groupRequestParticipantsList(_0x43946b);
  if (_0x2bc3fc.length === 0x0) {
    return _0x298913("There are no pending join requests.");
  }
  for (const _0x5dcd51 of _0x2bc3fc) {
    const _0x9a395b = await _0x2c3517.groupRequestParticipantsUpdate(_0x43946b, [_0x5dcd51.jid], 'approve');
    console.log(_0x9a395b);
  }
  _0x298913("All pending participants have been approved to join.");
});
zokou({
  'nomCom': "vcf",
  'aliases': ["savecontact", "savecontacts"],
  'categorie': "Group",
  'reaction': '🍆'
}, async (_0x1ec21c, _0xbcbdad, _0x341fdd) => {
  const {
    repondre: _0x2e5b52,
    verifGroupe: _0x1214da,
    verifAdmin: _0xb6471,
    ms: _0x48a83b
  } = _0x341fdd;
  const _0x511dab = require('fs');
  if (!_0xb6471) {
    _0x2e5b52("You are not an admin here!");
    return;
  }
  if (!_0x1214da) {
    _0x2e5b52("This command works in groups only");
    return;
  }
  try {
    let _0x38463f = await _0xbcbdad.groupMetadata(_0x1ec21c);
    const _0x267c2d = await _0x38463f.participants;
    let _0x4a6ecd = '';
    for (let _0x269fcd of _0x267c2d) {
      let _0x23a8f8 = _0x269fcd.id.split('@')[0x0];
      let _0x5838c2 = _0x269fcd.name || _0x269fcd.notify || "[ALPHA] +" + _0x23a8f8;
      _0x4a6ecd += "BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x5838c2 + "\nTEL;type=CELL;type=VOICE;waid=" + _0x23a8f8 + ':+' + _0x23a8f8 + "\nEND:VCARD\n";
    }
    await _0x2e5b52("A moment, *ALPHA-MD* is compiling " + _0x267c2d.length + " contacts into a vcf...");
    await _0x511dab.writeFileSync("./contacts.vcf", _0x4a6ecd.trim());
    await _0xbcbdad.sendMessage(_0x1ec21c, {
      'document': _0x511dab.readFileSync("./contacts.vcf"),
      'mimetype': "text/vcard",
      'fileName': _0x38463f.subject + '.Vcf',
      'caption': "VCF for " + _0x38463f.subject + "\nTotal Contacts: " + _0x267c2d.length + "\n*KEEP USING ALONE-MD*"
    }, {
      'ephemeralExpiration': 0x15180,
      'quoted': _0x48a83b
    });
    _0x511dab.unlinkSync('./contacts.vcf');
  } catch (_0x525d8e) {
    console.error("Error while creating or sending VCF:", _0x525d8e.message || _0x525d8e);
    _0x2e5b52("An error occurred while creating or sending the VCF. Please try again.");
  }
});
zokou({
  'nomCom': 'tagall',
  'categorie': 'Group',
  'reaction': '🖕'
}, async (_0x1739ca, _0x1dbf9d, _0x3278d3) => {
  const {
    ms: _0x369ce8,
    repondre: _0x67f29a,
    arg: _0xec84a0,
    verifGroupe: _0x57abcf,
    nomGroupe: _0x2b3359,
    infosGroupe: _0x42f894,
    nomAuteurMessage: _0x2b0f5a,
    verifAdmin: _0x5802a6,
    superUser: _0x3da57d
  } = _0x3278d3;
  if (!_0x57abcf) {
    _0x67f29a("✋🏿 ✋🏿this command works in groups only ❌");
    return;
  }
  if (!_0xec84a0 || _0xec84a0 === " ") {
    mess = "Aucun Message";
  } else {
    mess = _0xec84a0.join(" ");
  }
  ;
  let _0x5d1fc3 = _0x57abcf ? await _0x42f894.participants : '';
  var _0x4e4576 = '';
  _0x4e4576 += "========================\n  \n        🌟 *ALONE-MD* 🌟\n========================\n\n👥 Group : " + _0x2b3359 + " 🚀 \n👤 Author : *" + _0x2b0f5a + "* 👋 \n📜 Message : *" + mess + "* 📝\n========================\n\n\n\n\n";
  let _0x44caa0 = ['🦴', '👀', "😮‍💨", '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', "🙏🏿", '🖕', '$', '😟', '🥵', '🐅'];
  let _0x534613 = Math.floor(Math.random() * (_0x44caa0.length - 0x1));
  for (const _0x152193 of _0x5d1fc3) {
    _0x4e4576 += _0x44caa0[_0x534613] + "      @" + _0x152193.id.split('@')[0x0] + "\n";
  }
  if (_0x5802a6 || _0x3da57d) {
    _0x1dbf9d.sendMessage(_0x1739ca, {
      'text': _0x4e4576,
      'mentions': _0x5d1fc3.map(_0x33fa0d => _0x33fa0d.id)
    }, {
      'quoted': _0x369ce8
    });
  } else {
    _0x67f29a("command reserved for admins");
  }
});
zokou({
  'nomCom': 'invite',
  'aliases': ["link"],
  'categorie': 'Group',
  'reaction': '🖕'
}, async (_0x5b6e86, _0x75673b, _0x387b7e) => {
  const {
    repondre: _0x89d41d,
    nomGroupe: _0x200b30,
    nomAuteurMessage: _0x3fb091,
    verifGroupe: _0x57ef89
  } = _0x387b7e;
  if (!_0x57ef89) {
    _0x89d41d("*This command works in groups only!*");
    return;
  }
  try {
    const _0x35f332 = await _0x75673b.groupInviteCode(_0x5b6e86);
    const _0x1ccce3 = "https://chat.whatsapp.com/" + _0x35f332;
    const _0x5e291d = "Hello " + _0x3fb091 + ", here is the group link of " + _0x200b30 + ":\n\nClick Here To Join: " + _0x1ccce3;
    _0x89d41d(_0x5e291d);
  } catch (_0x926163) {
    console.error("Error fetching group invite link:", _0x926163.message || _0x926163);
    _0x89d41d("An error occurred while fetching the group invite link. Please try again.");
  }
});
zokou({
  'nomCom': 'promote',
  'categorie': "Group",
  'reaction': '🖕'
}, async (_0x2995b8, _0x4569a5, _0x37397d) => {
  let {
    repondre: _0xc0c053,
    msgRepondu: _0xd7f386,
    infosGroupe: _0x5e9e76,
    auteurMsgRepondu: _0xbdeba4,
    verifGroupe: _0x12afbf,
    auteurMessage: _0x47e4cc,
    superUser: _0x29df44,
    idBot: _0x195bae
  } = _0x37397d;
  let _0xb748e8 = _0x12afbf ? await _0x5e9e76.participants : '';
  if (!_0x12afbf) {
    return _0xc0c053("For groups only");
  }
  const _0x4992e2 = _0x32ef07 => {
    for (const _0x3fcaf5 of _0xb748e8) {
      if (_0x3fcaf5.id !== _0x32ef07) {
        continue;
      } else {
        return true;
      }
    }
  };
  const _0x46843c = _0x3e2f67 => {
    let _0x572708 = [];
    for (m of _0x3e2f67) {
      if (m.admin == null) {
        continue;
      }
      _0x572708.push(m.id);
    }
    return _0x572708;
  };
  const _0x5cdd9a = _0x12afbf ? _0x46843c(_0xb748e8) : '';
  let _0x314efb = _0x12afbf ? _0x5cdd9a.includes(_0xbdeba4) : false;
  let _0x498bb1 = _0x4992e2(_0xbdeba4);
  let _0x1fae51 = _0x12afbf ? _0x5cdd9a.includes(_0x47e4cc) : false;
  zkad = _0x12afbf ? _0x5cdd9a.includes(_0x195bae) : false;
  try {
    if (_0x1fae51 || _0x29df44) {
      if (_0xd7f386) {
        if (zkad) {
          if (_0x498bb1) {
            if (_0x314efb == false) {
              var _0x5878c1 = "🎊🍾  @" + _0xbdeba4.split('@')[0x0] + " Has been promoted as a group Admin.";
              await _0x4569a5.groupParticipantsUpdate(_0x2995b8, [_0xbdeba4], "promote");
              _0x4569a5.sendMessage(_0x2995b8, {
                'text': _0x5878c1,
                'mentions': [_0xbdeba4]
              });
            } else {
              return _0xc0c053("This member is already an administrator of the group.");
            }
          } else {
            return _0xc0c053("This user is not part of the group.");
          }
        } else {
          return _0xc0c053("Sorry, I cannot perform this action because I am not an administrator of the group.");
        }
      } else {
        _0xc0c053("please tag the member to be nominated");
      }
    } else {
      return _0xc0c053("Sorry I cannot perform this action because you are not an administrator of the group.");
    }
  } catch (_0x2d2203) {
    _0xc0c053("oups " + _0x2d2203);
  }
});
zokou({
  'nomCom': "demote",
  'categorie': 'Group',
  'reaction': '🖕'
}, async (_0x30df5e, _0x4f8ff7, _0x529536) => {
  let {
    repondre: _0x43fad8,
    msgRepondu: _0x5553c2,
    infosGroupe: _0x1ca5ee,
    auteurMsgRepondu: _0x2b0556,
    verifGroupe: _0x573b1e,
    auteurMessage: _0x2a352d,
    superUser: _0x5af07f,
    idBot: _0x7fea43
  } = _0x529536;
  let _0x58cd4f = _0x573b1e ? await _0x1ca5ee.participants : '';
  if (!_0x573b1e) {
    return _0x43fad8("For groups only");
  }
  const _0x1e714f = _0x5e9dfd => {
    for (const _0x6d7e19 of _0x58cd4f) {
      if (_0x6d7e19.id !== _0x5e9dfd) {
        continue;
      } else {
        return true;
      }
    }
  };
  const _0x2cedf4 = _0x389ca6 => {
    let _0x5aabbf = [];
    for (m of _0x389ca6) {
      if (m.admin == null) {
        continue;
      }
      _0x5aabbf.push(m.id);
    }
    return _0x5aabbf;
  };
  const _0x25baaf = _0x573b1e ? _0x2cedf4(_0x58cd4f) : '';
  let _0x92669 = _0x573b1e ? _0x25baaf.includes(_0x2b0556) : false;
  let _0x13e123 = _0x1e714f(_0x2b0556);
  let _0x156763 = _0x573b1e ? _0x25baaf.includes(_0x2a352d) : false;
  zkad = _0x573b1e ? _0x25baaf.includes(_0x7fea43) : false;
  try {
    if (_0x156763 || _0x5af07f) {
      if (_0x5553c2) {
        if (zkad) {
          if (_0x13e123) {
            if (_0x92669 == false) {
              _0x43fad8("This member is not a group administrator.");
            } else {
              var _0x106962 = '@' + _0x2b0556.split('@')[0x0] + " was removed from his position as a group administrator\n";
              await _0x4f8ff7.groupParticipantsUpdate(_0x30df5e, [_0x2b0556], "demote");
              _0x4f8ff7.sendMessage(_0x30df5e, {
                'text': _0x106962,
                'mentions': [_0x2b0556]
              });
            }
          } else {
            return _0x43fad8("This user is not part of the group.");
          }
        } else {
          return _0x43fad8("Sorry I cannot perform this action because I am not an administrator of the group.");
        }
      } else {
        _0x43fad8("please tag the member to be removed");
      }
    } else {
      return _0x43fad8("Sorry I cannot perform this action because you are not an administrator of the group.");
    }
  } catch (_0x2831d5) {
    _0x43fad8("oups " + _0x2831d5);
  }
});
zokou({
  'nomCom': "remove",
  'categorie': 'Group',
  'reaction': '🖕'
}, async (_0x4a9d23, _0x3a3418, _0x3e5f9c) => {
  let {
    repondre: _0x4ee68d,
    msgRepondu: _0x92a005,
    infosGroupe: _0x162d6e,
    auteurMsgRepondu: _0x51a47f,
    verifGroupe: _0x2daa40,
    nomAuteurMessage: _0x3a57de,
    auteurMessage: _0x711655,
    superUser: _0x3b20ed,
    idBot: _0x2066c7
  } = _0x3e5f9c;
  let _0x440b18 = _0x2daa40 ? await _0x162d6e.participants : '';
  if (!_0x2daa40) {
    return _0x4ee68d("for groups only");
  }
  const _0x125a76 = _0x28b859 => {
    for (const _0x3930b2 of _0x440b18) {
      if (_0x3930b2.id !== _0x28b859) {
        continue;
      } else {
        return true;
      }
    }
  };
  const _0x4ba4cd = _0x36b317 => {
    let _0x5e695d = [];
    for (m of _0x36b317) {
      if (m.admin == null) {
        continue;
      }
      _0x5e695d.push(m.id);
    }
    return _0x5e695d;
  };
  const _0x4877d8 = _0x2daa40 ? _0x4ba4cd(_0x440b18) : '';
  let _0x3d5f8b = _0x2daa40 ? _0x4877d8.includes(_0x51a47f) : false;
  let _0x22b0ae = _0x125a76(_0x51a47f);
  let _0x1bdead = _0x2daa40 ? _0x4877d8.includes(_0x711655) : false;
  zkad = _0x2daa40 ? _0x4877d8.includes(_0x2066c7) : false;
  try {
    if (_0x1bdead || _0x3b20ed) {
      if (_0x92a005) {
        if (zkad) {
          if (_0x22b0ae) {
            if (_0x3d5f8b == false) {
              var _0x1c54af = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
                'pack': "ALONE-MD",
                'author': _0x3a57de,
                'type': StickerTypes.FULL,
                'categories': ['🤩', '🎉'],
                'id': '12345',
                'quality': 0x32,
                'background': '#000000'
              });
              await _0x1c54af.toFile('st.webp');
              var _0x2761c2 = '@' + _0x51a47f.split('@')[0x0] + " was removed from the group.\n";
              await _0x3a3418.groupParticipantsUpdate(_0x4a9d23, [_0x51a47f], "remove");
              _0x3a3418.sendMessage(_0x4a9d23, {
                'text': _0x2761c2,
                'mentions': [_0x51a47f]
              });
            } else {
              _0x4ee68d("This member cannot be removed because he is an administrator of the group.");
            }
          } else {
            return _0x4ee68d("This user is not part of the group.");
          }
        } else {
          return _0x4ee68d("Sorry, I cannot perform this action because I am not an administrator of the group.");
        }
      } else {
        _0x4ee68d("please tag the member to be removed");
      }
    } else {
      return _0x4ee68d("Sorry I cannot perform this action because you are not an administrator of the group .");
    }
  } catch (_0x2a19f2) {
    _0x4ee68d("oups " + _0x2a19f2);
  }
});
zokou({
  'nomCom': "del",
  'categorie': "User",
  'reaction': '🖕'
}, async (_0x2bb0c8, _0x50ce57, _0x4a6e1b) => {
  const {
    ms: _0x2af202,
    repondre: _0x142b5e,
    verifGroupe: _0x32f028,
    auteurMsgRepondu: _0x2f016f,
    idBot: _0x354931,
    msgRepondu: _0x3d53ea,
    verifAdmin: _0x3b5e16,
    superUser: _0x51d9e1
  } = _0x4a6e1b;
  if (!_0x3d53ea) {
    _0x142b5e("Please mention the message to delete.");
    return;
  }
  if (_0x51d9e1 && _0x2f016f === _0x354931) {
    if (_0x2f016f === _0x354931) {
      const _0x3f83a7 = {
        'remoteJid': _0x2bb0c8,
        'fromMe': true,
        'id': _0x2af202.message.extendedTextMessage.contextInfo.stanzaId
      };
      await _0x50ce57.sendMessage(_0x2bb0c8, {
        'delete': _0x3f83a7
      });
      return;
    }
  }
  if (_0x32f028) {
    if (_0x3b5e16 || _0x51d9e1) {
      try {
        const _0x2e5396 = {
          'remoteJid': _0x2bb0c8,
          'id': _0x2af202.message.extendedTextMessage.contextInfo.stanzaId,
          'fromMe': false,
          'participant': _0x2af202.message.extendedTextMessage.contextInfo.participant
        };
        await _0x50ce57.sendMessage(_0x2bb0c8, {
          'delete': _0x2e5396
        });
        return;
      } catch (_0x472b53) {
        _0x142b5e("I need admin rights.");
      }
    } else {
      _0x142b5e("Sorry, you are not an administrator of the group.");
    }
  }
});
zokou({
  'nomCom': 'info',
  'categorie': "Group"
}, async (_0x2a9204, _0x316672, _0x324991) => {
  const {
    ms: _0xf62c82,
    repondre: _0x1eafcb,
    verifGroupe: _0x275c23
  } = _0x324991;
  if (!_0x275c23) {
    _0x1eafcb("order reserved for the group only");
    return;
  }
  ;
  try {
    ppgroup = await _0x316672.profilePictureUrl(_0x2a9204, "image");
  } catch {
    ppgroup = conf.IMAGE_MENU;
  }
  const _0x488747 = await _0x316672.groupMetadata(_0x2a9204);
  let _0x1639df = {
    'image': {
      'url': ppgroup
    },
    'caption': "*━━━━『GROUP INFO』━━━━*\n\n*🎐Name:* " + _0x488747.subject + "\n\n*🔩Group's ID:* " + _0x2a9204 + "\n\n*🔍Desc:* \n\n" + _0x488747.desc
  };
  _0x316672.sendMessage(_0x2a9204, _0x1639df, {
    'quoted': _0xf62c82
  });
});
zokou({
  'nomCom': 'antilink',
  'categorie': 'Group',
  'reaction': '🖕'
}, async (_0x3dbcd6, _0x44608f, _0x2d2190) => {
  var {
    repondre: _0x231780,
    arg: _0x5a0fe8,
    verifGroupe: _0x5107c4,
    superUser: _0x54db5f,
    verifAdmin: _0x4102b2
  } = _0x2d2190;
  if (!_0x5107c4) {
    return _0x231780("*This Command works in Groups Only*");
  }
  if (_0x54db5f || _0x4102b2) {
    const _0x35915d = await verifierEtatJid(_0x3dbcd6);
    try {
      if (!_0x5a0fe8 || !_0x5a0fe8[0x0] || _0x5a0fe8 === " ") {
        _0x231780("antilink on to activate the anti-link feature\nantilink off to deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.");
        return;
      }
      ;
      if (_0x5a0fe8[0x0] === 'on') {
        if (_0x35915d) {
          _0x231780("the antilink is already activated for this group");
        } else {
          await ajouterOuMettreAJourJid(_0x3dbcd6, "oui");
          _0x231780("the antilink is activated successfully");
        }
      } else {
        if (_0x5a0fe8[0x0] === 'off') {
          if (_0x35915d) {
            await ajouterOuMettreAJourJid(_0x3dbcd6, "non");
            _0x231780("The antilink has been successfully deactivated");
          } else {
            _0x231780("antilink is not activated for this group");
          }
        } else {
          if (_0x5a0fe8.join('').split('/')[0x0] === 'action') {
            let _0x21cfb7 = _0x5a0fe8.join('').split('/')[0x1].toLowerCase();
            if (_0x21cfb7 == "remove" || _0x21cfb7 == "warn" || _0x21cfb7 == 'delete') {
              await mettreAJourAction(_0x3dbcd6, _0x21cfb7);
              _0x231780("The anti-link action has been updated to " + _0x5a0fe8.join('').split('/')[0x1]);
            } else {
              _0x231780("The only actions available are warn, remove, and delete");
            }
          } else {
            _0x231780("antilink on to activate the anti-link feature\nantilink off to deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.");
          }
        }
      }
    } catch (_0x2c3a92) {
      _0x231780(_0x2c3a92);
    }
  } else {
    _0x231780("You are not entitled to this order");
  }
});
zokou({
  'nomCom': "antibot",
  'categorie': "Group",
  'reaction': '🖕'
}, async (_0x4f805f, _0xe9a53e, _0x304ee5) => {
  var {
    repondre: _0x1d1b84,
    arg: _0x53ec71,
    verifGroupe: _0x1fa7fb,
    superUser: _0x24312f,
    verifAdmin: _0x1365f5
  } = _0x304ee5;
  if (!_0x1fa7fb) {
    return _0x1d1b84("*for groups only*");
  }
  if (_0x24312f || _0x1365f5) {
    const _0x223d5b = await atbverifierEtatJid(_0x4f805f);
    try {
      if (!_0x53ec71 || !_0x53ec71[0x0] || _0x53ec71 === " ") {
        _0x1d1b84("antibot on to activate the anti-bot feature\nantibot off to deactivate the antibot feature\nantibot action/remove to directly remove the bot without notice\nantibot action/warn to give warnings\nantilink action/delete to remove the bot message without any sanctions\n\nPlease note that by default, the anti-bot feature is set to delete.");
        return;
      }
      ;
      if (_0x53ec71[0x0] === 'on') {
        if (_0x223d5b) {
          _0x1d1b84("the antibot is already activated for this group");
        } else {
          await atbajouterOuMettreAJourJid(_0x4f805f, "oui");
          _0x1d1b84("the antibot is successfully activated");
        }
      } else {
        if (_0x53ec71[0x0] === "off") {
          if (_0x223d5b) {
            await atbajouterOuMettreAJourJid(_0x4f805f, "non");
            _0x1d1b84("The antibot has been successfully deactivated");
          } else {
            _0x1d1b84("antibot is not activated for this group");
          }
        } else {
          if (_0x53ec71.join('').split('/')[0x0] === "action") {
            let _0x400d73 = _0x53ec71.join('').split('/')[0x1].toLowerCase();
            if (_0x400d73 == 'remove' || _0x400d73 == "warn" || _0x400d73 == "delete") {
              await mettreAJourAction(_0x4f805f, _0x400d73);
              _0x1d1b84("The anti-bot action has been updated to " + _0x53ec71.join('').split('/')[0x1]);
            } else {
              _0x1d1b84("The only actions available are warn, remove, and delete");
            }
          } else {
            _0x1d1b84("antibot on to activate the anti-bot feature\nantibot off to deactivate the antibot feature\nantibot action/remove to directly remove the bot without notice\nantibot action/warn to give warnings\nantilink action/delete to remove the bot message without any sanctions\n\nPlease note that by default, the anti-bot feature is set to delete.");
          }
        }
      }
    } catch (_0x471f) {
      _0x1d1b84(_0x471f);
    }
  } else {
    _0x1d1b84("You are not entitled to this order");
  }
});
zokou({
  'nomCom': "group",
  'categorie': 'Group'
}, async (_0x530c11, _0x310b5e, _0x434797) => {
  const {
    repondre: _0x3db499,
    verifGroupe: _0x23bdf3,
    verifAdmin: _0x4258da,
    superUser: _0x5d34de,
    arg: _0x364ffd
  } = _0x434797;
  if (!_0x23bdf3) {
    _0x3db499("order reserved for group only");
    return;
  }
  ;
  if (_0x5d34de || _0x4258da) {
    if (!_0x364ffd[0x0]) {
      _0x3db499("Instructions:\n\nType group open or close");
      return;
    }
    const _0x356b86 = _0x364ffd.join(" ");
    switch (_0x356b86) {
      case 'open':
        await _0x310b5e.groupSettingUpdate(_0x530c11, "not_announcement");
        _0x3db499("Group opened successfully.\nNow Participants can send messages.");
        break;
      case "close":
        await _0x310b5e.groupSettingUpdate(_0x530c11, "announcement");
        _0x3db499("Group closed successfully");
        break;
      default:
        _0x3db499("Please don't invent an option");
    }
  } else {
    _0x3db499("This command is for admins only!");
    return;
  }
});
zokou({
  'nomCom': 'gname',
  'categorie': "Group"
}, async (_0x180170, _0xcce638, _0x5e79b0) => {
  const {
    arg: _0x101dda,
    repondre: _0x5c5509,
    verifAdmin: _0x3b72ce
  } = _0x5e79b0;
  if (!_0x3b72ce) {
    _0x5c5509("order reserved for administrators of the group");
    return;
  }
  ;
  if (!_0x101dda[0x0]) {
    _0x5c5509("Please enter the group name");
    return;
  }
  ;
  const _0x529fc9 = _0x101dda.join(" ");
  await _0xcce638.groupUpdateSubject(_0x180170, _0x529fc9);
  _0x5c5509("group name refresh: *" + _0x529fc9 + '*');
});
zokou({
  'nomCom': 'gdesc',
  'categorie': "Group"
}, async (_0x572464, _0x4f1dc3, _0x3703f6) => {
  const {
    arg: _0x5e0033,
    repondre: _0x1d31e4,
    verifAdmin: _0x5af49a
  } = _0x3703f6;
  if (!_0x5af49a) {
    _0x1d31e4("order reserved for administrators of the group");
    return;
  }
  ;
  if (!_0x5e0033[0x0]) {
    _0x1d31e4("Please enter the group description");
    return;
  }
  ;
  const _0x4c1502 = _0x5e0033.join(" ");
  await _0x4f1dc3.groupUpdateDescription(_0x572464, _0x4c1502);
  _0x1d31e4("group description update: *" + _0x4c1502 + '*');
});
zokou({
  'nomCom': 'revoke',
  'categorie': 'Group'
}, async (_0x5cf31f, _0x499fc5, _0x27df3d) => {
  const {
    arg: _0x1cbe7c,
    repondre: _0x1e4f60,
    verifGroupe: _0x5201ec,
    verifAdmin: _0x5ad84b
  } = _0x27df3d;
  if (!_0x5ad84b) {
    _0x1e4f60("for admins.");
    return;
  }
  ;
  if (!_0x5201ec) {
    _0x1e4f60("This command is only allowed in groups.");
  }
  ;
  await _0x499fc5.groupRevokeInvite(_0x5cf31f);
  _0x1e4f60("group link revoked.");
});
zokou({
  'nomCom': "gpp",
  'categorie': "Group"
}, async (_0x358524, _0xfe4658, _0x1bbbf5) => {
  const {
    repondre: _0x4813f7,
    msgRepondu: _0x547d13,
    verifAdmin: _0x2b6f49
  } = _0x1bbbf5;
  if (!_0x2b6f49) {
    _0x4813f7("order reserved for administrators of the group");
    return;
  }
  ;
  if (_0x547d13.imageMessage) {
    const _0x3f9299 = await _0xfe4658.downloadAndSaveMediaMessage(_0x547d13.imageMessage);
    await _0xfe4658.updateProfilePicture(_0x358524, {
      'url': _0x3f9299
    }).then(() => {
      _0xfe4658.sendMessage(_0x358524, {
        'text': "Group pfp changed"
      });
      fs.unlinkSync(_0x3f9299);
    })['catch'](() => _0xfe4658.sendMessage(_0x358524, {
      'text': err
    }));
  } else {
    _0x4813f7("Please mention an image");
  }
});
zokou({
  'nomCom': "hidetag",
  'categorie': "Group",
  'reaction': '🖕'
}, async (_0x3e8471, _0x4f2983, _0x39f6f0) => {
  const {
    repondre: _0x49ff71,
    msgRepondu: _0x382541,
    verifGroupe: _0x574da7,
    arg: _0x187e77,
    verifAdmin: _0xe9b8f9,
    superUser: _0x5e2d44
  } = _0x39f6f0;
  if (!_0x574da7) {
    _0x49ff71("This command is only allowed in groups.");
  }
  ;
  if (_0xe9b8f9 || _0x5e2d44) {
    let _0x488042 = await _0x4f2983.groupMetadata(_0x3e8471);
    let _0x3299b2 = [];
    for (const _0x4f61f7 of _0x488042.participants) {
      _0x3299b2.push(_0x4f61f7.id);
    }
    if (_0x382541) {
      console.log(_0x382541);
      let _0x5785c1;
      if (_0x382541.imageMessage) {
        let _0x5b29d4 = await _0x4f2983.downloadAndSaveMediaMessage(_0x382541.imageMessage);
        _0x5785c1 = {
          'image': {
            'url': _0x5b29d4
          },
          'caption': _0x382541.imageMessage.caption,
          'mentions': _0x3299b2
        };
      } else {
        if (_0x382541.videoMessage) {
          let _0x3bd2dd = await _0x4f2983.downloadAndSaveMediaMessage(_0x382541.videoMessage);
          _0x5785c1 = {
            'video': {
              'url': _0x3bd2dd
            },
            'caption': _0x382541.videoMessage.caption,
            'mentions': _0x3299b2
          };
        } else {
          if (_0x382541.audioMessage) {
            let _0x523a20 = await _0x4f2983.downloadAndSaveMediaMessage(_0x382541.audioMessage);
            _0x5785c1 = {
              'audio': {
                'url': _0x523a20
              },
              'mimetype': "audio/mp4",
              'mentions': _0x3299b2
            };
          } else {
            if (_0x382541.stickerMessage) {
              let _0xb6dc2e = await _0x4f2983.downloadAndSaveMediaMessage(_0x382541.stickerMessage);
              let _0x4dce0e = new Sticker(_0xb6dc2e, {
                'pack': "ALONE-MD-tag",
                'type': StickerTypes.CROPPED,
                'categories': ['🤩', '🎉'],
                'id': "12345",
                'quality': 0x46,
                'background': "transparent"
              });
              const _0x55c322 = await _0x4dce0e.toBuffer();
              _0x5785c1 = {
                'sticker': _0x55c322,
                'mentions': _0x3299b2
              };
            } else {
              _0x5785c1 = {
                'text': _0x382541.conversation,
                'mentions': _0x3299b2
              };
            }
          }
        }
      }
      _0x4f2983.sendMessage(_0x3e8471, _0x5785c1);
    } else {
      if (!_0x187e77 || !_0x187e77[0x0]) {
        _0x49ff71("Enter the text to announce or mention the message to announce");
        ;
        return;
      }
      ;
      _0x4f2983.sendMessage(_0x3e8471, {
        'text': _0x187e77.join(" "),
        'mentions': _0x3299b2
      });
    }
  } else {
    _0x49ff71("Command reserved for administrators.");
  }
});
const cron = require("../bdd/cron");
zokou({
  'nomCom': 'automute',
  'categorie': "Group"
}, async (_0x10b1ce, _0x424eb9, _0x532c32) => {
  const {
    arg: _0x280cdb,
    repondre: _0x37cc4f,
    verifAdmin: _0x497043
  } = _0x532c32;
  if (!_0x497043) {
    _0x37cc4f("You are not an administrator of the group");
    return;
  }
  let _0x1ea136 = await cron.getCronById(_0x10b1ce);
  if (!_0x280cdb || _0x280cdb.length === 0x0) {
    let _0x324cc4;
    if (!_0x1ea136 || !_0x1ea136.mute_at) {
      _0x324cc4 = "No time set for automatic mute";
    } else {
      const [_0x2db06f, _0x4bca6b] = _0x1ea136.mute_at.split(':');
      _0x324cc4 = "The group will be muted at " + _0x2db06f + ':' + _0x4bca6b;
    }
    const _0x169888 = "*State:* " + _0x324cc4 + "\n\n" + "*Instructions:* To activate automatic mute, add the minute and hour after the command separated by ':'.\n" + "Example: automute 9:30\n" + "To delete the automatic mute, use the command *automute del*";
    _0x37cc4f(_0x169888);
    return;
  } else {
    const _0x205bc6 = _0x280cdb.join(" ");
    if (_0x205bc6.toLowerCase() === "del") {
      if (!_0x1ea136) {
        _0x37cc4f("No cronometrage is active");
      } else {
        await cron.delCron(_0x10b1ce);
        _0x37cc4f("The automatic mute has been removed; restart to apply changes");
        exec("pm2 restart all");
      }
    } else {
      if (_0x205bc6.includes(':')) {
        const [_0x40ce52, _0x13a86d] = _0x205bc6.split(':');
        if (isNaN(_0x40ce52) || isNaN(_0x13a86d) || _0x40ce52 < 0x0 || _0x40ce52 > 0x17 || _0x13a86d < 0x0 || _0x13a86d > 0x3b) {
          _0x37cc4f("Please enter a valid time with hour (0-23) and minute (0-59) separated by :");
          return;
        }
        await cron.addCron(_0x10b1ce, "mute_at", _0x205bc6);
        _0x37cc4f("Setting up automatic mute for " + _0x205bc6 + "; restart to apply changes");
        exec("pm2 restart all");
      } else {
        _0x37cc4f("Please enter a valid time with hour and minute separated by :");
      }
    }
  }
});
zokou({
  'nomCom': "autounmute",
  'categorie': "Group"
}, async (_0x574098, _0xc347a9, _0x223294) => {
  const {
    arg: _0x4eca3c,
    repondre: _0xc39383,
    verifAdmin: _0x22f74c
  } = _0x223294;
  if (!_0x22f74c) {
    _0xc39383("You are not an administrator of the group");
    return;
  }
  group_cron = await cron.getCronById(_0x574098);
  if (!_0x4eca3c || _0x4eca3c.length == 0x0) {
    let _0x250b1c;
    if (group_cron == null || group_cron.unmute_at == null) {
      _0x250b1c = "No time set for autounmute";
    } else {
      _0x250b1c = "The group will be un-muted at " + group_cron.unmute_at.split(':')[0x0] + "H " + group_cron.unmute_at.split(':')[0x1];
    }
    let _0x19b573 = "* *State:* " + _0x250b1c + "\n      * *Instructions:* To activate autounmute, add the minute and hour after the command separated by ':'\n      Example autounmute 7:30\n      * To delete autounmute, use the command *autounmute del*";
    _0xc39383(_0x19b573);
    return;
  } else {
    let _0x4e2b17 = _0x4eca3c.join(" ");
    if (_0x4e2b17.toLowerCase() === 'del') {
      if (group_cron == null) {
        _0xc39383("No cronometrage has been activated");
      } else {
        await cron.delCron(_0x574098);
        _0xc39383("The autounmute has been removed; restart to apply the changes").then(() => {
          exec("pm2 restart all");
        });
      }
    } else if (_0x4e2b17.includes(':')) {
      await cron.addCron(_0x574098, 'unmute_at', _0x4e2b17);
      _0xc39383("Setting up autounmute for " + _0x4e2b17 + "; restart to apply the changes").then(() => {
        exec("pm2 restart all");
      });
    } else {
      _0xc39383("Please enter a valid time with hour and minute separated by :");
    }
  }
});
zokou({
  'nomCom': "fkick",
  'categorie': "Group"
}, async (_0x4e526c, _0x54ddc5, _0x4891b0) => {
  const {
    arg: _0x29dc40,
    repondre: _0x2f0614,
    verifAdmin: _0x5daf8c,
    superUser: _0x41d777,
    verifZokouAdmin: _0x4c8f6c
  } = _0x4891b0;
  if (_0x5daf8c || _0x41d777) {
    if (!_0x4c8f6c) {
      _0x2f0614("You need administrative rights to perform this command");
      return;
    }
    if (!_0x29dc40 || _0x29dc40.length == 0x0) {
      _0x2f0614("Please enter the country code whose members will be removed");
      return;
    }
    let _0x586353 = await _0x54ddc5.groupMetadata(_0x4e526c);
    let _0x3f6d98 = _0x586353.participants;
    for (let _0xa14fe = 0x0; _0xa14fe < _0x3f6d98.length; _0xa14fe++) {
      if (_0x3f6d98[_0xa14fe].id.startsWith(_0x29dc40[0x0]) && _0x3f6d98[_0xa14fe].admin === null) {
        await _0x54ddc5.groupParticipantsUpdate(_0x4e526c, [_0x3f6d98[_0xa14fe].id], "remove");
      }
    }
  } else {
    _0x2f0614("Sorry, you are not an administrator of the group");
  }
});
zokou({
  'nomCom': "nsfw",
  'categorie': "Group"
}, async (_0x259a50, _0x11935b, _0x3056) => {
  const {
    arg: _0x508ef5,
    repondre: _0x41d002,
    verifAdmin: _0x3fdc79
  } = _0x3056;
  if (!_0x3fdc79) {
    _0x41d002("Sorry, you cannot enable NSFW content without being an administrator of the group");
    return;
  }
  let _0x507f0e = require("../data/hentai");
  let _0x1d3427 = await _0x507f0e.checkFromHentaiList(_0x259a50);
  if (_0x508ef5[0x0] == 'on') {
    if (_0x1d3427) {
      _0x41d002("NSFW content is already active for this group");
      return;
    }
    ;
    await _0x507f0e.addToHentaiList(_0x259a50);
    _0x41d002("NSFW content is now active for this group");
  } else {
    if (_0x508ef5[0x0] == "off") {
      if (!_0x1d3427) {
        _0x41d002("NSFW content is already disabled for this group");
        return;
      }
      ;
      await _0x507f0e.removeFromHentaiList(_0x259a50);
      _0x41d002("NSFW content is now disabled for this group");
    } else {
      _0x41d002("You must enter \"on\" or \"off\"");
    }
  }
});
zokou({
  'nomCom': "antiword",
  'categorie': 'Group',
  'reaction': '🔗'
}, async (_0x22f58b, _0x4939d7, _0x4e7551) => {
  var {
    repondre: _0x2be765,
    arg: _0x95d0ab,
    verifGroupe: _0x4f0817,
    superUser: _0x1f04d1,
    verifAdmin: _0x177ce1
  } = _0x4e7551;
  if (!_0x4f0817) {
    return _0x2be765("*This command is for groups only*");
  }
  if (_0x1f04d1 || _0x177ce1) {
    const _0x547558 = await verifierEtatJid(_0x22f58b);
    try {
      if (!_0x95d0ab || !_0x95d0ab[0x0] || _0x95d0ab === " ") {
        _0x2be765("antiword on to activate the anti-word feature\nantiword off to deactivate the anti-word feature\nantiword action/remove to directly remove the sender without notice\nantiword action/warn to give warnings\nantiword action/delete to remove the word without any sanctions\n\nPlease note that by default, the anti-word feature is set to delete.");
        return;
      }
      ;
      if (_0x95d0ab[0x0] === 'on') {
        if (_0x547558) {
          _0x2be765("the antiword is already activated for this group");
        } else {
          await ajouterOuMettreAJourJid(_0x22f58b, "oui");
          _0x2be765("the antiword is activated successfully");
        }
      } else {
        if (_0x95d0ab[0x0] === "off") {
          if (_0x547558) {
            await ajouterOuMettreAJourJid(_0x22f58b, "non");
            _0x2be765("The antiword has been successfully deactivated");
          } else {
            _0x2be765("antiword is not activated for this group");
          }
        } else {
          if (_0x95d0ab.join('').split('/')[0x0] === 'action') {
            let _0x77788f = _0x95d0ab.join('').split('/')[0x1].toLowerCase();
            if (_0x77788f == 'remove' || _0x77788f == "warn" || _0x77788f == "delete") {
              await mettreAJourAction(_0x22f58b, _0x77788f);
              _0x2be765("The anti-word action has been updated to " + _0x95d0ab.join('').split('/')[0x1]);
            } else {
              _0x2be765("The only actions available are warn, remove, and delete");
            }
          } else {
            _0x2be765("antiword on to activate the anti-word feature\nantiword off to deactivate the anti-word feature\nantiword action/remove to directly remove the word sender without notice\nantiword action/warn to give warnings\nantiword action/delete to remove the word without any sanctions\n\nPlease note that by default, the anti-word feature is set to delete.");
          }
        }
      }
    } catch (_0x22a8b1) {
      _0x2be765(_0x22a8b1);
    }
  } else {
    _0x2be765("You are not entitled to this order");
  }
});
zokou({
  'nomCom': "antilink-all",
  'categorie': "Group",
  'reaction': '🔗'
}, async (_0x18daac, _0x290184, _0x4bd034) => {
  const {
    repondre: _0x71952,
    arg: _0x4c86b9,
    verifGroupe: _0x28df8c,
    superUser: _0x47db3b,
    verifAdmin: _0x2b18e5
  } = _0x4bd034;
  if (!_0x28df8c) {
    return _0x71952("*This Command works in Groups Only*");
  }
  if (_0x47db3b || _0x2b18e5) {
    const _0x4ffabd = await verifierEtatJid(_0x18daac);
    try {
      if (!_0x4c86b9 || !_0x4c86b9[0x0].trim()) {
        _0x71952("Type `antilink-all on` to activate the antilink-all feature\nor `antilink-all off` to deactivate the antilink-all feature\nThen `antilink-all action/remove` to directly remove the link without notice\nor `antilink-all action/warn` to give warnings\nor `antilink-all action/delete` to remove the link without any sanctions\n\nPlease note that by default, the antilink-all feature is set to delete.");
        return;
      }
      const [_0x145c89, _0x261fa8] = _0x4c86b9.join(" ").split('/');
      if (_0x145c89 === 'on') {
        if (_0x4ffabd) {
          _0x71952("Antilink-all is already activated for this group.");
        } else {
          await ajouterOuMettreAJourJid(_0x18daac, "oui");
          _0x71952("The antilink-all feature has been activated successfully.");
        }
      } else {
        if (_0x145c89 === "off") {
          if (_0x4ffabd) {
            await ajouterOuMettreAJourJid(_0x18daac, "non");
            _0x71952("The antilink-all feature has been successfully deactivated.");
          } else {
            _0x71952("Antilink-all is not activated for this group.");
          }
        } else {
          if (_0x145c89 === 'action') {
            const _0x38775d = _0x261fa8.toLowerCase();
            if (["remove", "warn", "delete"].includes(_0x38775d)) {
              await mettreAJourAction(_0x18daac, _0x38775d);
              _0x71952("The anti-link action has been updated to " + _0x38775d + '.');
            } else {
              _0x71952("The only actions available are `warn`, `remove`, and `delete`.");
            }
          } else {
            _0x71952("Type `antilink-all on` to activate the antilink-all feature\nor `antilink-all off` to deactivate the antilink-all feature\nor `antilink-all action/remove` to directly remove the link without notice\nor `antilink-all action/warn` to give warnings\nor `antilink-all action/delete` to remove the link without any sanctions\n\nPlease note that by default, the antilink-all feature is set to delete.\n\n*KEEP USING ALPHA-MD*");
          }
        }
      }
    } catch (_0x5483c0) {
      _0x71952("Error: " + _0x5483c0.message);
    }
  } else {
    _0x71952("You are not allowed to use this command.");
  }
});
