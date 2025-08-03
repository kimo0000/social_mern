const express = require("express");
const app = express();
const port = process.env.PORT || 8800;
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require("cors");

const multer = require('multer');
const path = require("path");

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const ConversationRoute = require('./routes/Conversation');
const MessageRoute = require('./routes/Message');


dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
.then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
  });
})
.catch((err) => {
  console.log(err);
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(express.urlencoded({extended: true}));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
})

const upload = multer({storage});
app.post('/server/upload', upload.single('file'), (req, res) => {
  try { 
    return res.status(200).json('File uploaded successfully');      
  } catch(err) {
    console.log("Error uploading file:", err);
  }
});


// Home Page
app.get("/", (req, res) => {
  res.send("API is running......");
});

// authentication & user action
app.use("/server/users", userRoute);
app.use("/server/auth", authRoute);
app.use("/server/posts", postRoute);
app.use("/server/conversations", ConversationRoute);
app.use("/server/messages", MessageRoute);






