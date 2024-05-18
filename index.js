const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const app = express();
const port = process.env.PORT || 4000;
const cluster = require("node:cluster");
const os = require("os");
const totalCpu = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalCpu; i++) {
    cluster.fork();
  }
} else {
  app.use(cors());
  app.get("/", async (req, res) => {
    try {
      const id = req.query.url;
      if (id && ytdl.validateID(id)) {
        const info = await ytdl.getInfo(id);
        res
          .status(200)
          .json({ url: info.formats.filter((i) => i.itag === 18)[0].url });
      } else {
        res.send(404).send();
      }
    } catch (error) {
      res.send(500).json({ error: error });
    }
  });

  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
}
