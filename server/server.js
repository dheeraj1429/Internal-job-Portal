require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const databaseConnection = require("./model/database/db");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server);
const socketIoConnection = require("./socketIo/socketIo");

// middlewares
app.set("view engine", "ejs");
app.use(
   cors({
      origin: "http://localhost:3000",
   })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "upload")));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(path.resolve(__dirname), "build")));
app.use(logger());

// routs
const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");
const indexRoute = require("./routes/indexRoute");

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/index", indexRoute);

// for build file
app.get("*", (req, res) => {
   res.sendFile(path.join(path.resolve(__dirname), "build", "index.html"));
});

// server listen
databaseConnection(() =>
   server.listen(PORT, () => {
      console.log(`server running in port ${PORT}`);
      // socket io connection function
      socketIoConnection(io);
   })
);