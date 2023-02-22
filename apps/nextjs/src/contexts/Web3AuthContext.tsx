import { useQuery } from "@tanstack/react-query";
import { Web3AuthCore } from "@web3auth/core";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { initWeb3auth } from "~/utils/web3Auth";

type Web3AuthContextType = {
  web3Auth?: Web3AuthCore;
  isLoading: boolean;
};

const web3AuthContextDefaultValue: Web3AuthContextType = {
  isLoading: true,
};

const Web3AuthContext = createContext<Web3AuthContextType>(
  web3AuthContextDefaultValue,
);

export const Web3AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: web3Auth, isLoading } = useQuery(["Web3Auth"], initWeb3auth, {
    onSuccess: () => console.log("Web3Auth Initialized"),
  });

  const web3AuthContextValue: Web3AuthContextType = {
    web3Auth,
    isLoading,
  };

  return (
    <Web3AuthContext.Provider value={web3AuthContextValue}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3AuthContext = () => useContext(Web3AuthContext);
