const express = require("express");
const IpfsClient = require("ipfs-http-client");
const OrbitDB = require("orbit-db");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/newSnapshot/:url?", async (req, res) => {
  // Caught and passed down to the errorHandler middleware
  const { url } = req.params;

  const timestamp = Date.now();
  const snapshotHash = null;

  const ipfs = IpfsClient.create({
    host: "localhost",
    port: "5001",
    protocol: "http",
  });
  const orbitdb = await OrbitDB.createInstance(ipfs);

  const db = await orbitdb.keyvalue("snapshot-details-" + url.toString());
  await db.load();

  const hash = await db.put(timestamp, { snapshotHash });
  console.log(hash);

  //     const value = db.get(timestamp);
  //     console.log(value);

  //     const allValues = db.all;
  //     console.log(allValues);

  res.send({ timestamp, snapshotHash });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
