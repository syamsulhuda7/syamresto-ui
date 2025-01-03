import { ComponentType, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { Home } from "./pages/home/index.tsx";
import { MyOrder } from "./pages/myOrder/index.tsx";
import useMiddleware from "./utils/middleware/index.tsx";
import { NotFound } from "./pages/notFound/index.tsx";
import { Menu } from "./pages/menu/index.tsx";

interface PageWithMiddlewareProps<P> {
  component: ComponentType<P>;
  componentProps: P;
}

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const allowedPaths = ["/", "/menu", "/my-order", "/not-found"];
    if (location.pathname === "/home") {
      navigate("/");
    } else if (!allowedPaths.includes(location.pathname)) {
      navigate("/not-found");
    } else {
      navigate(location.pathname);
    }
  }, [navigate, location]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageWithMiddleware
            component={Home}
            componentProps={{ title: "home" }}
          />
        }
      />
      <Route
        path="/menu"
        element={
          <PageWithMiddleware
            component={Menu}
            componentProps={{ title: "menu" }}
          />
        }
      />
      <Route
        path="/my-order"
        element={
          <PageWithMiddleware
            component={MyOrder}
            componentProps={{ title: "my-order" }}
          />
        }
      />

      <Route path="not-found" element={<NotFound />} />
    </Routes>
  );
};

const PageWithMiddleware = <P extends object>({
  component: Component,
  componentProps,
}: PageWithMiddlewareProps<P>) => {
  useMiddleware();
  return <Component {...componentProps} />;
};
