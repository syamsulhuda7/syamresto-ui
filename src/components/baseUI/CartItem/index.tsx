import * as React from "react";
// import PropTypes from "prop-types";
import clsx from "clsx";
import { useMenu, MenuProvider } from "@mui/base/useMenu";
import { useMenuItem } from "@mui/base/useMenuItem";
import { Popper } from "@mui/base/Popper";
import { useDropdown, DropdownContext } from "@mui/base/useDropdown";
import { useMenuButton } from "@mui/base/useMenuButton";
import { useTheme } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cartItemsStorage } from "../../../utils/zustand/cartItems";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { checkoutItemsStorage } from "../../../utils/zustand/checkoutItem";
import { useNavigate } from "react-router";
import { navigationStore } from "../../../utils/zustand/navigation";

interface MenuProps {
  children: React.ReactNode;
  id: string;
}

const Menu = React.forwardRef(function Menu(
  props: MenuProps,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  const { children, ...other } = props;

  const { open, triggerElement, contextValue, getListboxProps } = useMenu({
    listboxRef: ref,
  });

  return (
    <Popper open={open} anchorEl={triggerElement}>
      <ul className="menu-root" {...other} {...getListboxProps()}>
        <MenuProvider value={contextValue}>{children}</MenuProvider>
      </ul>
    </Popper>
  );
});

// Menu.propTypes = {
//   children: PropTypes.node,
// };

interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const MenuItem = React.forwardRef(function MenuItem(
  props: MenuItemProps,
  ref: React.ForwardedRef<HTMLLIElement>
) {
  const { children, onClick, ...other } = props;

  const { getRootProps, disabled, focusVisible } = useMenuItem({
    rootRef: ref,
  });

  const classes = {
    "focus-visible": focusVisible,
    "menu-item": true,
    disabled,
  };

  return (
    <li
      {...other}
      {...getRootProps({ onClick: onClick ?? (() => {}) })}
      className={clsx(classes)}
    >
      {children}
    </li>
  );
});

// MenuItem.propTypes = {
//   children: PropTypes.node,
//   onClick: PropTypes.func,
// };

interface MenuButtonProps {
  children: React.ReactNode;
  className?: string;
}

const MenuButton = React.forwardRef(function MenuButton(
  props: MenuButtonProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  const { getRootProps: getButtonProps } = useMenuButton({
    rootRef: forwardedRef,
  });

  return (
    <button type="button" {...props} {...getButtonProps()} className="button" />
  );
});

