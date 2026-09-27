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
const fs = require("fs");
const crypto = require("crypto");

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
// app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(express.urlencoded({extended: true}));
// Only our own front-end may call the API (comma-separated list in CLIENT_URL).
const allowedOrigins = (process.env.CLIENT_URL || "https://social-mern-front.vercel.app,http://localhost:3000")
  .split(",")
  .map((o) => o.trim());
app.use(cors({ origin: allowedOrigins }));

// Uploads: the server picks a random file name (never the one sent by the browser,
// which allowed overwriting any file with names like "../../app.js"), images only, 5 MB max.
const IMAGES_DIR = path.join(__dirname, "public/images");
const IMAGE_TYPES = {
  "image/jpeg": { ext: ".jpg", magic: [Buffer.from([0xff, 0xd8, 0xff])] },
  "image/png": { ext: ".png", magic: [Buffer.from([0x89, 0x50, 0x4e, 0x47])] },
  "image/gif": { ext: ".gif", magic: [Buffer.from("GIF87a"), Buffer.from("GIF89a")] },
  "image/webp": { ext: ".webp", magic: [Buffer.from("RIFF")] },
};

const storage = multer.diskStorage({
  destination: IMAGES_DIR,
  filename: (req, file, cb) => {
    cb(null, crypto.randomUUID() + IMAGE_TYPES[file.mimetype].ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (!IMAGE_TYPES[file.mimetype]) return cb(new Error("Only JPG, PNG, GIF or WEBP images are allowed"));
    cb(null, true);
  },
});

app.post("/server/upload", (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      const tooBig = err.code === "LIMIT_FILE_SIZE";
      return res.status(tooBig ? 413 : 400).json(tooBig ? "Image too large (5 MB max)" : err.message);
    }
    if (!req.file) return res.status(400).json("No file received");

    // Check the real content, not just the type announced by the browser.
    const head = Buffer.alloc(12);
    const fd = fs.openSync(req.file.path, "r");
    fs.readSync(fd, head, 0, 12, 0);
    fs.closeSync(fd);
    const { magic } = IMAGE_TYPES[req.file.mimetype];
    if (!magic.some((m) => head.subarray(0, m.length).equals(m))) {
      fs.rmSync(req.file.path, { force: true });
      return res.status(400).json("The file is not a valid image");
    }
    return res.status(200).json({ filename: req.file.filename });
  });
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

// Unknown routes. (The old app.get('*') crashed Express 5 at startup and hid the API routes.)
app.use((req, res) => {
  res.status(404).json("Not found");
});






