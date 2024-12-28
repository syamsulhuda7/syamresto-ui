type HomeCardProps = {
  category: string;
  title: string;
  src: string;
  container?: string;
  className?: string;
  titleStyle?: string;
  categoryStyle?: string;
  discount?: string;
};
export const HomeCard = ({
  category,
  title,
  src,
  container,
  className,
  titleStyle,
  categoryStyle,
  discount,
}: HomeCardProps) => {
  return (
    <div
      className={`font-adlamDisplay relative overflow-hidden shadow-md shadow-black ${className}`}
    >
      <img src={src} alt={src} className={`object-cover w-full h-full`} />
      {discount && (
        <div className="absolute top-0 right-5 font-bold text-xl text-white px-3 py-2 flex items-center justify-center bg-drk/80">
          {discount}
        </div>
      )}
      <div
        className={`absolute bottom-0 left-0 w-full h-full flex flex-col items-start justify-end p-6 bg-gradient-to-tr from-black via-transparent to-transparent ${container}`}
      >
        <h3 className={`text-org text-sm font-semibold ${categoryStyle}`}>
          {category}
        </h3>
        <h3 className={`text-white text-xl font-semibold ${titleStyle}`}>
          {title}
        </h3>
      </div>
    </div>
  );
};
