import { utils } from "near-api-js";
import React from "react";
import "regenerator-runtime/runtime";
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
  "https://bafybeibhwi6sw62msww2vn5fm7vwmpefdfb4vubbjqackymsrwihk3jn5u.ipfs.nftstorage.link",
  "https://bafkreicyrudihepuutvkjwgbnhw5g555kro5pmvx4vat2nzlobyjd54qn4.ipfs.nftstorage.link",
  "https://bafkreihwhp63sqkyvbibwwhmgtcskphmnr7se6tyh4umxgti63fvsroqs4.ipfs.nftstorage.link",
  "https://bafkreicimjjbrlsiglk2h6jtcqmdmriw7zawdhpri3i6aumzlqm2cd4k4y.ipfs.nftstorage.link",
  "https://bafkreibohtry734r756msj6eljynx2fqzp3wvixis6bebmt5uxcoyjevya.ipfs.nftstorage.link",
  "https://bafkreiclrz2ex3iph5a6p6v5eifsx2hh6pslvz74essiu4zb67opk3idom.ipfs.nftstorage.link",
  "https://bafkreihgibqlvurobyjtwefoxfiqcpp7ahjqhosvvkgdcw4gfpn44nc5fe.ipfs.nftstorage.link",
  "https://bafkreiga3spszvasybb5feolbq7yu6k3kpovjvgvjf7j2xz35ce5ibphrq.ipfs.nftstorage.link",
  "https://bafkreihzy3fh7ybql25oszpqobsioz3c6ghqpbqrsoj6vifnftkgn2tdia.ipfs.nftstorage.link",
  "https://bafkreiggzzd33jtx5lbfxy7esstioah7clg5x4vjq7ouh5356ubhk33qra.ipfs.nftstorage.link",
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
