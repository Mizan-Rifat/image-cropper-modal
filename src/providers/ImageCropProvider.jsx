/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from 'react';
import getCroppedImg from '@/helpers/cropImage';

const MAX_ZOOM = 3;
const MIN_ZOOM = 1;
const ZOOM_STEP = 0.1;
const MAX_ROTATION = 360;
const MIN_ROTATION = 0;
const ROTATION_STEP = 5;

export const ImageCropContext = createContext({});

const ImageCropProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleZoomIn = () => {
    if (zoom < MAX_ZOOM) {
      setZoom(zoom + ZOOM_STEP * 2);
    }
  };

  const handleZoomOut = () => {
    if (zoom > MIN_ZOOM) {
      setZoom(zoom - ZOOM_STEP * 2);
    }
  };

  const handleRotateCw = () => {
    console.log(rotation);
    setRotation(rotation + ROTATION_STEP);
  };

  const handleRotateAntiCw = () => {
    setRotation(rotation - ROTATION_STEP);
  };

  console.log({ rotation });

  const getCroppedImage = async () => {
    if (image && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
      const imageFile = new File([croppedImage.file], `avatar-${Date.now()}.png`, {
        type: 'image/png'
      });
      return imageFile;
    }
  };

  return (
    <ImageCropContext.Provider
      value={{
        image,
        setImage,
        zoom,
        setZoom,
        rotation,
        setRotation,
        crop,
        setCrop,
        croppedAreaPixels,
        setCroppedAreaPixels,
        onCropComplete,
        getCroppedImage,
        handleZoomIn,
        handleZoomOut,
        handleRotateAntiCw,
        handleRotateCw,
        MAX_ZOOM,
        MIN_ZOOM,
        ZOOM_STEP,
        MAX_ROTATION,
        MIN_ROTATION,
        ROTATION_STEP
      }}
    >
      {children}
    </ImageCropContext.Provider>
  );
};

export const useImageCropContext = () => useContext(ImageCropContext);

export default ImageCropProvider;
