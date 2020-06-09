// eslint-disable-next-line no-unused-vars
import dotenv from "dotenv/config";
import express from "express";
import Path from "path";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ServeWeb from "./helpers/ServeWeb";
import getSignedUrl from "./services/S3";
import uploadInLocal from "./services/Multer";

const compression = require("compression");

const app = express();

function shouldCompress(req, res) {
    if (req.headers["x-no-compression"]) return false;
    return compression.filter(req, res);
}
app.use(compression({
    enableBrotli: true,
    level: 6, // set compression level from 1 to 9 (6 by default)
    filter: shouldCompress // set predicate to determine whether to compress
}));


app.use("/static", express.static(Path.resolve(__dirname, "./../client-build")));
app.use("/assets/", express.static(Path.resolve(__dirname, "./../assets")));
app.use(express.static(Path.resolve(__dirname, "./../public")));

app.get("*.js", (req, res, next) => {
    req.url += ".gz";
    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", "text/javascript");
    next();
});

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.put("/api/v1/upload", uploadInLocal);
app.get("/api/v1/signed-url", getSignedUrl);
app.get("/*", ServeWeb);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`);
    console.log("Press Ctrl+C to quit.");
});
