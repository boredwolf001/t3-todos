import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";
import { Provider as WrapProvider } from "react-wrap-balancer";

import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <WrapProvider>
        <Component {...pageProps} />
      </WrapProvider>
      <ToastContainer />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
