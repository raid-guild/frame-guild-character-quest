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

const defaultErrorResponse = () => ({
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

app.frame("/", (c) => {
  const { verified } = c;

  if (!verified) return c.res(defaultErrorResponse());

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
            fontFamily: "Times",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
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
      <Button action="/2">Bartender</Button>,
      <Button action="/3">Archer</Button>,
      <Button action="/4">Cleric</Button>,
      <Button action="/5">Wizard</Button>,
    ],
  });
});

app.frame("/2", (c) => {
  const { verified } = c;

  if (!verified) return c.res(defaultErrorResponse());
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
        />
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
          The Tavern Keeper offers you a drink. "The Cleric is looking for
          adventurers!"
        </div>
      </div>
    ),
    intents: [
      <Button action="/finish" value="Tavern Keeper">
        Join Me (Mint)
      </Button>,
      <Button action="/6" value="Drink">
        Drink
      </Button>,
      <Button action="/4" value="Adventure">
        Adventure
      </Button>,
    ],
  });
});

app.frame("/3", (c) => {
  const { verified } = c;

  if (!verified) return c.res(defaultErrorResponse());

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
            display: "flex",
            flexDirection: "column",
            backgroundImage:
              "url(https://cloudflare-ipfs.com/ipfs/bafkreifxdmvseaossg3fjcyiyccy42brvexfew5ip7krzyyurmdlndh724)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: "250px",
            width: "160px",
          }}
        />
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
          An Archer is perched on a stool. You admire their sleek bow and
          arrows.
        </div>
      </div>
    ),
    intents: [
      <Button action="/finish" value="Archer">
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
  const { verified } = c;

  if (!verified) return c.res(defaultErrorResponse());

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
              "url(https://cloudflare-ipfs.com/ipfs/bafkreibwrkh3izmbogqasi25amcs77b3dhdjlo2egmx7gagnhungn6dlha)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: "250px",
            width: "220px",
          }}
        />
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
          A Cleric is recruiting raiders to join in defeating Moloch's minions.
        </div>
      </div>
    ),
    intents: [
      <Button action="/finish" value="Cleric">
        Join Me (Mint)
      </Button>,
      <Button.Link href="https://www.raidguild.org/join/1">Raid</Button.Link>,
      <Button action="/7">Moloch</Button>,
    ],
  });
});

app.frame("/5", (c) => {
  const { verified } = c;

  if (!verified) return c.res(defaultErrorResponse());

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
              "url(https://cloudflare-ipfs.com/ipfs/bafkreibvlpdp3uficvbx3kvk7rnqwbacxlzuzqqpf4lkcfuiamcfgsytmy)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: "250px",
            width: "160px",
          }}
        />
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
  const { buttonValue, deriveState, verified } = c;

  if (!verified) return c.res(defaultErrorResponse());

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
        />
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
  const { verified } = c;

  if (!verified) return c.res(defaultErrorResponse());

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
        />
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
  const { verified } = c;

  if (!verified) return c.res(defaultErrorResponse());

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
  const { verified } = c;

  if (!verified) return c.res(defaultErrorResponse());

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
              "url(https://cloudflare-ipfs.com/ipfs/bafkreibvlpdp3uficvbx3kvk7rnqwbacxlzuzqqpf4lkcfuiamcfgsytmy)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: "250px",
            width: "160px",
          }}
        />
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
          "I deal in the art of spellcraft, weaving together arcane tapestries
          upon which we can build tools to defeat Moloch once and for all!"
        </div>
      </div>
    ),
    intents: [
      <Button action="/finish" value="Wizard">
        Join Me (Mint)
      </Button>,
      <Button.Link href="https://discord.com/invite/rGFpfQf">
        Battle!
      </Button.Link>,
      <Button action="/">Return</Button>,
    ],
  });
});

