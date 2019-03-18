const mongoose = require("mongoose");

const SessionsSchema = mongoose.Schema(
  {
    loginTime: Date,
    logoutTime: Date,
    ip: String,
    location: String,
    accessRoute: String,
    cookies: Array,
    hostname: String,
    userTags: Array
  },
  {
    timestamps: true
  }
);
mongoose.set("useFindAndModify", false);
module.exports = mongoose.model("Sessions", SessionsSchema);
