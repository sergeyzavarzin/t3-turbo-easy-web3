import type { AppType } from "next/app";
import { Web3AuthProvider } from "~/contexts/Web3AuthContext";
import { api } from "~/utils/api";
import "../styles/globals.css";

const App: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <Web3AuthProvider>
      <Component {...pageProps} />
    </Web3AuthProvider>
  );
};

export default api.withTRPC(App);
