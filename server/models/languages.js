var mongoose = require("mongoose");

var Languages = mongoose.Schema({
  code: String
});

module.exports =  mongoose.model("languages", Languages);

