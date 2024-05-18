const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.get("/", async (req, res) => {
  try {
    const id = req.query.url;
    if (id && ytdl.validateID(id)) {
      const info = await ytdl.getInfo(id);
      res
        .sendStatus(200)
        .json({ url: info.formats.filter((i) => i.itag === 18)[0].url });
    } else {
      res.sendStatus(404).send();
    }
  } catch (error) {
    res.sendStatus(500).json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
