import { FrameFragment } from "../../layouts/frameFragment";
import ProfileCards from "../../swiperjs/profileCards";

export const Profile = () => {
  return (
    <FrameFragment
      className="bg-white"
      innerClass="pt-[100px] pb-[50px] flex flex-col xl:flex-row items-center justify-center"
    >
      <p className="xl:hidden pb-5 w-full text-left font-albertSans font-bold text-2xl md:text-3xl xl:text-[40px] text-drk">
        ABOUT SYAMRESTO
      </p>
      <div className="w-full h-[320px] md:h-[400px] xl:h-[530px] flex items-center justify-center pb-[30px] xl:pb-0">
        <ProfileCards />
      </div>
      <div className="w-full h-fit xl:pl-5">
        <p className="hidden xl:block font-albertSans font-bold text-2xl md:text-3xl xl:text-[40px] text-drk pb-[30px]">
          ABOUT SYAMRESTO
        </p>
        <p className="text-justify text-sm md:text-xl font-albertSans indent-16">
          SYAMRESTO is a modern restaurant that offers culinary experiences
          which is complete and alluring. With a variety of menus available, we
          Bringing deliciousness from various categories, ranging from
          appetizers appetizing, main course with authentic taste, to dessert
          that is sweet and pampers the tongue. Not to be missed, choice Fresh
          beverages and innovative side dishes complement the every meal, making
          SYAMRESTO the perfect place to every moment of your special.
        </p>
        <p className="text-justify text-sm md:text-xl font-albertSans indent-16">
          Carrying the concept of family friendliness and a warm atmosphere,
          SYAMRESTO not only a place to eat, but also to relax and enjoy time
          with loved ones. Supported by the team Experienced chefs and selected
          ingredients, we are constantly innovating in serving menus that suit
          the tastes of customers from various circles.
        </p>
      </div>
    </FrameFragment>
  );
};
