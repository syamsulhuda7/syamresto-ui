interface HomeCardProps {
  category: string;
  title: string;
  src: string;
  container?: string;
  className?: string;
  titleStyle?: string;
  categoryStyle?: string;
  discount?: string;
  loading?: "eager" | "lazy" | undefined;
  // index: number;
  // handleImageLoad?: (index: number) => void;
  // loadedImages?: boolean[];
}
export const HomeCard = ({
  category,
  title,
  src,
  container,
  className,
  titleStyle,
  categoryStyle,
  discount,
  loading,
}: // index,
// handleImageLoad,
// loadedImages,
HomeCardProps) => {
  return (
    <div
      className={`font-adlamDisplay relative overflow-hidden shadow-md shadow-black ${className}`}
    >
      <div className="w-full h-full">
        {/* {!loadedImages[index] && <div className="placeholder"></div>} */}
        <img
          // onLoad={() => handleImageLoad(index)}
          src={src}
          alt={src}
          className={`w-full h-full object-cover`}
          loading={loading}
          // className={`${
          //   loadedImages[index] ? "w-full h-full object-cover" : "loading"
          // }`}
        />
      </div>
      {discount && (
        <div className="absolute top-0 right-2 md:right-5 font-bold text-xs md:text-sm xl:text-xl text-white px-2 md:px-3 py-1 md:py-2 flex items-center justify-center bg-drk/80">
          {discount}
        </div>
      )}
      <div
        className={`absolute bottom-0 left-0 w-full h-full flex flex-col items-start justify-end p-6 bg-gradient-to-tr from-black via-transparent to-transparent ${container}`}
      >
        <h3
          className={`text-org text-[10px] md:text-[12px] xl:text-sm font-semibold ${categoryStyle}`}
        >
          {category}
        </h3>
        <h3
          className={`text-white text-xs md:text-base xl:text-xl font-semibold ${titleStyle}`}
        >
          {title}
        </h3>
      </div>
    </div>
  );
};
