import { useState } from "react";
import Cropper from "react-easy-crop";
import "../styles/ImageCropper.css";

const CROP_AREA_ASPECT = 3 / 2;

const Output = ({ croppedArea, file }) => {
  const scale = 100 / croppedArea.width;
  const transform = {
    x: `${-croppedArea.x * scale}%`,
    y: `${-croppedArea.y * scale}%`,
    scale,
    width: "calc(100% + 0.5px)",
    height: "auto"
  };

  const imageStyle = {
    transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    width: transform.width,
    height: transform.height
  };

  return (
    <div
      className="output"
      style={{ paddingBottom: `${100 / CROP_AREA_ASPECT}%` }}
    >
      <img src={file.preview} alt="" style={imageStyle} />
    </div>
  );
};

export default function ImageCropper({ file, setFile }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  return (
    <div className="App">
      <div className="cropper">
        <Cropper
          image={file?.preview}
          aspect={CROP_AREA_ASPECT}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropAreaChange={(croppedArea) => {
            setCroppedArea(croppedArea);
          }}
        />
      </div>
      <div className="viewer">
        <div>{croppedArea && <Output croppedArea={croppedArea} file={file}/>}</div>
      </div>
    </div>
  );
}
