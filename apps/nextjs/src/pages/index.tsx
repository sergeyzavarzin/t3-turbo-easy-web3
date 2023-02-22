import { WALLET_ADAPTERS } from "@web3auth/base";
import { ethers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import { FC } from "react";
import { useWeb3AuthContext } from "~/contexts/Web3AuthContext";
import { getIdToken } from "~/utils/firebase";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spirit-App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Spirit-App
          </h1>
          <AuthShowcase />
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: FC = () => {
  const { web3Auth, isLoading: web3AuthLoading } = useWeb3AuthContext();
  const loginWithGoogle = async () => {
    if (!web3Auth) return;

    const idToken = await getIdToken();

    await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: "jwt",
      extraLoginOptions: {
        id_token: idToken,
        verifierIdField: "sub", // same as your JWT Verifier ID
        domain: process.env.NEXT_PUBLIC_APP_DOMAIN,
      },
    });
  };

  const getUserInfo = async () => {
    if (!web3Auth) return;
    const user = await web3Auth.getUserInfo();
    console.log("User info", user);
  };

  const getAccounts = async () => {
    if (!web3Auth?.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const provider = new ethers.providers.Web3Provider(web3Auth.provider);
    const signer = provider.getSigner();
    const userAccounts = await signer.getAddress();
    console.log(userAccounts);
  };

  if (web3AuthLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={loginWithGoogle}
      >
        Login
      </button>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={getUserInfo}
      >
        Get user info
      </button>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={getAccounts}
      >
        Get accounts
      </button>
    </div>
  );
};
