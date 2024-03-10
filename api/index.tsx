import { Button, Frog } from "frog";
import "dotenv/config";
// import { neynar } from "frog/hubs";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { handle } from "frog/vercel";
import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

import nftAbi from "../lib/nft.json";
import {
  CHARACTER_NAMES,
  CLASS_DESCRIPTIONS,
  CLASSES_IMG_URI,
  NFT_CONTRACT_ADDRESS,
} from "../lib/constants.js";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  initialState: {
    class: "",
    drinkCount: 0,
    name: "",
    receivingAddress: "",
    receivingAddressIndex: 0,
  },
  // hub: neynar({ apiKey: process.env.NEYNAR_API_KEY }),
});

app.frame("/", (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          You find yourself in a tavern, you see several colorful characters
          making merry. Who do you talk to?
        </div>
      </div>
    ),
    intents: [
      <Button action="/2" value="Tavern Keeper">
        Bartender
      </Button>,
      <Button action="/3" value="Archer">
        Archer
      </Button>,
      <Button action="/4" value="Cleric">
        Cleric
      </Button>,
      <Button action="/5" value="Wizard">
        Wizard
      </Button>,
    ],
  });
});

app.frame("/2", (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          The Tavern Keeper offers you a drink. "The Cleric is looking for
          adventurers!"
        </div>
      </div>
    ),
    intents: [
      <Button action="/6" value="Drink">
        Drink
      </Button>,
      <Button action="/4" value="Adventure">
        Adventure
      </Button>,
      <Button action="/finish" value="Tavern Keeper">
        Join Me (mint)
      </Button>,
    ],
  });
});

app.frame("/3", (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          An Archer is perched on a stool. You admire their sleek bow and
          arrows.
        </div>
      </div>
    ),
    intents: [
      <Button action="/5" value="Wizard">
        See Wizard
      </Button>,
      <Button.Link href="https://warpcast.com/~/channel/raidguild">
        Follow
      </Button.Link>,
      <Button action="/" value="Bar">
        Return
      </Button>,
      <Button action="/finish" value="Archer">
        Join Me (mint)
      </Button>,
    ],
  });
});

app.frame("/4", (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          A Cleric is recruiting raiders to join in defeating Moloch's minions.
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://www.raidguild.org/join/1">Raid</Button.Link>,
      <Button action="/7" value="Moloch">
        Moloch
      </Button>,
      <Button action="/finish" value="Cleric">
        Join Me (mint)
      </Button>,
    ],
  });
});

app.frame("/5", (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          A Wizard is rifling through parchments with arcane script. Are these
          spells?
        </div>
      </div>
    ),
    intents: [
      <Button action="/9">Learn more</Button>,
      <Button action="/3">Archer</Button>,
      <Button action="/">Return</Button>,
    ],
  });
});

app.frame("/6", (c) => {
  const { buttonValue, deriveState } = c;

  const state = deriveState((previousState) => {
    if (buttonValue === "Drink") previousState.drinkCount++;
  });

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          The Tavern Keeper gives you a drink, you enjoy it and feel a little
          tipsy (you've had {state.drinkCount} drinks).
        </div>
      </div>
    ),
    intents: [
      <Button action={state.drinkCount === 5 ? "/8" : "/6"} value="Drink">
        Drink more
      </Button>,
      <Button action="/">Return</Button>,
    ],
  });
});

app.frame("/7", (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          Moloch is the demon god of coordination failure, we fight him in
          battle to free humanity!
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://slatestarcodex.com/2014/07/30/meditations-on-moloch/">
        Battle!
      </Button.Link>,
      <Button action="/">Return</Button>,
    ],
  });
});

app.frame("/8", (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          You're drunk.
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://brood.raidguild.org/">Brood</Button.Link>,
    ],
  });
});

app.frame("/9", (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          "I deal in the art of spellcraft, weaving together arcane tapestries
          upon which we can build tools to defeat Moloch once and for all!"
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://discord.com/invite/rGFpfQf">
        Battle!
      </Button.Link>,
      <Button action="/" value="Tavern">
        Tavern
      </Button>,
      <Button action="/4" value="Adventure">
        Adventure
      </Button>,
      <Button action="/finish" value="Wizard">
        Join Me (mint)
      </Button>,
    ],
  });
});

