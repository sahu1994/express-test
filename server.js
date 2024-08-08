const express = require("express");
const app = express();
const DataModel = require("./model/datasource.js")
const userRounter = require("./routes/usersRouter.js");

const PORT = "3000";

app.use(express.json());
app.use("/users", userRounter);

app.get("/", async (req, res) => {
  try {
    const data = await DataModel.find();
    res.status(200).json({ message: "Data retrieved successfully", data });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve data", details: err });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
