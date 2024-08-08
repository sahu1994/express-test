const mongoose = require("mongoose");
require('dotenv').config();


//mongoose.connect("mongodb+srv://sahugirish:9BEuTRFa6zlLWoqY@cluster0.sysve.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
mongoose.connect(process.env.MONGO_URI)

const Schema = mongoose.Schema;
const DataSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, required: true },
  gender: { typpe: Number },
  ip_address: { type: String },
});

const DataModel = mongoose.model("Data", DataSchema);

module.exports = DataModel;