import Image from "next/image";

interface ImageSliderProps {
  images: string[];
}
const ImageSlider = ({ images }: ImageSliderProps) => {
  return (
    <div className="scrollbar-hide w-full overflow-x-auto py-3 ">
      <div className="flex w-max gap-4 cursor-pointer">
        {images.map((src, index) => (
          <div key={index} className="relative h-[280px] w-[280px] flex-shrink-0">
            <Image
              src={src}
              alt={`image${index}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ImageSlider;
