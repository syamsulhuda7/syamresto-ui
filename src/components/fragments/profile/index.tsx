import ProfileCards from "../../ui/profileCards";

export const Profile = () => {
  return (
    <div className="w-full h-fit flex items-center justify-center">
      <div className="w-full max-w-[1440px] h-fit flex items-start justify-between px-[130px] py-[100px] gap-10">
        <div className="w-full h-fit flex items-center justify-center">
          {/* <div className="relative max-h-[550px] aspect-[2/3] rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src="/syamprofile.jpg"
              alt=""
            />
            <div className="absolute inset-0 max-h-[550px] aspect-[2/3] rounded-full shadow-inner shadow-drk"></div>
          </div> */}
          <ProfileCards />
        </div>
        <div className="w-full h-fit">
          <p className="font-albertSans font-bold text-[40px] text-drk pb-[30px]">
            ABOUT SYAMRESTO
          </p>
          <p className="text-justify text-xl font-albertSans indent-16">
            SYAMRESTO adalah restoran modern yang menawarkan pengalaman kuliner
            yang lengkap dan memikat. Dengan beragam menu yang tersedia, kami
            menghadirkan kelezatan dari berbagai kategori, mulai dari appetizer
            yang menggugah selera, main course dengan cita rasa autentik, hingga
            dessert yang manis dan memanjakan lidah. Tidak ketinggalan, pilihan
            beverage yang segar serta side dish yang inovatif turut melengkapi
            setiap hidangan, menjadikan SYAMRESTO tempat yang sempurna untuk
            setiap momen spesial Anda.
          </p>
          <p className="text-justify text-xl font-albertSans indent-16">
            Mengusung konsep ramah keluarga dan suasana yang hangat, SYAMRESTO
            tidak hanya menjadi tempat untuk makan, tetapi juga untuk bersantai
            dan menikmati waktu bersama orang-orang tercinta. Didukung oleh tim
            koki berpengalaman dan bahan-bahan pilihan, kami terus berinovasi
            dalam menyajikan menu yang sesuai dengan selera pelanggan dari
            berbagai kalangan.
          </p>
        </div>
      </div>
    </div>
  );
};
