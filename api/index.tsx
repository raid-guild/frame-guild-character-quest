import { Button, Frog } from "frog";
import "dotenv/config";
import { neynar } from "frog/hubs";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { handle } from "frog/vercel";
import {
  createPublicClient,
  createWalletClient,
  http,
  parseEventLogs,
  parseAbi,
} from "viem";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS as `0x${string}`;

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  browserLocation: "/",
  secret: process.env.SECRET,
  initialState: {
    class: "",
    drinkCount: 0,
    name: "",
    receivingAddress: "",
    receivingAddressIndex: 0,
  },
  verify: "silent",
  hub: neynar({ apiKey: process.env.NEYNAR_API_KEY }),
});

const defaultContainer = (children: JSX.Element) => (
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
    {children}
  </div>
);

app.frame("/", (c) => {
  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          height: "60%",
          width: "90%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 38,
            fontStyle: "normal",
            fontFamily: "Times",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            padding: "0 80px",
            whiteSpace: "pre-wrap",
          }}
        >
          Welcome back to the tavern, you have been selected to unearth a magic item
        </div>
        <div
          style={{
            color: "white",
            fontSize: 32,
            fontStyle: "normal",
            fontFamily: "Times",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            marginTop: "40px",
          }}
        >
          (Choose wisely.)
        </div>
      </div>
    ),
    intents: [
      <Button action="/2">Goblet</Button>,
      <Button action="/3">Crown</Button>,
      <Button action="/4">Amulet</Button>,
      <Button action="/5">Cloak</Button>,
    ],
  });
});

app.frame("/2", (c) => {
  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          display: "flex",
          height: "60%",
          width: "90%",
          padding: "0 120px",
          gap: "40px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            
            height: "220px",
            width: "220px",
          }}
        >
          <img height="220px" src="https://cloudflare-ipfs.com/ipfs/QmeFcH3ad8DJr5nCV8sFWWcaeFTfyAg8z7T5ewcLVALJxU/goblet_withbg.png" />
          </div>
        <div
          style={{
            color: "white",
            fontSize: 48,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          The Tavern Keeper offers you a goblet. "An Amulet catches your eye!"
        </div>
      </div>
    ),
    intents: [
      <Button action="/finish" value="Goblet">
        Join Me (Mint)
      </Button>,
      <Button action="/6" value="Drink">
        Drink
      </Button>,
      <Button action="/4" value="Adventure">
        Amulet
      </Button>,
    ],
  });
});

app.frame("/3", (c) => {
  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          padding: "0 120px",
          display: "flex",
          height: "60%",
          width: "90%",
          gap: "40px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            height: "220px",
            width: "220px",
            display: "flex",
          }}
        >
          <img height="220px" src="https://cloudflare-ipfs.com/ipfs/QmeFcH3ad8DJr5nCV8sFWWcaeFTfyAg8z7T5ewcLVALJxU/crown_withbg.png" />
        </div>
        <div
          style={{
            color: "white",
            fontSize: 48,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          You try it on and the crown fits perfectly on your head.
        </div>
      </div>
    ),
    intents: [
      <Button action="/finish" value="Crown">
        Join Me (Mint)
      </Button>,
      <Button.Link href="https://warpcast.com/~/channel/raidguild">
        Follow
      </Button.Link>,
      <Button action="/">Return</Button>,
    ],
  });
});

app.frame("/4", (c) => {
  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          display: "flex",
          height: "60%",
          width: "90%",
          padding: "0 120px",
          gap: "40px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            
            height: "220px",
            width: "220px",
          }}
        >
          <img height="220px" src="https://cloudflare-ipfs.com/ipfs/QmeFcH3ad8DJr5nCV8sFWWcaeFTfyAg8z7T5ewcLVALJxU/amulet_withbg.png" />
          </div>
        <div
          style={{
            color: "white",
            fontSize: 48,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          The amulet shimmers in the light and you feel a sense of power.
        </div>
      </div>
    ),
    intents: [
      <Button action="/finish" value="Amulet">
        Join Me (Mint)
      </Button>,
      <Button.Link href="https://www.raidguild.org/join/1">Raid</Button.Link>,
      <Button action="/7">Moloch</Button>,
    ],
  });
});

