const createImage = (url) => new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
});

function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
}

const resizeImage = ({
    width, height, file, name
}, resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        // eslint-disable-next-line no-unused-expressions
        img.onload = () => {
            const elem = document.createElement("canvas");
            elem.width = width;
            elem.height = height;
            const ctx = elem.getContext("2d");
            // img.width and img.height will contain the original dimensions
            ctx.drawImage(img, 0, 0, width, height);
            ctx.canvas.toBlob((blob) => {
                file = new File([blob], name, {
                    type: "image/jpeg",
                    lastModified: Date.now()
                });
                resolve({
                    file,
                    url: URL.createObjectURL(file)
                });
            }, "image/jpeg", 1);
        },
        reader.onerror = (error) => console.log(error);
    };
};

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export default async function getCroppedImg(
    imageSrc, pixelCrop, rotation = 0, requiredHeight, requiredWidth, originalImage
) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // set each dimensions to double largest dimension to allow for a safe area for
    // the image to rotate in without being clipped by canvas context
    canvas.width = safeArea;
    canvas.height = safeArea;

    // translate canvas context to a central location on image to allow rotating
    // around the center.
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // draw rotated image and store data.
    ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing
    // context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(data, 0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x, 0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y);

    // As Base64 string return canvas.toDataURL('image/jpeg'); As a blob
    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            // resolve({
            //     url: URL.createObjectURL(file),
            //     file
            // });
            resizeImage({
                file, height: requiredHeight, width: requiredWidth, name: originalImage.name
            }, resolve);
        }, "image/jpeg");
    });
}
