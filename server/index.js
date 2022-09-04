const express = require('express');
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");


mongoose.connect(config.mongoURI,
).then(() => console.log("MongoDB Connected...")).catch(err => console.error("에러 :", err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/api/users", require("./routes/users"));


app.get('/', (req, res) => {
    res.send("Hello World!");
})


app.listen(port, () => {
    console.log(`node and react project port ${port}`);
});
