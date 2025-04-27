const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello depuis assistant-iot-analysis !");
});
app.get("/analysis", (req, res) => {
    res.json({ status: "ok", message: "Service Analysis reachable" });
  });
  

app.listen(port, "0.0.0.0", () => {
  console.log(`🟢 Analysis app running on http://localhost:${port}`);
});
