import express from "express";
import Path from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ServeWeb from "./helpers/ServeWeb";

const { createProxyMiddleware } = require("http-proxy-middleware");
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

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const apiProxy = createProxyMiddleware("/api/v1", {
    target: `${process.env.API_URL}`,
    // secure: false,
    changeOrigin: true
});
app.use(apiProxy);


app.get("/*", ServeWeb);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`);
    console.log("Press Ctrl+C to quit.");
});
