import Image from "next/image";

interface ImageSliderProps {
  images: string[];
  onRemove?: (index: number) => void;
}
const ImageSlider = ({ images, onRemove }: ImageSliderProps) => {
  return (
    <div className="scrollbar-hide w-full overflow-x-auto py-3">
      <div className="flex w-max cursor-pointer gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative h-[280px] w-[280px] flex-shrink-0"
          >
            <Image
              src={src}
              alt={`image${index}`}
              fill
              className="object-cover"
            />
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-4 right-5 z-10"
              >
                <Image
                  src="/svgs/common/close-icon.svg"
                  alt="삭제"
                  width={16}
                  height={16}
                />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ImageSlider;
