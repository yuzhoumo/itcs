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
  // Caught and passed down to the errorHandler middleware
  const { url } = req.params;

  const timestamp = Date.now();
  const snapshotHash = null;

  //   const projectId = "1zwEmKfT6i3cKKdlFee4rTQyHB8";
  //   const projectSecret = "a066b3b0b6fefb67c3c8937f63a045c5";
  //   const auth =
  //     "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  //   const ipfs = IpfsClient.create({
  //     host: "ipfs.infura.io",
  //     port: 5001,
  //     protocol: "https",
  //     headers: {
  //       authorization: auth,
  //     },
  //   });

  const orbitdb = await OrbitDB.createInstance(ipfs);

  const db = await orbitdb.keyvalue("snapshot-details-" + url.toString());
  await db.load();

  const hash = await db.put(timestamp, { snapshotHash });
  console.log(hash);

  //   const value = db.get(timestamp);
  //   console.log(value);

  //   const allValues = db.all;
  //   console.log(allValues);

  res.send({ timestamp, snapshotHash });
  await orbitdb.disconnect();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
