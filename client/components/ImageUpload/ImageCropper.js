import React from "react";
import Cropper from "react-easy-crop";
import { connect } from "react-redux";
import getCroppedImage from "./CropImage";
import Loader from "../Loader";
import {
    uploadImage
} from "../../actions";

class ImageCropper extends React.Component {
    constructor(props) {
        super(props);
        // calculating min zoom to fit placeholder
        const zoomFactor = props.placeholder.width / props.placeholder.height;
        this.state = {
            croppedImage: null,
            minZoom: zoomFactor < 1 ? 1 : zoomFactor,
            crop: {
                x: 0,
                y: 0
            },
            zoom: zoomFactor < 1 ? 1 : zoomFactor,
            aspect: 4 / 3,
            croppedAreaPixels: {}
        };
    }

    onCropChange = (crop) => {
        // console.log(crop);
        this.setState({ crop });
    }

    onCropComplete = (croppedArea, croppedAreaPixels) => {
        this.setState({
            croppedAreaPixels: {
                ...croppedAreaPixels
            }
        });
    }

    onZoomChange = (zoom) => {
        this.setState({ zoom });
    }

    downloadImage = (e) => {
        e.preventDefault();
        const a = document.createElement("a");
        a.href = this.state.croppedImage.url;
        a.setAttribute("download", this.state.croppedImage.file.name);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    cropImage = async (e) => {
        e.preventDefault();
        const { imageUrl, placeholder, file } = this.props;
        const { height, width } = placeholder;

        const croppedImage = await getCroppedImage(
            imageUrl,
            this.state.croppedAreaPixels,
            0,
            height,
            width,
            file
        );

        const newImageName = `${Date.now()}_${width}_${height}.${file.type.split("/")[1]}`;
        const croppedFile = new File([croppedImage.file], newImageName, { type: file.type });

        this.setState({
            croppedImage: {
                ...croppedImage,
                file: croppedFile
            }
        });
    }

    resetCroppedImage = (e) => {
        e.preventDefault();
        this.setState({
            croppedImage: null
        });
    }

    uploadImage = async (e) => {
        e.preventDefault();

        const { placeholder } = this.props;
        const { id } = placeholder;

        const { croppedImage } = this.state;

        this.props.uploadImage(croppedImage.file, id);
    }

    render() {
        const {
            placeholder,
            imageUrl
        } = this.props;
        const {
            height,
            width,
            isLoading,
            loadingText,
            error
        } = placeholder;
        return (
            <React.Fragment>
                <div className="crop-container" style={{
                    height: `${height}px`,
                    width: `${width}px`,
                    position: "relative"
                }}>
                    {
                        isLoading
                            ? <Loader error={error} progress={loadingText}/>
                            : ""
                    }
                    {
                        this.state.croppedImage
                            ? <img src={this.state.croppedImage.url} />
                            : <Cropper
                                minZoom={this.state.minZoom}
                                cropSize={{ height, width }}
                                image={imageUrl}
                                crop={this.state.crop}
                                zoom={this.state.zoom}
                                aspect={this.state.aspect}
                                onCropChange={this.onCropChange}
                                onCropComplete={this.onCropComplete}
                                onZoomChange={this.onZoomChange}
                                restrictPosition={true}
                            />
                    }
                </div>
                <div className="crop-actions">
                    <button
                        type="button"
                        onClick={
                            this.state.croppedImage ? this.resetCroppedImage : this.cropImage
                        }
                        className="btn btn-danger-line"
                    >
                        {this.state.croppedImage ? "Edit" : "Crop"}
                    </button>
                    <button
                        type="button"
                        className={`btn btn-primary-line ${!this.state.croppedImage ? "disabled" : ""}`}
                        onClick={this.uploadImage}
                    >Save</button>
                    <button
                        type="button"
                        className={`btn btn-success-line ${!this.state.croppedImage ? "disabled" : ""}`}
                        onClick={this.downloadImage}
                    >Download</button>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(() => ({}), {
    uploadImage
})(ImageCropper);