app.frame("/finish", async (c) => {
  const { deriveState, buttonValue, frameData, verified } = c;

  if (!verified) return c.res(defaultErrorResponse());

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
        Mint Character
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
            Hi {state.name}.
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            You're a{state.class === "Archer" ? "n" : ""} {state.class}
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

  const { previousState, verified } = c;

  if (!verified) return c.res(defaultErrorResponse());

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
            { internalType: "string", name: "characterName", type: "string" },
            {
              internalType: "string",
              name: "characterDescription",
              type: "string",
            },
            { internalType: "string", name: "characterClass", type: "string" },
            {
              internalType: "string",
              name: "characterImageUri",
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
          Minting your character...
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
  const { buttonValue, verified } = c;

  if (!verified) return c.res(defaultErrorResponse());

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
    <Button action={`/share/${tokenId}`}>View Character</Button>,
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
  const { verified } = c;

  if (!verified) return c.res(defaultErrorResponse());

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
    const characterMetas = await client.readContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: [
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "characterMetas",
          outputs: [
            { internalType: "string", name: "characterName", type: "string" },
            {
              internalType: "string",
              name: "characterDescription",
              type: "string",
            },
            { internalType: "string", name: "characterClass", type: "string" },
            {
              internalType: "string",
              name: "characterImageUri",
              type: "string",
            },
            { internalType: "address", name: "initialOwner", type: "address" },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "characterMetas",
      args: [BigInt(tokenId)],
    });

    [name, description, classType, imageUri] = characterMetas;
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
        />
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
    const characterMetas = await client.readContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: [
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "characterMetas",
          outputs: [
            { internalType: "string", name: "characterName", type: "string" },
            {
              internalType: "string",
              name: "characterDescription",
              type: "string",
            },
            { internalType: "string", name: "characterClass", type: "string" },
            {
              internalType: "string",
              name: "characterImageUri",
              type: "string",
            },
            { internalType: "address", name: "initialOwner", type: "address" },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "characterMetas",
      args: [BigInt(tokenId)],
    });

    [name, description, classType, imageUri] = characterMetas;
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
        />
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
      <Button action="/">Mint your own character!</Button>,
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
  "Tavern Keeper":
    "ipfs://bafkreihqgxfn5etcfwcvtrporyqfz4i7y7jlb7ahqjyrdlq73uyqmynnti",
  Wizard: "ipfs://bafkreibvlpdp3uficvbx3kvk7rnqwbacxlzuzqqpf4lkcfuiamcfgsytmy",
  Cleric: "ipfs://bafkreibwrkh3izmbogqasi25amcs77b3dhdjlo2egmx7gagnhungn6dlha",
  Archer: "ipfs://bafkreifxdmvseaossg3fjcyiyccy42brvexfew5ip7krzyyurmdlndh724",
};

const CHARACTER_NAMES = {
  "Tavern Keeper": [
    "Gideon Tavernkeep",
    "Hilda Stoutbrew",
    "Luther Blackbarrel",
    "Evangeline Meadwright",
    "Thaddeus Caskkeeper",
    "Gertrude Frothybrew",
    "Reginald Ironflask",
    "Matilda Barrelblossom",
    "Barnaby Alequaffer",
    "Prudence Winesoak",
    "Horace Tankardtoss",
    "Clementine Hopsworthy",
    "Algernon Kegmaster",
    "Esmeralda Stoutstirrer",
    "Ignatius Barleyblend",
    "Ophelia Brewbinder",
    "Rupert Meadswiller",
    "Winifred Steinshaper",
    "Montgomery Hoptinker",
    "Constance Sudslinger",
    "Thelonious Beervat",
    "Eloise Quenchwell",
    "Ferdinand Lagerlash",
    "Imogene Cidercrafter",
    "Winston Brewster",
    "Agatha Fermentress",
    "Roderick Brewbottom",
    "Millicent Aletapper",
    "Bartholomew Caskbreaker",
    "Dorothea Winepourer",
    "Percival Stoutstrider",
    "Adelaide Meadmaster",
    "Reginald Barrelmender",
    "Marigold Alebinder",
    "Archibald Caskcarver",
    "Cecilia Frothwhisper",
    "Bartholomew Fermenter",
    "Agnes Hoptapper",
    "Fitzgerald Sudssmith",
    "Philomena Mugslinger",
    "Humphrey Winemaster",
    "Euphemia Steinshaper",
    "Reginald Hopsbrewer",
    "Tabitha Aletender",
    "Cornelius Stoutbelly",
    "Wilhelmina Vinebinder",
    "Percival Barleyfroth",
    "Ophelia Meadmender",
    "Barnaby Kegmender",
    "Matilda Brewstirrer",
    "Archibald Caskmaker",
    "Edith Mugslinger",
    "Rupert Steinmender",
    "Winifred Hopwhisper",
    "Ferdinand Sudsbrewer",
    "Gertrude Barrelshaper",
    "Thelonious Fermenter",
    "Esmeralda Alebinder",
    "Montgomery Meadcarver",
    "Agatha Barrelmender",
    "Reginald Hoptapper",
    "Bartholomew Sudswhisper",
    "Philomena Brewmaster",
    "Percival Stoutmender",
    "Adelaide Hopsbrewer",
    "Cornelius Brewtapper",
    "Wilhelmina Fermentress",
    "Humphrey Caskmender",
    "Euphemia Alewhisper",
  ],

  Archer: [
    "Faelan Archeron",
    "Aria Swiftshot",
    "Silas Emberarrow",
    "Sylvan Windwhisper",
    "Artemis Swiftshadow",
    "Eldric Shadowstep",
    "Lyra Nightshade",
    "Thorn Swiftthorn",
    "Sylas Silverwind",
    "Raven Shadowswift",
    "Caelum Hawkstrike",
    "Elara Arrowheart",
    "Alden Longshot",
    "Rowan Raincaller",
    "Sariel Starfall",
    "Thalia Sunbow",
    "Garrett Eagleeye",
    "Niamh Wildwood",
    "Dorian Moonshot",
    "Iliad Forestwalker",
    "Luna Shadowarrow",
    "Tristan Sunseeker",
    "Astrid Swiftsight",
    "Fenrir Firebrand",
    "Eris Windwalker",
    "Thorn Oakenshot",
    "Nova Stormwing",
    "Cassian Starfury",
    "Lysander Icearrow",
    "Aurora Dawnstrike",
    "Kieran Nightstalker",
    "Briar Hawkeye",
    "Elena Sunshadow",
    "Orion Frostfire",
    "Aurora Dawnarrow",
    "Darius Blackfeather",
    "Cassia Moonwhisper",
    "Riven Silentarrow",
    "Elowen Wildheart",
    "Asher Shadowblade",
    "Fiora Frostwind",
    "Elden Swiftblade",
    "Aurelia Starshot",
    "Thorne Swiftstrike",
    "Lyric Moonshade",
    "Oriana Stormarrow",
    "Dante Emberblade",
    "Evangeline Frostfall",
    "Felix Swiftwind",
    "Celestia Starfrost",
    "Kaelen Sunflare",
    "Seraphina Nightfire",
    "Aldric Shadowthorn",
    "Soren Swiftarrow",
    "Nyx Shadowwhisper",
    "Rosalind Rainwhisper",
    "Alden Sunshard",
    "Thalia Swiftstrike",
    "Galen Stormfury",
    "Elara Emberstorm",
    "Phoenix Firestride",
    "Aria Moonshard",
    "Kaelan Stormstrike",
    "Rhiannon Skydancer",
    "Evanthe Frostbloom",
    "Cyrus Windchaser",
    "Vesper Nightblade",
    "Sasha Raincaller",
  ],
  Cleric: [
    "Eadric Lightbringer",
    "Aurelia Divineheart",
    "Cedric Soulforge",
    "Elara Dawnblessed",
    "Thalia Spiritcaller",
    "Finnian Holyhammer",
    "Seraphina Faithkeeper",
    "Gwendolyn Sunseeker",
    "Aldric Healinghand",
    "Lysander Celestialbloom",
    "Cassandra Moonwhisper",
    "Benedict Sacredflame",
    "Rosalind Dawnshaper",
    "Evangeline Divinegrace",
    "Dorian Lightbringer",
    "Isolde Soulkeeper",
    "Valeria Radiancecaller",
    "Caius Holyheart",
    "Ophelia Divinebearer",
    "Galahad Sanctifiedsword",
    "Elena Spiritforge",
    "Aurora Divinehope",
    "Hector Lightbringer",
    "Rowan Celestialflame",
    "Theodora Sunshaper",
    "Faelan Dawnblessed",
    "Aurelius Faithkeeper",
    "Thorn Holyblade",
    "Elowen Mooncaller",
    "Alden Sunseeker",
    "Serenity Divinegrace",
    "Cassius Lightbearer",
    "Elysia Spiritbinder",
    "Luther Holyhammer",
    "Evangeline Moonwhisper",
    "Cyrus Lightbringer",
    "Isolde Celestialkeeper",
    "Thaddeus Radiancecaller",
    "Gwendolyn Holyheart",
    "Adelaide Divinebearer",
    "Benedict Sanctifiedsoul",
    "Rosalind Dawnkeeper",
    "Eadric Spiritforge",
    "Aurelia Divinehope",
    "Cedric Lightbringer",
    "Elara Soulkeeper",
    "Thalia Holyhand",
    "Finnian Celestialflame",
    "Seraphina Sunshaper",
    "Gwendolyn Divineblessed",
    "Aldric Faithkeeper",
    "Lysander Radiancecaller",
    "Cassandra Divinegrace",
    "Benedict Moonwhisper",
    "Rosalind Lightbringer",
    "Evangeline Celestialkeeper",
    "Dorian Sunbearer",
    "Isolde Holyblade",
    "Valeria Mooncaller",
    "Caius Divineflame",
    "Ophelia Sunseeker",
    "Galahad Lightbringer",
    "Elena Celestialbinder",
    "Aurora Soulforge",
    "Hector Dawnkeeper",
    "Rowan Radiancecaller",
    "Theodora Lightbringer",
    "Faelan Divinehope",
    "Aurelius Spiritcaller",
    "Thorn Holyflame",
    "Elowen Celestialshaper",
    "Alden Divineheart",
    "Serenity Sanctifiedsoul",
    "Cassius Holyblade",
    "Elysia Radiancebearer",
    "Luther Moonwhisper",
    "Evangeline Holyhand",
  ],
  Wizard: [
    "Seraphina Shadowdancer",
    "Meridia Starwhisper",
    "Elowyn Frostweaver",
    "Miranda Moonshroud",
    "Liora Stormshaper",
    "Icarus Fireforge",
    "Selene Frostbinder",
    "Isabella Moonwhisper",
    "Frost Whisperer Ilaria",
    "Sorin Embercaster",
    "Thaddeus Spellweaver",
    "Aurelia Arcanemistress",
    "Cedric Shadowcaster",
    "Elara Frostweaver",
    "Eadric Flamecaller",
    "Valeria Nightwhisper",
    "Gwendolyn Stormweaver",
    "Aldric Frostfire",
    "Cassandra Moonshaper",
    "Caius Thunderweaver",
    "Ophelia Starcaller",
    "Galahad Spellbinder",
    "Elena Frostwhisper",
    "Aurora Shadowcaster",
    "Hector Arcanemage",
    "Rowan Stormbinder",
    "Theodora Frostshaper",
    "Faelan Moonweaver",
    "Aurelius Firecaller",
    "Thorn Nightwhisper",
    "Elowen Stormweaver",
    "Alden Frostflame",
    "Serenity Spellmistress",
    "Cassius Shadowweaver",
    "Elysia Frostcaller",
    "Luther Starshaper",
    "Evangeline Thundercaster",
    "Dorian Arcanist",
    "Isolde Spellbinder",
    "Valeria Moonweaver",
    "Caius Frostcaller",
    "Ophelia Shadowweaver",
    "Galahad Arcanemist",
    "Elena Moonshaper",
    "Aurora Frostwhisper",
    "Hector Shadowbinder",
    "Rowan Arcanemage",
    "Theodora Stormcaller",
    "Faelan Spellweaver",
    "Aurelius Nightshaper",
    "Thorn Frostweaver",
    "Elowen Shadowmistress",
    "Alden Mooncaller",
    "Serenity Thunderweaver",
    "Cassius Starcaster",
    "Elysia Frostwhisperer",
    "Luther Arcanemage",
    "Evangeline Spellshaper",
    "Dorian Shadowcaller",
    "Isolde Frostweaver",
    "Valeria Moonwhisperer",
    "Caius Starbinder",
    "Ophelia Frostmistress",
    "Galahad Thunderweaver",
    "Elena Stormshaper",
    "Aurora Frostcaster",
    "Hector Spellbinder",
    "Rowan Shadowmage",
    "Theodora Frostwhisperer",
    "Faelan Moonshaper",
    "Aurelius Spellmistress",
    "Thorn Frostweaver",
    "Elowen Starshaper",
    "Alden Arcanist",
    "Serenity Shadowcaller",
    "Cassius Frostweaver",
    "Elysia Mooncaster",
    "Luther Stormbinder",
    "Evangeline Frostweaver",
  ],
};

const CLASS_DESCRIPTIONS = {
  "Tavern Keeper": `Welcome to the Raid Guild tavern. If you're looking for adventure and battle, you've come to the right place. I can help you join a Raid Party.`,
  Cleric: `I hear you're ready to join a Raid Party. Excellent! I am forming one to battle Moloch and we could use your skills.`,
  Archer: `I raise my bow and see my target, Moloch! After I weaken the demon with design, the Raid Party then attacks with an advantage.`,
  Wizard: `Smart Contracts are my wizardry! When I join a Raid Party, I attack Moloch with onchain powers and level up all my fellow Raiders.`,
};

export const GET = handle(app);
export const POST = handle(app);
