var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BunchSchema = new Schema({
  word : String,
  mean : String,
  eg : Array,
  cf : Array,
  written_date: { type: Date, default: Date.now  }
});

var Bunch = mongoose.model('Bunch', BunchSchema);

module.exports = Bunch;
