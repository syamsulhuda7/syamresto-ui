import * as React from "react";
import clsx from "clsx";
import { Badge as BaseBadge, BadgeProps } from "@mui/base/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cartItemsStorage } from "../../../utils/zustand/cartItems";

export default function BadgeComponent() {
  const [position, setPosition] = React.useState({ x: 30, y: 100 }); // Default posisi dengan jarak 30px
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 }); // Untuk melacak jarak drag
  const [isPopupVisible, setIsPopupVisible] = React.useState(false); // Menyimpan status popup
  const [popupPosition, setPopupPosition] = React.useState({ x: 0, y: 0 }); // Posisi popup
  const margin = 15; // Jarak margin untuk badge
  const popupMargin = 20; // Margin tambahan untuk popup dari sisi layar
  const cartItemsValue = cartItemsStorage((state) => state.cartItems);

  // Fungsi untuk memulai drag (Mouse)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    document.body.style.userSelect = "none"; // Nonaktifkan seleksi teks
  };

  // Fungsi untuk memulai drag (Touch)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
    e.preventDefault(); // Mencegah scroll saat menyentuh
  };

  // Fungsi untuk memindahkan posisi (Mouse)
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
      setIsPopupVisible(false); // Tutup popup saat badge digeser
    }
  };

  // Fungsi untuk memindahkan posisi (Touch)
  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPosition((prev) => ({
        x: prev.x + (touch.clientX - dragStart.x),
        y: prev.y + (touch.clientY - dragStart.y),
      }));
      setDragStart({ x: touch.clientX, y: touch.clientY });
      setIsPopupVisible(false); // Tutup popup saat badge digeser
      e.preventDefault(); // Mencegah scroll saat menggeser
    }
  };

  // Fungsi untuk menyelesaikan drag (Mouse)
  const handleMouseUp = (e: MouseEvent) => {
    finishDrag(e.clientX, e.clientY);
  };

  // Fungsi untuk menyelesaikan drag (Touch)
  const handleTouchEnd = () => {
    setIsDragging(false);
    document.body.style.userSelect = ""; // Aktifkan kembali seleksi teks
  };

  // Logika menyelesaikan drag
  const finishDrag = (clientX: number, clientY: number) => {
    const dragDistance = Math.hypot(
      clientX - dragStart.x,
      clientY - dragStart.y
    );

    setIsDragging(false);
    document.body.style.userSelect = ""; // Aktifkan kembali seleksi teks

    // Jika jarak drag < 5 piksel, anggap sebagai klik
    if (dragDistance < 5) {
      setIsPopupVisible(!isPopupVisible); // Menampilkan popup saat klik
      setPopupPosition({
        x: Math.min(window.innerWidth - popupMargin - 250, position.x + 10), // Menjaga popup tetap di dalam layar
        y: Math.min(window.innerHeight - popupMargin - 200, position.y + 45), // Menjaga popup tetap di dalam layar
      });
    }

    // Menempelkan ke sisi relatif viewport (kiri, kanan, atas, bawah)
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    setPosition((prev) => {
      const closestHorizontal =
        prev.x < viewportWidth / 2 ? margin : viewportWidth - 50 - margin; // Tempel ke kiri/kanan dengan jarak margin
      const closestVertical =
        prev.y < viewportHeight / 2 ? margin : viewportHeight - 50 - margin; // Tempel ke atas/bawah dengan jarak margin

      // Tentukan mana yang lebih dekat: horizontal atau vertical
      const distanceToHorizontal = Math.min(prev.x, viewportWidth - prev.x);
      const distanceToVertical = Math.min(prev.y, viewportHeight - prev.y);

      if (distanceToHorizontal < distanceToVertical) {
        // Tempel ke kiri atau kanan
        return {
          x: closestHorizontal,
          y: Math.max(margin, Math.min(prev.y, viewportHeight - 50 - margin)), // Batasi vertikal
        };
      } else {
        // Tempel ke atas atau bawah
        return {
          x: Math.max(margin, Math.min(prev.x, viewportWidth - 50 - margin)), // Batasi horizontal
          y: closestVertical,
        };
      }
    });
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false }); // Tambahkan passive: false untuk menangani event touch
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
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          zIndex: 100,
          cursor: isDragging ? "grabbing" : "grab",
          transition: isDragging ? "none" : "all 0.2s ease",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart} // Tambahkan event touch
      >
        <Badge badgeContent={cartItemsValue.length}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-org shadow-sm shadow-black/50">
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