app.frame("/5", (c) => {
  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          display: "flex",
          height: "60%",
          width: "90%",
          padding: "0 120px",
          gap: "40px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            
            height: "220px",
            width: "220px",
          }}
        >
          <img height="220px" src="https://cloudflare-ipfs.com/ipfs/QmeFcH3ad8DJr5nCV8sFWWcaeFTfyAg8z7T5ewcLVALJxU/cloak_withbg.png" />
          </div>
        <div
          style={{
            color: "white",
            fontSize: 48,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          You put on the cloak and feel a sense of mystery and adventure. But maybe a crown instead?
        </div>
      </div>
    ),
    intents: [
      <Button action="/9">Learn more</Button>,
      <Button action="/3">Crown</Button>,
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
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          display: "flex",
          height: "60%",
          width: "90%",
          padding: "0 120px",
          gap: "40px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            backgroundImage:
              "url(https://cloudflare-ipfs.com/ipfs/bafkreihqgxfn5etcfwcvtrporyqfz4i7y7jlb7ahqjyrdlq73uyqmynnti)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: "250px",
            width: "160px",
          }}
        ></div>
        <div
          style={{
            color: "white",
            fontSize: 44,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
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
        Drink More
      </Button>,
      <Button action="/">Return</Button>,
    ],
  });
});

app.frame("/7", (c) => {
  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          display: "flex",
          height: "60%",
          width: "90%",
          padding: "0 120px",
          gap: "40px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            backgroundImage:
              "url(https://cloudflare-ipfs.com/ipfs/QmQMX3YhhtV5rpKVYyqsP1MHFV4MzuMtKrUGEqhEC75HrY)",
            backgroundSize: "200px 200px",
            backgroundRepeat: "no-repeat",
            height: "200px",
            width: "200px",
          }}
        ></div>
        <div
          style={{
            color: "white",
            fontSize: 42,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          Moloch growls. "What is this? Some kind of magic? Some kind of seeding of a meta game?"
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://slatestarcodex.com/2014/07/30/meditations-on-moloch/">
        Battle!
      </Button.Link>,
      <Button action="/10">Learn More</Button>,
    ],
  });
});

app.frame("/8", (c) => {
  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          display: "flex",
          height: "60%",
          width: "90%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 48,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          You're drunk.
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://brood.raidguild.org/">Brood</Button.Link>,
      <Button action="/">Return</Button>,
    ],
  });
});

app.frame("/9", (c) => {
  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          display: "flex",
          height: "60%",
          width: "90%",
          padding: "0 120px",
          gap: "40px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            height: "220px",
            width: "220px",
          }}
        >
          <img height="220px" src="https://cloudflare-ipfs.com/ipfs/QmeFcH3ad8DJr5nCV8sFWWcaeFTfyAg8z7T5ewcLVALJxU/cloak_withbg.png" />
        </div>
        <div
          style={{
            color: "white",
            fontSize: 36,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          "An arcane tapestry to defeat Moloch once and for all! Might look nice on a TBA."
        </div>
      </div>
    ),
    intents: [
      <Button action="/finish" value="Cloak">
        Join Me (Mint)
      </Button>,
      <Button.Link href="https://discord.com/invite/rGFpfQf">
        Battle!
      </Button.Link>,
      <Button action="/">Return</Button>,
    ],
  });
});

