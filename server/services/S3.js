
const S3 = require("aws-sdk/clients/s3");

const { env } = process;
const s3 = new S3({
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_KEY,
    region: "ap-south-1"
});

export default (req, res) => {
    if (String(env.STORE_IMG_IN_S3) === "true") {
        let fileUrl = null;
        const params = {
            Bucket: env.S3_BUCKET_NAME,
            Key: req.query.objectName,
            Expires: 60 * 5, // expiry time
            // ACL: "bucket-owner-full-control",
            ContentType: req.query.contentType
        };
        s3.getSignedUrl("putObject", params, (err, url) => {
            if (err) {
                console.log("Error getting presigned url from AWS S3");
                return res.json({
                    success: false,
                    message: "Pre-Signed URL error",
                    url: fileUrl
                });
            }
            fileUrl = url;
            console.log("Presigned URL: ", fileUrl);
            return res.json({
                destination: "cloud",
                success: true,
                message: "AWS SDK S3 Pre-signed urls generated successfully.",
                url: fileUrl
            });
        });
    }
    return res.json({
        destination: "local",
        success: true,
        message: "Uploading image in local",
        url: `${env.HOST_URL}/api/v1/upload`
    });
};
