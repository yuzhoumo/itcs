const fetch = require("node-fetch");
const express = require("express");
const IpfsClient = require("ipfs-http-client");
const OrbitDB = require("orbit-db");
const app = express();
const port = 3000;

const ipfs = IpfsClient.create();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/newSnapshot/:url?", async (req, res) => {
  const { url } = req.params;
  encodedUrl = encodeURIComponent(url);

  const data = await fetch(`https://localhost:5000/archive?url=${encodedUrl}`);
  const { timestamp, location } = await data.json();

  const orbitdb = await OrbitDB.createInstance(ipfs);

  const db = await orbitdb.keyvalue("snapshot-details-" + encodedUrl);
  await db.load();

  const hash = await db.put(timestamp, { location });
  console.log(hash);

  const value = db.get(timestamp);
  console.log(value);

  //   const allValues = db.all;
  //   console.log(allValues);

  res.send({ timestamp, location });
  await orbitdb.disconnect();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
