import React from "react";
import ImageCropper from "./ImageCropper";

const ImageOverLay = () => (
    <div className="image-overlay">
        <p>Incorrect Dimensions</p>
        <p>Dimension of the image should be 1024 x 1024</p>
    </div>
);
const ImagePreview = ({ placeholder, imageUrl }) => (
    <div className="crop-container" style={{
        height: `${placeholder.height}px`,
        width: `${placeholder.width}px`,
        position: "relative"
    }}>
        <ImageOverLay />
        <img
            src={imageUrl}
            style={{
                width: `${placeholder.width}px`,
                height: `${placeholder.height}px`,
                margin: "auto",
                display: "block",
                objectPosition: "center",
                objectFit: "contain"
            }}
        />
    </div>
);

const ImagePlaceholder = ({
    placeholder,
    imageUrl,
    correctDimensions,
    file
}) => (
    <li className="image-wrapper">
        <p className="placeholder-name">{placeholder.name} ({placeholder.width} X {placeholder.height})</p>
        <div className={"image-placeholder"}>
            {
                imageUrl
                    ? <React.Fragment>
                        {
                            correctDimensions
                                ? <ImageCropper
                                    file={file}
                                    imageUrl={imageUrl}
                                    placeholder={placeholder}
                                />
                                : <ImagePreview placeholder={placeholder} imageUrl={imageUrl}/>
                        }
                    </React.Fragment>
                    : <div className="image-placeholder text-placeholder" style={{
                        height: `${placeholder.height}px`,
                        width: `${placeholder.width}px`
                    }}>
                        <span>{placeholder.width} X {placeholder.height}</span>
                    </div>
            }
        </div>
    </li>
);

export default ImagePlaceholder;
