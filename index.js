// Importing libraries
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cookieParser = require("cookie-parser");

// Load environment variables from a .env file into process.env
require("dotenv").config();
const port = process.env.PORT;

// Use middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Create news route for testing
app.get("/api/news", (req, res) => {
  res.json({ msg: "Success" });
});

io.on("connection", socket => {
  socket.emit("botReply", {
    sender: "bot",
    dataType: "text",
    data: "Hi!",
    clientId: socket.id
  });
  socket.on("userReply", data => {
    socket.emit("botReply", {
      sender: "bot",
      dataType: "text",
      data: `I received this Message: ${data.data}`
    });

    console.log(data);
  });
});

// Starting server.
http.listen(port, () => console.log(`Server is listening on port: ${port}`));
