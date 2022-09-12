const express = require("express");
const app = express();
const path = require("path");
const { conn, Color } = require("./db");
const { faker } = require("@faker-js/faker");

app.use("/dist", express.static("dist"));
app.use("/assets", express.static("assets"));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/api/colors", async (req, res, next) => {
  try {
    res.send(await Color.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/colors", async (req, res, next) => {
  try {
    res.send(await Color.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/colors/:id", async (req, res, next) => {
  try {
    const color = await Color.findByPk(req.params.id);
    await color.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.use((req, res) => {
  res.status(404).send(`<p>We hit a snag! <a href="/"> Go Back </a></p>`);
});

app.use((ex, req, res, next) => {
  res.status(500).send(`<p>${ex.message}</p>`);
});

const init = async () => {
  try {
    await conn.sync({ force: true });
    await Promise.all([
      Color.create({ rgb: faker.color.rgb() }),
      Color.create({ rgb: faker.color.rgb() }),
      Color.create({ rgb: faker.color.rgb() }),
      Color.create({ rgb: faker.color.rgb() }),
      Color.create({ rgb: faker.color.rgb() }),
    ]);
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
