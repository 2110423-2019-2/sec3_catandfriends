import React, { Component } from "react";
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import NormalButton from "./NormalButton";
import {
    base64StringtoFile,
    image64toCanvasRef,
    extractImageFileExtensionFromBase64
} from './CropImageFunctions';

const imageMaxSize = 10000000; //10 Mbytes
const acceptFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptFileTypesArray = acceptFileTypes.split(",").map((item) => { return item.trim() })

class ImgDropAndCrop extends Component {
    constructor(props) {
        super(props);
        this.imagePreviewCanvasRef = React.createRef();
        this.state = {
            imgSrc: null,
            crop: {
                aspect: 1 / 1
            }
        };
    }

    verifyFile = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0];
            const currentFileType = currentFile.type;
            const currentFileSize = currentFile.size;
            if (currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large");
                return false;
            }
            if (!acceptFileTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Only images are allowed.");
                return false;
            }
            return true;
        }
    }
    handleOnDrop = (files, rejectedFiles) => {
        console.log(files);
        console.log('rejected files are', rejectedFiles);
        if (rejectedFiles && rejectedFiles.length > 0) {
            this.verifyFile(rejectedFiles);
        }
        if (files && files.length > 0) {
            const isVerified = this.verifyFile(files);
            if (isVerified) {
                // imageBase64Data
                const currentFile = files[0];
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    // console.log(reader.result);
                    this.setState({
                        imgSrc: reader.result
                    });
                }, false);
                reader.readAsDataURL(currentFile);
            }
        }
    }

    handleImageLoaded = (image) => {
        // console.log(Image);
    }
    handleOnCropChange = (crop) => {
        // console.log(crop);
        this.setState({ crop: crop });
        // console.log(this.state);
    }
    handleOnCropComplete = (crop, pixelCrop) => {
        console.log(crop, pixelCrop);

        const canvasRef = this.imagePreviewCanvasRef.current;
        const { imgSrc } = this.state;
        image64toCanvasRef(canvasRef, imgSrc, pixelCrop);
        console.log(canvasRef);

    }
    handleOnSubmit = (event) => {
        event.preventDefault();
        const canvasRef = this.imagePreviewCanvasRef.current;
        const { imgSrc } = this.state;
        const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
        const imageData64 = canvasRef.toDataURL('image/' + fileExtension);
        this.props.triggerParentUpdate(imageData64);
    }

    render() {
        const { imgSrc } = this.state;
        return (
            <div>
                <div className="row justify-content-center" style={{ fontSize: "30px" }}>Edit your picture</div>
                {imgSrc !== null ?
                    <div>
                        <ReactCrop src={imgSrc}
                            crop={this.state.crop}
                            onImageLoaded={this.handleImageLoaded}
                            onComplete={this.handleOnCropComplete}
                            onChange={this.handleOnCropChange} />
                        <br />
                        <div className="row justify-content-center">
                            Preview
                            </div>
                        <div className="row justify-content-center" style={{ marginBottom: "10px" }}>
                            <canvas ref={this.imagePreviewCanvasRef}></canvas>
                        </div>
                        {/* <div className="row justify-content-center">
                            <br></br>
                        </div> */}
                    </div>
                    : <div></div>
                }
                <div className="row justify-content-center">
                    <Dropzone onDrop={this.handleOnDrop} accept={acceptFileTypes} multiple={false} maxSize={imageMaxSize}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="col border justify-content-center">
                                        <div className="row-md-12 justify-content-center" style={{ marginBottom: "10px", marginTop: "10px" }}>
                                            Choose or drag and drop your picture here
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div className="row justify-content-center">
                    <NormalButton color="rgb(76, 182, 181)" onClick={this.handleOnSubmit}>Done</NormalButton>
                </div>
            </div>
        );
    }
}

export default ImgDropAndCrop