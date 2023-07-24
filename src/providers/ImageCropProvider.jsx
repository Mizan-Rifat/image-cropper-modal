/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from 'react';
import getCroppedImg from '@/helpers/cropImage';

export const ImageCropContext = createContext({});

const ImageCropProvider = ({
  children,
  max_zoom = 3,
  min_zoom = 1,
  zoom_step = 0.1,
  max_rotation = 360,
  min_rotation = 0,
  rotation_step = 5
}) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleZoomIn = () => {
    if (zoom < max_zoom) {
      setZoom(zoom + zoom_step * 2);
    }
  };

  const handleZoomOut = () => {
    if (zoom > min_zoom) {
      setZoom(zoom - zoom_step * 2);
    }
  };

  const handleRotateCw = () => {
    setRotation(rotation + rotation_step);
  };

  const handleRotateAntiCw = () => {
    setRotation(rotation - rotation_step);
  };

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
        max_zoom,
        min_zoom,
        zoom_step,
        max_rotation,
        min_rotation,
        rotation_step
      }}
    >
      {children}
    </ImageCropContext.Provider>
  );
};

export const useImageCropContext = () => useContext(ImageCropContext);

export default ImageCropProvider;