app.frame("/finish", async (c) => {
  const { deriveState, buttonValue, frameData } = c;
  const { fid } = frameData;

  const neynarClient = new NeynarAPIClient(process.env.NEYNAR_API_KEY);
  const res = await neynarClient.fetchBulkUsers([fid]);

  const state = deriveState((previousState) => {
    let _class = previousState.class;
    if (
      buttonValue === "Tavern Keeper" ||
      buttonValue === "Archer" ||
      buttonValue === "Cleric" ||
      buttonValue === "Wizard"
    ) {
      previousState.class = buttonValue;
      _class = buttonValue;
    }

    if (buttonValue !== "Address") {
      previousState.name =
        CHARACTER_NAMES[_class][
          Math.floor(Math.random() * CHARACTER_NAMES[_class].length)
        ];
    }

    if (buttonValue === "Address") {
      if (
        previousState.receivingAddressIndex - 1 <
        res.users[0].verified_addresses.eth_addresses.length - 1
      ) {
        previousState.receivingAddressIndex++;
      } else {
        previousState.receivingAddressIndex = 0;
      }
    }

    if (previousState.receivingAddressIndex > 0) {
      previousState.receivingAddress =
        res.users[0].verified_addresses.eth_addresses[
          previousState.receivingAddressIndex - 1
        ];
    } else {
      previousState.receivingAddress = res.users[0].custody_address;
    }
  });

  const client = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const nftBalance = await client.readContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: nftAbi,
    functionName: "balanceOf",
    args: [state.receivingAddress],
  });

  const cannotMint = Number(nftBalance) > 0;

  const intents = [
    <Button action="/finish" value="Name">
      Regenerate Name
    </Button>,
    <Button action="/finish" value="Address">
      Next Address
    </Button>,
  ];

  if (!cannotMint) {
    intents.push(
      <Button value="apple" action="/mint">
        Mint Character
      </Button>
    );
  }

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
        <div style={{ display: "flex" }}>Hi {state.name}.</div>
        <div style={{ display: "flex" }}>You're a {state.class}</div>
        <div style={{ display: "flex" }}>
          Minting to {state.receivingAddress}
        </div>
        <div style={{ display: "flex" }}>{cannotMint ? "Cannot mint" : ""}</div>
      </div>
    ),
    intents,
  });
});

app.frame("/mint", async (c) => {
  // https://sepolia.etherscan.io/address/0xD4207017F90e020494b28432d54bA5c5Dc2A2b9F#code

  const nftOwnerPrivateKey = process.env.NFT_OWNER_PRIVATE_KEY;

  const { previousState } = c;

  const account = privateKeyToAccount(nftOwnerPrivateKey as `0x${string}`);

  const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http(),
  });

  let txHash = "";
  try {
    txHash = await client.writeContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: nftAbi,
      functionName: "safeMint",
      account,
      chain: sepolia,
      args: [
        previousState.receivingAddress,
        previousState.name,
        CLASS_DESCRIPTIONS[previousState.class],
        previousState.class,
        CLASSES_IMG_URI[previousState.class],
      ],
    });
  } catch (e) {}

  return c.res({
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        <div style={{ display: "flex" }}>Minting your character...</div>
      </div>
    ),
    intents: [
      <Button action="/status" value={txHash}>
        Check Status
      </Button>,
    ],
  });
});

app.frame("/status", async (c) => {
  const { buttonValue } = c;
  const client = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  let status = "pending";
  try {
    const txReceipt = await client.getTransactionReceipt({
      hash: buttonValue as `0x${string}`,
    });
    status = txReceipt.status;
  } catch (e) {}

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
        <div style={{ display: "flex" }}>Checking transaction status...</div>
        <div style={{ display: "flex" }}>
          {status === "pending"
            ? "Pending"
            : status === "success"
            ? "Success"
            : "Failed"}
        </div>
      </div>
    ),
    intents: [
      <Button action="/status" value={buttonValue}>
        Re-Check Status
      </Button>,
      <Button.Link href={`https://sepolia.etherscan.io/tx/${buttonValue}`}>
        View on Etherscan
      </Button.Link>,
    ],
  });
});

export const GET = handle(app);
export const POST = handle(app);
