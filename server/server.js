import express from "express";
import Path from "path";
import * as bodyParser from "body-parser";
import ServeWeb from "./helpers/ServeWeb";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";


const app = express();
    
app.use('/static', express.static(Path.resolve(__dirname,"./../client-build")));
app.use('/assets/', express.static(Path.resolve(__dirname,"./../assets")));

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.get("/*",ServeWeb);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
});   