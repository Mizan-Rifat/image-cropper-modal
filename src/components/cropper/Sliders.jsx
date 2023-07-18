import { useImageCropContext } from '@/providers/ImageCropProvider';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  MinusIcon,
  PlusIcon
} from '@heroicons/react/24/solid';
import classNames from 'classnames';

export const ZoomSlider = ({ className }) => {
  const { zoom, setZoom, handleZoomIn, handleZoomOut, MAX_ZOOM, MIN_ZOOM, ZOOM_STEP } =
    useImageCropContext();

  return (
    <div className={classNames(className, 'flex items-center justify-center gap-2')}>
      <button className="p-1" onClick={handleZoomOut}>
        <MinusIcon className="text-gray-400 w-4" />
      </button>
      <input
        type="range"
        name="volju"
        min={MIN_ZOOM}
        max={MAX_ZOOM}
        step={ZOOM_STEP}
        value={zoom}
        onChange={e => {
          setZoom(Number(e.target.value));
        }}
      />
      <button className="p-1" onClick={handleZoomIn}>
        <PlusIcon className="text-gray-400 w-4" />
      </button>
    </div>
  );
};

export const RotationSlider = ({ className }) => {
  const {
    rotation,
    setRotation,
    MAX_ROTATION,
    MIN_ROTATION,
    ROTATION_STEP,
    handleRotateAntiCw,
    handleRotateCw
  } = useImageCropContext();

  return (
    <div className={classNames(className, 'flex items-center justify-center gap-2')}>
      <button className="p-1" onClick={handleRotateAntiCw}>
        <ArrowUturnLeftIcon className="text-gray-400 w-4" />
      </button>
      <input
        type="range"
        name="volju"
        min={MIN_ROTATION}
        max={MAX_ROTATION}
        step={ROTATION_STEP}
        value={rotation}
        onChange={e => {
          setRotation(Number(e.target.value));
        }}
      />
      <button className="p-1" onClick={handleRotateCw}>
        <ArrowUturnRightIcon className="text-gray-400 w-4" />
      </button>
    </div>
  );
};
