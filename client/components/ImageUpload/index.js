import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import ImagePlaceholder from "./ImagePlaceholder";
import Info from "../Info";

class ImageUpload extends Component {
    state = {
        base: {
            imageUrl: "",
            file: {},
            correctDimensions: false
        }
    }

    resetAll = (e) => {
        e.preventDefault();
        this.setState({
            base: {
                imageUrl: "",
                file: {},
                correctDimensions: false
            }
        });
    }

    onDrop = ([file]) => {
        const width = 1024;
        const height = 1024;
        const img = new Image();
        const imageUrl = URL.createObjectURL(file);
        img.src = imageUrl;
        img.onload = () => {
            let correctDimensions = false;
            if (img.width === width && img.height === height) {
                correctDimensions = true;
            }
            this.setState({
                base: {
                    imageUrl,
                    file,
                    correctDimensions
                }
            });
        };
    }

    render() {
        const {
            imageHolders
        } = this.props;
        return (
            <React.Fragment>
                <Info />
                <Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png" multiple={false}>
                    {({ getRootProps, getInputProps }) => (
                        <section className="image-upload">
                            <div
                                {...getRootProps({ className: "dropzone image-wrapper" })}
                            >
                                <input {...getInputProps()} name={"image-top-be-cropped"}/>
                                <p className="text-light">
                                    <span>Select An Image</span>
                                </p>
                            </div>

                        </section>
                    )}
                </Dropzone>

                <button
                    className="btn btn-danger-line"
                    style={{ marginTop: "1em" }}
                    onClick={this.resetAll}
                >
                    Reset All Images
                </button>

                <ul className="placeholder-list">
                    {
                        imageHolders.map((obj, i) => (
                            <ImagePlaceholder
                                file={this.state.base.file}
                                correctDimensions={this.state.base.correctDimensions}
                                imageUrl={this.state.base.imageUrl}
                                placeholder={obj}
                                key={i}
                            />
                        ))
                    }
                </ul>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ imageHolders }) => ({
    imageHolders: imageHolders.images
});
export default connect(mapStateToProps, {})(ImageUpload);
