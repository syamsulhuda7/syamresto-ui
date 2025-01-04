import * as React from "react";
import clsx from "clsx";
import { Badge as BaseBadge, BadgeProps } from "@mui/base/Badge";

export default function BadgeComponent() {
  const [position, setPosition] = React.useState({ x: 30, y: 100 }); // Default posisi dengan jarak 30px
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 }); // Untuk melacak jarak drag
  const [isPopupVisible, setIsPopupVisible] = React.useState(false); // Menyimpan status popup
  const [popupPosition, setPopupPosition] = React.useState({ x: 0, y: 0 }); // Posisi popup
  const margin = 15; // Jarak margin untuk badge
  const popupMargin = 20; // Margin tambahan untuk popup dari sisi layar

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY }); // Catat posisi awal drag
    document.body.style.userSelect = "none"; // Nonaktifkan seleksi teks
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
      setIsPopupVisible(false); // Tutup popup saat badge digeser
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    const dragDistance = Math.hypot(
      e.clientX - dragStart.x,
      e.clientY - dragStart.y
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
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div>
      <div
        style={{
          position: "fixed", // Ubah menjadi fixed
          top: position.y,
          left: position.x,
          zIndex: 100, // Z-index tertinggi
          cursor: isDragging ? "grabbing" : "grab",
          transition: isDragging ? "none" : "all 0.2s ease", // Animasi saat menempel
        }}
        onMouseDown={handleMouseDown}
      >
        <Badge badgeContent={5}>
          <span className="w-10 h-10 rounded-xl bg-slate-300 inline-block align-middle" />
        </Badge>
      </div>

      {isPopupVisible && (
        <div
          style={{
            position: "fixed", // Popup dengan posisi fixed
            top: popupPosition.y,
            left: popupPosition.x,
            zIndex: 101, // Popup harus lebih tinggi dari badge
            width: "200px",
            height: "150px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            padding: "10px",
          }}
        >
          <p>Popup Content</p>
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
              "z-auto absolute top-0 right-0 min-w-badge min-h-badge font-sans p-0 text-white font-semibold font-xs rounded-xl bg-purple-500 leading-5.5 whitespace-nowrap text-center translate-x-1/2 -translate-y-1/2 drop-shadow-lg origin-right",
              resolvedSlotProps?.className
            ),
          };
        },
      }}
    />
  );
});
