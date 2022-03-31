const mongooes = require("mongooes");
const channelSchema = new mongoose.Schema({
  channelId: {
    type: String,
    required: true,
    unique: true,
  },
  channelName: {
    type: String,
    required: true,
  },
});
module.exports = mongooes.model("Channel", channelSchema);