app.frame("/10", (c) => {
  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          display: "flex",
          height: "60%",
          width: "90%",
          padding: "0 120px",
          gap: "40px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            backgroundImage:
              "url(https://cloudflare-ipfs.com/ipfs/QmQMX3YhhtV5rpKVYyqsP1MHFV4MzuMtKrUGEqhEC75HrY)",
            backgroundSize: "200px 200px",
            backgroundRepeat: "no-repeat",
            height: "200px",
            width: "200px",
          }}
        ></div>
        <div
          style={{
            color: "white",
            fontSize: 42,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          Moloch growls more. "What is this all leading too? A grand adventure? In game currency? A DAO? Character Sheets?"
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://silohaus.github.io/silo-nft-dao-admin/#/molochv3/0x2105/0x74dc5fcd49b865db3e5038f11f358b211c1c1365/activate">
        Activate!
      </Button.Link>,
      <Button action="/">Return</Button>,
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
      buttonValue === "Goblet" ||
      buttonValue === "Crown" ||
      buttonValue === "Amulet" ||
      buttonValue === "Cloak"
    ) {
      previousState.class = buttonValue;
      _class = buttonValue;
    }

    if (buttonValue !== "Address") {
      previousState.name =
        ITEM_NAMES[_class][
        Math.floor(Math.random() * ITEM_NAMES[_class].length)
        ];
    }

    if (buttonValue === "Address") {
      if 
      (
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
    chain: base,
    transport: http(),
  });

  const nftBalance = await client.readContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: [
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "balanceOf",
    args: [state.receivingAddress as `0x${string}`],
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
    intents.unshift(
      <Button value="apple" action="/mint">
        Mint Item
      </Button>
    );
  }

  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          display: "flex",
          height: "60%",
          width: "90%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 48,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            justifyContent: "center",
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            You have unearthed a{state.class === "Amulet" ? "n" : ""} {state.class}.
          </div>
          <div style={{ display: "flex", justifyContent: "center", fontWeight: "bold"}}>
            {state.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              justifyContent: "center",
            }}
          >
            Minting to {state.receivingAddress}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              justifyContent: "center",
            }}
          >
            {cannotMint
              ? "(Cannot mint. This address already has a balance of 1.)"
              : ""}
          </div>
        </div>
      </div>
    ),
    intents,
  });
});

app.frame("/mint", async (c) => {
  const nftOwnerPrivateKey = process.env.NFT_OWNER_PRIVATE_KEY;

  const { previousState } = c;

  const account = privateKeyToAccount(nftOwnerPrivateKey as `0x${string}`);

  const client = createWalletClient({
    account,
    chain: base,
    transport: http(),
  });

  let txHash = "";
  try {
    txHash = await client.writeContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: [
        {
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "string", name: "itemName", type: "string" },
            {
              internalType: "string",
              name: "itemDescription",
              type: "string",
            },
            { internalType: "string", name: "itemClass", type: "string" },
            {
              internalType: "string",
              name: "itemImageUri",
              type: "string",
            },
          ],
          name: "safeMint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      functionName: "safeMint",
      account,
      chain: base,
      args: [
        previousState.receivingAddress as `0x${string}`,
        previousState.name,
        CLASS_DESCRIPTIONS[previousState.class],
        previousState.class,
        CLASSES_IMG_URI[previousState.class],
      ],
    });
  } catch (e) {
    console.error(e);
  }

  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          display: "flex",
          height: "60%",
          width: "90%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 48,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          Minting your item...
        </div>
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
    chain: base,
    transport: http(),
  });

  let status = "pending";
  let tokenId = "";

  try {
    const txReceipt = await client.getTransactionReceipt({
      hash: buttonValue as `0x${string}`,
    });
    status = txReceipt.status;

    if (status === "success") {
      const logs = [txReceipt.logs[0]];
      const decodedLogs = parseEventLogs({
        abi: parseAbi([
          "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
        ]),
        logs,
        eventName: "Transfer",
      });

      if (decodedLogs.length > 0) {
        const firstLog = decodedLogs[0];
        tokenId = firstLog.args.tokenId.toString();
      }
    }
  } catch (e) {
    console.error(e);
  }

  if (!buttonValue) {
    return c.res({
      title: "Enter the Tavern",
      image: defaultContainer(
        <div
          style={{
            alignItems: "center",
            border: "6px solid #ff3864",
            display: "flex",
            height: "60%",
            width: "90%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 48,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              padding: "0 120px",
              whiteSpace: "pre-wrap",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            An error occurred.
          </div>
        </div>
      ),
      intents: [<Button action="/">Return</Button>],
    });
  }

  const pendingIntents = [
    <Button action="/status" value={buttonValue}>
      Re-Check Status
    </Button>,
    <Button.Link href={`${process.env.ETHERSCAN_URL}/tx/${buttonValue}`}>
      View on Etherscan
    </Button.Link>,
  ];

  const successIntents = [
    <Button action={`/share/${tokenId}`}>View Item</Button>,
    <Button.Link href={`${process.env.ETHERSCAN_URL}/tx/${buttonValue}`}>
      View on Etherscan
    </Button.Link>,
  ];

  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          display: "flex",
          height: "60%",
          width: "90%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 48,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            justifyContent: "center",
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex" }}>Checking transaction status...</div>
          <div style={{ display: "flex" }}>
            {status === "pending"
              ? "Pending..."
              : status === "success"
                ? "Success!"
                : "Failed!"}
          </div>
        </div>
      </div>
    ),
    intents: status === "success" && tokenId ? successIntents : pendingIntents,
  });
});

