import { createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { Button, Frog } from "frog";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/vercel";
import nftAbi from "../lib/nft.json";
import { CLASSES_IMG_URI, NFT_CONTRACT_ADDRESS } from "../lib/constants.js";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

type State = {
  name: string;
  class: string;
};

export const app = new Frog<{ State: State }>({
  assetsPath: "/",
  initialState: {
    name: "Nikola Jokic",
    class: "Wizard",
  },
  secret: process.env.RELAYER_PK_KEY,
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

app.frame("/", (c) => {
  // get class and name from state
  const { previousState } = c;

  return c.res({
    image: (
      <div
        style={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          fontSize: 60,
        }}
      >
        <div style={{ display: "flex" }}>Hi {previousState.name}.</div>
        <div style={{ display: "flex" }}>You're a {previousState.class}</div>
      </div>
    ),
    intents: [
      <Button value="apple" action="/mint">
        Mint your Character
      </Button>,
    ],
  });
});

app.frame("/mint", (c) => {
  // https://sepolia.etherscan.io/address/0xD4207017F90e020494b28432d54bA5c5Dc2A2b9F#code

  // todo: get address from hub

  const { previousState } = c;
  const account = privateKeyToAccount("poopin");

  const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http(),
  });

  client.writeContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: nftAbi,
    functionName: "safeMint",
    account,
    chain: sepolia,
    // args: [
    //   "0x83aB8e31df35AA3281d630529C6F4bf5AC7f7aBF",
    //   previousState.name,
    //   "i am description!",
    //   previousState.class,
    //   CLASSES_IMG_URI[previousState.class],
    // ],
    args: [
      "0x83aB8e31df35AA3281d630529C6F4bf5AC7f7aBF",
      "Nikola Jokic",
      "i am description!",
      "Wizard",
      "ipfs://bafkreibvlpdp3uficvbx3kvk7rnqwbacxlzuzqqpf4lkcfuiamcfgsytmy",
    ],
  });

  return c.res({
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        minting...
      </div>
    ),
    intents: [<Button value="share">Share</Button>],
  });
});

export const GET = handle(app);
export const POST = handle(app);
