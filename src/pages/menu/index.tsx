import { useEffect, useState } from "react";
import { FramePage } from "../../components/layouts/framePage";
import UseAutocomplete from "../../components/ui/searchMenu";
import { FilterMenu } from "../../components/fragments/filterMenu";
import { ListMenu } from "../../components/fragments/listMenu";
import { productsData } from "../../utils/api";
import BadgeComponent from "../../components/ui/badge";
import BadgeComponentCopy from "../../components/ui/badge copy";

export const Menu = () => {
  const [menuData, setMenuData] = useState<MenuData[]>();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [positionCopy, setPositionCopy] = useState({ x: 0, y: 0 });
  const [dragCopy, setDragCopy] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const response: MenuData[] = (await productsData()) || [];
      setMenuData(response);
    };
    fetchData();
  }, []);

  return (
    <FramePage>
      <div className="h-fit w-fit px-5 py-3 bg-white">
        <p>ORANGE</p>
        <p>position: {JSON.stringify(position)}</p>
        <p>drag: {JSON.stringify(drag)}</p>
        <br />
        <hr />
        <br />
        <p>GREEN</p>
        <p>position: {JSON.stringify(positionCopy)}</p>
        <p>drag: {JSON.stringify(dragCopy)}</p>
      </div>
      <BadgeComponentCopy
        positionValue={setPositionCopy}
        dragValue={setDragCopy}
      />
      <BadgeComponent positionValue={setPosition} dragValue={setDrag} />
      <div className="relative w-full aspect-[2/1] md:aspect-[4/1]">
        <img
          src="https://apisyamresto.syamdev.my.id/storage/product-images/01JG30241PTGJEEP9KP62GCM4V.jpg"
          className="w-full aspect-[2/1] md:aspect-[4/1] object-cover"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <UseAutocomplete
            menuData={menuData?.map((item) => item.name) || []}
          />
        </div>
        <span id="view-target" className="absolute bottom-10" />
      </div>
      <div className="w-full h-fit bg-org flex flex-col md:flex-row items-start justify-center">
        <FilterMenu />
        <ListMenu />
      </div>
    </FramePage>
  );
};