app.frame("/share/:id", async (c) => {
  const tokenId = c.req.param("id");

  if (!tokenId) {
    return c.res({
      title: "Enter the Tavern",
      image: defaultContainer(
        <div
          style={{
            alignItems: "center",
            border: "6px solid #ff3864",
            display: "flex",
            height: "60%",
            width: "90%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 48,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              padding: "0 120px",
              whiteSpace: "pre-wrap",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            An error occurred.
          </div>
        </div>
      ),
      intents: [<Button action="/">Return</Button>],
    });
  }

  const client = createPublicClient({
    chain: base,
    transport: http(),
  });

  let name = "";
  let description = "";
  let imageUri = "";
  let classType = "";

  try {
    const itemMetas = await client.readContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: [
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "itemMetas",
          outputs: [
            { internalType: "string", name: "itemName", type: "string" },
            {
              internalType: "string",
              name: "itemDescription",
              type: "string",
            },
            { internalType: "string", name: "itemClass", type: "string" },
            {
              internalType: "string",
              name: "itemImageUri",
              type: "string",
            },
            { internalType: "address", name: "initialOwner", type: "address" },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "itemMetas",
      args: [BigInt(tokenId)],
    });

    [name, description, classType, imageUri] = itemMetas;
  } catch (e) {
    console.error(e);
  }

  if (!(name && description && classType && imageUri)) {
    return c.res({
      title: "Enter the Tavern",
      image: defaultContainer(
        <div
          style={{
            alignItems: "center",
            border: "6px solid #ff3864",
            display: "flex",
            height: "60%",
            width: "90%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 48,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              padding: "0 120px",
              whiteSpace: "pre-wrap",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            NFT does not exist.
          </div>
        </div>
      ),
      intents: [<Button action="/">Return</Button>],
    });
  }

  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          display: "flex",
          height: "80%",
          width: "90%",
          padding: "0 60px",
          gap: "60px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            backgroundImage: `url(${uriToHttp(imageUri)[0]})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: "250px",
            width: "220px",
          }}
        ></div>
        <div
          style={{
            alignItems: "flex-start",
            color: "white",
            fontSize: 48,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", textAlign: "left" }}>{name}</div>
          <div
            style={{
              display: "flex",
              textAlign: "left",
              fontSize: 32,
            }}
          >
            Class: {classType}
          </div>
          <div style={{ display: "flex" }}>---</div>
          <div
            style={{
              display: "flex",
              textAlign: "left",
              fontSize: 32,
              width: "700px",
            }}
          >
            "{description}"
          </div>
        </div>
      </div>
    ),
    // TODO: should this change to a new url for items?
    intents: [
      <Button.Link
        href={`https://warpcast.com/~/compose?text=Enter%20the%20Tavern%20by%20%40raidguild&embeds[]=https://frame-guild-character-quest.vercel.app/api/id/${tokenId}`}
      >
        Share
      </Button.Link>,
      <Button.Link
        href={`${process.env.OPENSEA_URL}/${NFT_CONTRACT_ADDRESS}/${tokenId}`}
      >
        View on OpenSea
      </Button.Link>,
    ],
  });
});

app.frame("/id/:id", async (c) => {
  const tokenId = c.req.param("id");

  if (!tokenId) {
    return c.res({
      title: "Enter the Tavern",
      image: defaultContainer(
        <div
          style={{
            alignItems: "center",
            border: "6px solid #ff3864",
            display: "flex",
            height: "60%",
            width: "90%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 48,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              padding: "0 120px",
              whiteSpace: "pre-wrap",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            An error occurred.
          </div>
        </div>
      ),
      intents: [<Button action="/">Return</Button>],
    });
  }

  const client = createPublicClient({
    chain: base,
    transport: http(),
  });

  let name = "";
  let description = "";
  let imageUri = "";
  let classType = "";

  try {
    const itemMetas = await client.readContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: [
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "itemMetas",
          outputs: [
            { internalType: "string", name: "itemName", type: "string" },
            {
              internalType: "string",
              name: "itemDescription",
              type: "string",
            },
            { internalType: "string", name: "itemClass", type: "string" },
            {
              internalType: "string",
              name: "itemImageUri",
              type: "string",
            },
            { internalType: "address", name: "initialOwner", type: "address" },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "itemMetas",
      args: [BigInt(tokenId)],
    });

    [name, description, classType, imageUri] = itemMetas;
  } catch (e) {
    console.error(e);
  }

  if (!(name && description && classType && imageUri)) {
    return c.res({
      title: "Enter the Tavern",
      image: defaultContainer(
        <div
          style={{
            alignItems: "center",
            border: "6px solid #ff3864",
            display: "flex",
            height: "60%",
            width: "90%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 48,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              padding: "0 120px",
              whiteSpace: "pre-wrap",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            NFT does not exist.
          </div>
        </div>
      ),
      intents: [<Button action="/">Return</Button>],
    });
  }

  return c.res({
    title: "Enter the Tavern",
    image: defaultContainer(
      <div
        style={{
          alignItems: "center",
          border: "6px solid #ff3864",
          display: "flex",
          height: "80%",
          width: "90%",
          padding: "0 60px",
          gap: "60px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            backgroundImage: `url(${uriToHttp(imageUri)[0]})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: "250px",
            width: "220px",
          }}
        ></div>
        <div
          style={{
            alignItems: "flex-start",
            color: "white",
            fontSize: 48,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", textAlign: "left" }}>{name}</div>
          <div
            style={{
              display: "flex",
              textAlign: "left",
              fontSize: 32,
            }}
          >
            Class: {classType}
          </div>
          <div style={{ display: "flex" }}>---</div>
          <div
            style={{
              display: "flex",
              textAlign: "left",
              fontSize: 32,
              width: "700px",
            }}
          >
            "{description}"
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button action="/">Mint your own item!</Button>,
      <Button.Link
        href={`${process.env.OPENSEA_URL}/${NFT_CONTRACT_ADDRESS}/${tokenId}`}
      >
        View on OpenSea
      </Button.Link>,
    ],
  });
});

const IPFS_GATEWAYS = ["https://cloudflare-ipfs.com"];

export const uriToHttp = (uri: string): string[] => {
  try {
    const protocol = uri.split(":")[0].toLowerCase();
    switch (protocol) {
      case "data":
        return [uri];
      case "https":
        return [uri];
      case "http":
        return ["https" + uri.substring(4), uri];
      case "ipfs": {
        const hash = uri.match(/^ipfs:(\/\/)?(.*)$/i)?.[2];
        return IPFS_GATEWAYS.map((g) => `${g}/ipfs/${hash}`);
      }
      case "ipns": {
        const name = uri.match(/^ipns:(\/\/)?(.*)$/i)?.[2];
        return IPFS_GATEWAYS.map((g) => `${g}/ipns/${name}`);
      }
      case "ar": {
        const tx = uri.match(/^ar:(\/\/)?(.*)$/i)?.[2];
        return [`https://arweave.net/${tx}`];
      }
      default:
        return [];
    }
  } catch (e) {
    console.error(e);
    return ["", ""];
  }
};

const CLASSES_IMG_URI = {
  Goblet: "ipfs://QmeFcH3ad8DJr5nCV8sFWWcaeFTfyAg8z7T5ewcLVALJxU/goblet_withbg.png",
  Cloak: "ipfs://QmeFcH3ad8DJr5nCV8sFWWcaeFTfyAg8z7T5ewcLVALJxU/cloak_withbg.png",
  Amulet: "ipfs://QmeFcH3ad8DJr5nCV8sFWWcaeFTfyAg8z7T5ewcLVALJxU/amulet_withbg.png",
  Crown: "ipfs://QmeFcH3ad8DJr5nCV8sFWWcaeFTfyAg8z7T5ewcLVALJxU/crown_withbg.png",
};

const ITEM_NAMES = {
  Goblet: [
    "Arcane Chalice",
    "Enigma Ewer",
    "Mystical Chalice",
    "Celestial Goblet",
    "Luminary Cup",
    "Astral Vessel",
    "Sorcerer's  Chalice",
    "Phoenix Chalice",
    "Ethereal Goblet",
  ],

  Crown: [
    "Crown of Celestial Sovereignty",
    "Diadem of Eternal Wisdom",
    "Circlet of Arcane Dominion",
    "Coronet of Elemental Ascendance",
    "Tiara of Mystical Authority",
    "Regalia of Astral Kingship",
    "Crown of Ethereal Radiance",
    "Diadem of Timeless Majesty",
    "Circlet of Enchanted Dominion",
    "Coronet of Sacred Harmony",
  ],
  Amulet: [
    "Amulet of Eternal Vigilance",
    "Talisman of Serenity",
    "Charm of Arcane Protection",
    "Pendant of Divine Harmony",
    "Medallion of Elemental Resilience",
    "Sigil of Astral Projection",
    "Token of Celestial Guidance",
    "Glyph of Shadow Warding",
    "Emblem of Timeless Wisdom",
  ],
  Cloak: [
    "Cloak of Ethereal Shadows",
    "Mantle of Celestial Protection",
    "Shroud of Mystical Veils",
    "Veil of Arcane Concealment",
    "Cape of Elemental Mastery",
    "Robe of Astral Resonance",
    "Cloak of Whispering Winds",
    "Mantle of Eternal Frost",
    "Shroud of Fiery Embers",
    "Veil of Timeless Reflections",
  ],
};

const CLASS_DESCRIPTIONS = {
  Goblet: `The Goblet is a mystical vessel that holds the power of the arcane. It is said that the Goblet can summon the spirits of the dead and heal the living.`,
  Amulet: `The Amulet is a powerful talisman that protects the wearer from harm and grants them the power of the divine. It is said that the Amulet can ward off evil spirits and heal the sick.`,
  Crown: `The Crown is a symbol of celestial authority and wisdom. It is said that the Crown can grant the wearer the power of the gods and the knowledge of the ages.`,
  Cloak: `The Cloak is a magical garment that grants the wearer the power of the elements and the ability to move unseen. It is said that the Cloak can protect the wearer from harm and grant them the power of the wind and the rain.`,
};

export const GET = handle(app);
export const POST = handle(app);
