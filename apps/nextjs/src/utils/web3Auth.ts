import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3AuthCore } from "@web3auth/core";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID ?? "";

export const web3auth = new Web3AuthCore({
  clientId,
  web3AuthNetwork: "testnet", // "mainnet" for production polygon
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x13881", // mumbai - 0x13881, polygon - 0x89,
  },
});

export const initWeb3auth = async () => {
  await web3auth.init();

  return web3auth;
};

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    // clientId: "YOUR-WEB3AUTH-CLIENT-ID", // Optional - Provide only if you haven't provided it in the Web3Auth Instantiation Code
    uxMode: "redirect",
    loginConfig: {
      jwt: {
        name: "spirit-dev-name",
        verifier: "spirit-dev", // "YOUR-VERIFIER-NAME-ON-WEB3AUTH-DASHBOARD",
        typeOfLogin: "jwt",
        clientId,
      },
    },
  },
});

web3auth.configureAdapter(openloginAdapter);
