const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: {
    type: String,
    require: true
  },
  desc: {
    type: String,
    max: 500
  },
  img: {
    type: String
  },
  likes: {
    type: Array,
    default: []
  },
  comments: {
    type: Array,
    default: []
  },
},
{
  timestamps: true
}
);

const Posts = mongoose.model("Post", PostSchema);

module.exports = Posts;