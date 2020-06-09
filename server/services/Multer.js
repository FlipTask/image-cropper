const multer = require("multer");
const path = require("path");
const fs = require("fs");

const dir = "./upload";

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.resolve(__dirname, `../${dir}`));
    },
    filename: (req, file, callback) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            const message = `${file.originalname} is invalid. Only accept png/jpeg.`;
            return callback(message, null);
        }
        return callback(null, file.originalname);
    }
});

const upload = multer({ storage }).single("file");


export default (req, res) => {
    upload(req, res, (err) => {
        console.log(err);
        if (err instanceof multer.MulterError) {
            return res.status(500).send({
                success: false,
                url: null,
                message: "Something went wrong !"

            });
        } if (err) {
            // An unknown error occurred when uploading.
            return res.status(500).send({
                success: false,
                url: null,
                message: "Something went wrong !"

            });
        }

        return res.status(200).send({
            success: true,
            message: "Image uploaded successfully !"
        });
    });
};
