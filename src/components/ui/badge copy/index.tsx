/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import clsx from "clsx";
import { Badge as BaseBadge, BadgeProps } from "@mui/base/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cartItemsStorage } from "../../../utils/zustand/cartItems";

// interface BadgeComponentProps {
//   positionValue: { x: number; y: number };
//   dragValue: { x: number; y: number };
// }

interface BadgeComponentProps {
  positionValue: (value: { x: number; y: number }) => void;
  dragValue: (value: { x: number; y: number }) => void;
}

export default function BadgeComponentCopy({
  positionValue,
  dragValue,
}: BadgeComponentProps) {
  const [position, setPosition] = React.useState({ x: 15, y: 500 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);
  const [popupPosition, setPopupPosition] = React.useState({ x: 0, y: 0 });
  const margin = 15;
  const popupMargin = 20;
  const cartItemsValue = cartItemsStorage((state) => state.cartItems);
  const badgeRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    document.body.style.userSelect = "none";
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
      setIsPopupVisible(false);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      const deltaX = touch.clientX;
      const deltaY = touch.clientY;

      e.preventDefault();

      // Perbarui posisi badge dengan cara mengambil rata-rata antara posisi sebelumnya dan delta pergerakan
      setPosition((prev) => {
        const newX = prev.x + deltaX; // Ambil rata-rata antara posisi sebelumnya dan delta
        const newY = prev.y + deltaY; // Ambil rata-rata antara posisi sebelumnya dan delta
        // setDragStart({ x: touch.clientX, y: touch.clientY });

        dragValue({ x: touch.clientX, y: touch.clientY });

        // Pastikan posisi badge tidak keluar dari layar
        const newPositionX = Math.max(
          margin,
          Math.min(newX, window.innerWidth - 50 - margin)
        );
        const newPositionY = Math.max(
          margin,
          Math.min(newY, window.innerHeight - 50 - margin)
        );

        positionValue({ x: newPositionX, y: newPositionY });

        setIsPopupVisible(false);
        return { x: newPositionX, y: newPositionY };
      });
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    finishDrag(e.clientX, e.clientY);
  };

  const handleTouchEnd = () => {
    finishDrag(0, 0); // Akan dihitung berdasarkan posisi touch akhir
  };

  const finishDrag = (clientX: number, clientY: number) => {
    const dragDistance = Math.hypot(
      clientX - dragStart.x,
      clientY - dragStart.y
    );
    if (dragDistance < 5) {
      setIsPopupVisible(!isPopupVisible);
      setPopupPosition({
        x: Math.min(window.innerWidth - popupMargin - 250, position.x + 10),
        y: Math.min(window.innerHeight - popupMargin - 200, position.y + 45),
      });
    }

    // Tentukan sisi terdekat dan tempelkan badge ke sisi itu
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    setPosition((prev) => {
      const closestHorizontal =
        prev.x < viewportWidth / 2 ? margin : viewportWidth - 50 - margin;
      const closestVertical =
        prev.y < viewportHeight / 2 ? margin : viewportHeight - 50 - margin;

      // Tentukan posisi berdasarkan jarak terdekat ke tepi layar
      const distanceToHorizontal = Math.min(prev.x, viewportWidth - prev.x);
      const distanceToVertical = Math.min(prev.y, viewportHeight - prev.y);

      // Jika jarak horizontal lebih kecil, tempelkan badge di sisi kiri atau kanan
      if (distanceToHorizontal < distanceToVertical) {
        return {
          x: closestHorizontal,
          y: Math.max(margin, Math.min(prev.y, viewportHeight - 50 - margin)),
        };
      } else {
        return {
          x: Math.max(margin, Math.min(prev.x, viewportWidth - 50 - margin)),
          y: closestVertical,
        };
      }
    });

    setIsDragging(false);
    document.body.style.userSelect = "";
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div>
      <div
        ref={badgeRef}
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          zIndex: 100,
          cursor: isDragging ? "grabbing" : "grab",
          transition: isDragging ? "none" : "all 0.2s ease",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <Badge badgeContent={cartItemsValue.length}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-700 shadow-sm shadow-black/50">
            <ShoppingCartIcon className="text-drk" />
          </div>
        </Badge>
      </div>

      {isPopupVisible && (
        <div
          className="fixed z-[101] w-[200px] h-[150px] overflow-auto scroll-none p-3 bg-white rounded-md shadow-md flex flex-col items-start justify-start"
          style={{
            top: popupPosition.y,
            left: popupPosition.x,
          }}
        >
          {cartItemsValue.length === 0 && (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-center font-semibold text-org">
                No items in cart
              </p>
            </div>
          )}
          {cartItemsValue.map((item) => (
            <div key={item.id}>
              <p>
                {item.name} ({item.quantity})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === "function" ? fn(args) : fn;

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  return (
    <BaseBadge
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              "box-border m-0 p-0 text-xs font-sans list-none relative inline-block leading-none",
              resolvedSlotProps?.className
            ),
          };
        },
        badge: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.badge,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              "w-5 h-5 flex items-center justify-center z-auto absolute top-0 right-0 min-w-badge min-h-badge font-sans p-0 text-white font-semibold font-xs rounded-xl bg-drk leading-5.5 whitespace-nowrap text-center translate-x-1/2 -translate-y-1/2 drop-shadow-lg origin-right",
              resolvedSlotProps?.className
            ),
          };
        },
      }}
    />
  );
});
