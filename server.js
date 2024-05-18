const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.get("/", async (req, res) => {
  const id = req.query.url;
  try {
    if (id) {
      const info = await ytdl.getInfo(id);

      res
        .status(200)
        .json({ url: info.formats.filter((i) => i.itag === 18)[0].url });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