export default function CartItem() {
  const { contextValue: dropdownContextValue } = useDropdown();
  const cartItemsValue = cartItemsStorage((state) => state.cartItems);
  const addCartItems = cartItemsStorage((state) => state.addCartItems);
  const reduceCartItems = cartItemsStorage((state) => state.reduceCartItems);
  const setCheckoutItem = checkoutItemsStorage(
    (state) => state.setCheckoutItem
  );
  const setNavigation = navigationStore((state) => state.setNavigation);
  const navigation = useNavigate();
  // console.log(cartItemsValue);
  //   const createHandleMenuClick = (menuItem) => {
  //     return () => {
  //       console.log(`Clicked on ${menuItem}`);
  //     };
  //   };

  const handleAddItem = (item: CartItem) => {
    addCartItems({ ...item, quantity: 1 });
  };
  const handleReduceItem = (item: number) => {
    reduceCartItems(item);
  };

  return (
    <React.Fragment>
      <DropdownContext.Provider value={dropdownContextValue}>
        <MenuButton>
          <div className="relative">
            <ShoppingCartIcon className="text-org scale-[1.2]" />
            <div className="w-[18px] h-[18px] text-[10px] font-semibold flex items-center justify-center bg-drk text-white rounded-full absolute -right-[8px] -top-[8px] outline outline-white">
              {cartItemsValue.length}
            </div>
          </div>
        </MenuButton>
        <Menu id="hooks-menu">
          <MenuItem>
            {cartItemsValue.length === 0 && (
              <div className="w-full h-12 bg-white flex flex-col items-center justify-center text-org rounded-[4px]">
                <h1>Your cart is empty</h1>
              </div>
            )}
            {cartItemsValue?.map((item) => (
              <div
                onClick={(e) => e.stopPropagation()}
                key={item.id}
                className="mb-1 w-full h-12 overflow-hidden bg-white shadow-sm shadow-gry flex items-center justify-start text-drk rounded-[4px] border border-slate-100"
              >
                <img
                  className="h-full aspect-square"
                  src={item.image_url}
                  alt={item.name}
                />
                <div className="w-full h-full flex flex-col items-start justify-between p-1 pr-2">
                  <h1 className="text-sm font-semibold">{item.name}</h1>
                  <div className="flex items-center">
                    <div className="h-5 aspect-square flex items-center justify-center border border-gry hover:bg-org cursor-pointer rounded-l-md">
                      <RemoveRoundedIcon
                        onClick={() => handleReduceItem(item.id)}
                        className="scale-[0.5]"
                      />
                    </div>
                    <div className="h-5 aspect-square flex items-center justify-center text-[11px] leading-none border border-l-0 border-r-0 border-gry">
                      {item.quantity}
                    </div>
                    <div className="h-5 aspect-square flex items-center justify-center border border-gry hover:bg-org cursor-pointer rounded-r-md">
                      <AddRoundedIcon
                        onClick={() => handleAddItem(item)}
                        className="scale-[0.5]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </MenuItem>
          <div
            onClick={() => {
              setCheckoutItem(cartItemsValue);
              setNavigation("my-order");
              navigation("/my-order");
            }}
            className="sticky -bottom-[1px] w-[calc(100%+10px)] -m-[5px] p-5 h-[50px] bg-white flex flex-col items-center justify-center text-white font-poppins font-medium rounded-b-[4px] mt-2 cursor-pointer"
          >
            <div className="absolute w-[95%] h-[80%] flex items-center justify-center bg-org">
              Checkout
            </div>
          </div>
        </Menu>
      </DropdownContext.Provider>
      <Styles />
    </React.Fragment>
  );
}

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E6",
  700: "#0059B3",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === "dark";
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  const styles = `
    .menu-root {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      box-sizing: border-box;
      padding-left: 5px;
      padding-right: 5px;
      padding-top: 5px;
      margin: 10px 0;
      min-width: 200px;
      max-height: 400px;
      overflow: auto;
      scrollbar-width: none;
      background: #fff;
      border: 1px solid ${grey[200]};
      border-radius: 7px;
      color: ${grey[900]};
      overflow: auto;
      outline: 0;
      box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.05);
    }

    .mode-dark .menu-root {
    //   background: ${grey[900]};
      border-color: ${grey[700]};
      color: ${grey[300]};
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
    }

    .menu-item {
      list-style: none;
    //   padding: 8px;
      border-radius: 0.45em;
      cursor: default;
      user-select: none;
    }

    .menu-item:last-of-type {
      border-bottom: none;
    }

    .menu-item:focus {
    //   background-color: ${grey[100]};
      color: ${grey[900]};
      outline: 0;
    }

    .mode-dark .menu-item:focus {
      background-color: ${grey[800]};
      color: ${grey[300]};
    }

    .menu-item.disabled {
      color: ${grey[400]};
    }

  .mode-dark .menu-item.disabled {
    color: ${grey[700]};
  }

    .button {
    //   font-family: 'IBM Plex Sans', sans-serif;
    //   font-weight: 600;
    //   font-size: 0.875rem;
    //   line-height: 1.5;
    //   padding: 8px 16px;
    //   border-radius: 8px;
    //   color: white;
      transition: all 150ms ease;
      cursor: pointer;
    //   background: ${isDarkMode ? grey[900] : "#fff"};
    //   border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
    //   color: ${isDarkMode ? grey[200] : grey[900]};
    //   box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    //   &:hover {
    //     background: ${isDarkMode ? grey[800] : grey[50]};
    //     border-color: ${isDarkMode ? grey[600] : grey[300]};
    //   }

    //   &:active {
    //     background: ${isDarkMode ? grey[700] : grey[100]};
    //   }

    //   &:focus-visible {
    //     box-shadow: 0 0 0 4px ${isDarkMode ? blue[300] : blue[200]};
    //     outline: none;
    //   }
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
