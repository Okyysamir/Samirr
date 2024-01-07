

module.exports.config = {
  name: "download",
  version: "1.0.0",
  permission: 0,
  prefix: true,
  credits: "Nayan",
  description: "Social Media Video Downloader",
  category: "user",
  usages: [
    "/download [Facebook video link]",
    "/download [TikTok video link]",
    "/download [YouTube video link]",
    "/download [Instagram video link]",
  ],
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const content = args.join(" ");
  let msg = "";

  if (module.exports.config.credits !== "Nayan") {
    return api.sendMessage(
      "Warning: You have changed the credits value. Please replace it with the original one.",
      event.threadID,
      event.messageID
    );
  }

  const sendWaitingMessage = async (message) => {
    const vid = (
      await axios.get(
        'https://i.imgur.com/rvreDPU.gif',
        { responseType: 'stream' }
      )
    ).data;
    return await api.sendMessage({ ...message }, event.threadID);
  };

  if (content.includes("https://fb.watch/") || content.includes("https://www.facebook.com")) {
    const fbApiResponse = await axios.get(`https://api.samirthakuri.repl.co/api/videofb?url=${content}`);
    const fbVideoUrl = fbApiResponse.data.video;
    const waitingMessage = await sendWaitingMessage({ body: "Downloading Facebook video. Please wait..." });

    const fbVideoData = (await axios.get(fbVideoUrl, {
      responseType: "arraybuffer",
    })).data;
    fs.writeFileSync(__dirname + "/cache/fbVideo.mp4", Buffer.from(fbVideoData, "utf-8"));

    msg = "Facebook video download success";

    api.sendMessage(
      {
        body: msg,
        attachment: fs.createReadStream(__dirname + "/cache/fbVideo.mp4"),
      },
      event.threadID
    );

    setTimeout(() => {
      api.unsendMessage(waitingMessage.messageID);
    }, 9000);
  } else if (
    content.includes("https://vt.tiktok.com/") ||
    content.includes("https://tiktok.com/") ||
    content.includes("https://www.tiktok.com")
  ) {
    const tiktokApiResponse = await axios.get(`https://api.nayan-project.repl.co/tiktok/downloadvideo?url=${content}`);
    const tiktokVideoUrl = tiktokApiResponse.data.data.play;
    const { author, digg_count, comment_count, play_count, share_count, download_count, title, duration, region } = tiktokApiResponse.data.data;
    const waitingMessage = await sendWaitingMessage({ body: "Downloading TikTok video. Please wait....!🥱🌸" });

    const tiktokVideoData = (await axios.get(tiktokVideoUrl, {
      responseType: "arraybuffer",
    })).data;
    fs.writeFileSync(__dirname + "/cache/tiktokVideo.mp4", Buffer.from(tiktokVideoData, "utf-8"));

    msg = `====[ 𝐓𝐈𝐊𝐓𝐎𝐊 𝐕𝐈𝐃𝐄𝐎 ]====\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🌎 𝐂𝐎𝐔𝐍𝐓𝐑𝐘: ${region}\n📱 𝐍𝐈𝐂𝐊𝐍𝐀𝐍𝐄: ${author.nickname}\n🎐 𝐔𝐒𝐄𝐑 𝐍𝐀𝐌𝐄: ${author.unique_id}\n👁 𝐕𝐈𝐄𝐖𝐒: ${digg_count}\n💭 𝐂𝐎𝐌𝐌𝐄𝐍𝐓: ${comment_count}\n👀 𝐏𝐋𝐀𝐘: ${play_count}\n🔗 𝐒𝐇𝐀𝐑𝐄: ${share_count}\n📥 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃: ${download_count}\n⏱ 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠 𝐓𝐢𝐦𝐞: ${duration} second\n💬 𝗧𝗶𝘁𝗹𝗲: ${title}`;

    api.sendMessage(
      {
        body: msg,
        attachment: fs.createReadStream(__dirname + "/cache/tiktokVideo.mp4"),
      },
      event.threadID
    );

    setTimeout(() => {
      api.unsendMessage(waitingMessage.messageID);
    }, 9000);
  } else if (content.includes("https://instagram.com") || content.includes("https://www.instagram.com")) {
    const instagramApiResponse = await axios.get(`https://for-devs.rishadapis.repl.co/api/instadl?url=${content}&apikey=fuck`);
    const instagramVideoUrl = instagramApiResponse.data.video;
    const waitingMessage = await sendWaitingMessage({ body: "Downloading Instagram video. Please wait..." });

    const instagramVideoData = (await axios.get(instagramVideoUrl, {
      responseType: "arraybuffer",
    })).data;
    fs.writeFileSync(__dirname + "/cache/instagramVideo.mp4", Buffer.from(instagramVideoData, "utf-8"));

    msg = "Instagram video download success";

    api.sendMessage(
      {
        body: msg,
        attachment: fs.createReadStream(__dirname + "/cache/instagramVideo.mp4"),
      },
      event.threadID
    );

    setTimeout(() => {
      api.unsendMessage(waitingMessage.messageID);
    }, 9000);
  } else if (content.includes("https://youtu.be/")) {
    // YouTube video download logic
    const youtubeApiResponse = await axios.get(`https://api.nayan-project.repl.co/nayan/yt?url=${content}`);
    const youtubeVideoUrl = youtubeApiResponse.data.links[1].url;
    const title = youtubeApiResponse.data.description;
    const waitingMessage = await sendWaitingMessage({ body: "Downloading YouTube video. Please wait..." });
    const youtubeVideoData = (await axios.get(youtubeVideoUrl, {
      responseType: "arraybuffer",
    })).data;
    fs.writeFileSync(__dirname + "/cache/youtubeVideo.mp4", Buffer.from(youtubeVideoData, "utf-8"));

    msg = `YouTube video download success\n${title}`;

    api.sendMessage(
      {
        body: msg,
        attachment: fs.createReadStream(__dirname + "/cache/youtubeVideo.mp4"),
      },
      event.threadID
    );

    setTimeout(() => {
      api.unsendMessage(waitingMessage.messageID);
    }, 9000);
  } else {
    msg = "Unsupported video platform. Please provide a valid Facebook, TikTok, Twitter, Instagram, or YouTube video link.";
    api.sendMessage({ body: msg }, event.threadID);
  }
};