import { utils } from "near-api-js";
import React from "react";
import "regenerator-runtime/runtime";
import { v4 as uuid4 } from "uuid";
import "./global.css";
import { login, logout } from "./utils";

import Layout from "./Layout";
import Content from "./Content";
import List from "./List";

const GAS = 300000000000000;
const ONE_NEAR = utils.format.parseNearAmount("1");

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const memes = [
  "https://bafkreic52r5dsowv4otcjn2kociip5s6xm2fffy77347ljtkcqxxzax6zm.ipfs.nftstorage.link",
];

export default function App() {
  const [nfts, setNfts] = React.useState([]);

  React.useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      window.contract
        .nft_tokens_for_owner({ account_id: window.accountId })
        .then((res) => {
          setNfts(res);
        });
    }
  }, []);

  if (!window.walletConnection.isSignedIn()) {
    return (
      <Layout buttonClick={login} isLoggedIn={false}>
        <Content />
      </Layout>
    );
  }

  const mint = async () => {
    const token_owner_id = window.walletConnection.account().accountId;
    try {
      const token_id = await window.contract.nft_total_supply();
      console.log(token_id);
      // const token_id = uuid4();
      const media = memes.random();
      const token_metadata = {
        title: `Meme NFT #${token_id}`,
        description: "Just a Meme NFT for fun!",
        media,
        copies: 1,
      };

      await window.contract.nft_mint(
        {
          token_id,
          token_owner_id,
          token_metadata,
        },
        GAS,
        ONE_NEAR
      );
    } catch (e) {
      alert(
        "Something went wrong! " +
          "Maybe you need to sign out and back in? " +
          "Check your browser console for more info."
      );
      throw e;
    } finally {
      setButtonDisabled(false);
    }

    setNfts([...nfts, { token_id, token_owner_id, token_metadata }]);
  };

  return (
    <Layout buttonClick={logout} isLoggedIn={true}>
      <Content isLogin onMint={mint} />
      <List nfts={nfts} />
    </Layout>
  );
}
