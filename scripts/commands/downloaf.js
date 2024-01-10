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
  dependencies: {
        'nayan-media-downloader': '',
  }
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const content = args.join(" ");
  const { ytdown, ndown, tikdown, twitterdown } = require("nayan-media-downloader")
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
    const fbApiResponse = await ndown(content);
    console.log(fbApiResponse)
    const fbVideoUrl = fbApiResponse.data[0].url;
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
    const tiktokApiResponse = await tikdown(content);
    const tiktokVideoUrl = tiktokApiResponse.data.video;
    console.log(tiktokApiResponse)
    const waitingMessage = await sendWaitingMessage({ body: "Downloading TikTok video. Please wait....!🥱🌸" });

    const tiktokVideoData = (await axios.get(tiktokVideoUrl, {
      responseType: "arraybuffer",
    })).data;
    fs.writeFileSync(__dirname + "/cache/tiktokVideo.mp4", Buffer.from(tiktokVideoData, "utf-8"));

    msg = `TikTok video download success`;

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
    const instagramApiResponse = await ndown(content);
    const instagramVideoUrl = instagramApiResponse.data[0].url;
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
  } else if (content.includes("https://youtube.com/shorts/") || content.includes("https://youtu.be/")) {
    // YouTube video download logic
    const youtubeApiResponse = await ytdown(content);
    const youtubeVideoUrl = youtubeApiResponse.data.video;
    const title = youtubeApiResponse.data.title;
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
  } else if (content.includes("https://twitter.com/")) {
    const instagramApiResponse = await twitterdown(content);
    const twitterVideoUrl = instagramApiResponse.data.HD;
    const waitingMessage = await sendWaitingMessage({ body: "Downloading Twitter video. Please wait..." });

    const TWITTEEVideoData = (await axios.get(twitterVideoUrl, {
      responseType: "arraybuffer",
    })).data;
    fs.writeFileSync(__dirname + "/cache/instagramVideo.mp4", Buffer.from(TWITTEEVideoData, "utf-8"));

    msg = "Twitter video download success";

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
  } else {
    msg = "Unsupported video platform. Please provide a valid Facebook, TikTok, Twitter, Instagram, or YouTube video link.";
    api.sendMessage({ body: msg }, event.threadID);
  }
};
