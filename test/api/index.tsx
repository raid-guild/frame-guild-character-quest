import { Button, Frog } from "frog";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/vercel";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
// import { privateKeyToAccount } from "viem/accounts";
// import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import "dotenv/config";

// import nftAbi from "../lib/nft.json" assert { type: "json" };
// import {
//   CHARACTER_NAMES,
// CLASS_DESCRIPTIONS,
// CLASSES_IMG_URI,
//   NFT_CONTRACT_ADDRESS,
// } from "../lib/constants.js";

export const CLASSES_IMG_URI = {
  "Tavern Keeper":
    "ipfs://bafkreihqgxfn5etcfwcvtrporyqfz4i7y7jlb7ahqjyrdlq73uyqmynnti",
  Wizard: "ipfs://bafkreibvlpdp3uficvbx3kvk7rnqwbacxlzuzqqpf4lkcfuiamcfgsytmy",
  Cleric: "ipfs://bafkreibwrkh3izmbogqasi25amcs77b3dhdjlo2egmx7gagnhungn6dlha",
  Archer: "ipfs://bafkreifxdmvseaossg3fjcyiyccy42brvexfew5ip7krzyyurmdlndh724",
};

export const CHARACTER_NAMES = {
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

export const CLASS_DESCRIPTIONS = {
  "Tavern Keeper": `Welcome to the Raid Guild tavern. If you're looking for adventure and battle, you've come to the right place. I can help you join a Raid Party.`,
  Cleric: `I hear you're ready to join a Raid Party. Excellent! I am forming one to battle Moloch and we could use your skills.`,
  Archer: `I raise my bow and see my target, Moloch! After I weaken the demon with design, the Raid Party then attacks with an advantage.`,
  Wizard: `Smart Contracts are my wizardry! When I join a Raid Party, I attack Moloch with onchain powers and level up all my fellow Raiders.`,
};

export const NFT_CONTRACT_ADDRESS =
  "0xD4207017F90e020494b28432d54bA5c5Dc2A2b9F";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

type NFT_CLASS = "Tavern Keeper" | "Archer" | "Cleric" | "Wizard";

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
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
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
  const { fid } = frameData ?? {};

  if (!fid) {
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
          <div style={{ display: "flex" }}>Error minting character</div>
        </div>
      ),
    });
  }

  // const neynarClient = new NeynarAPIClient(process.env.NEYNAR_API_KEY ?? "");
  // const res = await neynarClient.fetchBulkUsers([fid]);

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
        CHARACTER_NAMES[_class as NFT_CLASS][
          Math.floor(
            Math.random() * CHARACTER_NAMES[_class as NFT_CLASS].length
          )
        ];
    }

    // if (buttonValue === "Address") {
    //   if (
    //     previousState.receivingAddressIndex - 1 <
    //     res.users[0].verified_addresses.eth_addresses.length - 1
    //   ) {
    //     previousState.receivingAddressIndex++;
    //   } else {
    //     previousState.receivingAddressIndex = 0;
    //   }
    // }

    // if (previousState.receivingAddressIndex > 0) {
    //   previousState.receivingAddress =
    //     res.users[0].verified_addresses.eth_addresses[
    //       previousState.receivingAddressIndex - 1
    //     ];
    // } else {
    //   previousState.receivingAddress = res.users[0].custody_address;
    // }
  });

  const client = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const nftBalance = await client.readContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: [
      {
        inputs: [
          { internalType: "address", name: "initialOwner", type: "address" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "ERC721EnumerableForbiddenBatchMint",
        type: "error",
      },
      {
        inputs: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address", name: "owner", type: "address" },
        ],
        name: "ERC721IncorrectOwner",
        type: "error",
      },
      {
        inputs: [
          { internalType: "address", name: "operator", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "ERC721InsufficientApproval",
        type: "error",
      },
      {
        inputs: [
          { internalType: "address", name: "approver", type: "address" },
        ],
        name: "ERC721InvalidApprover",
        type: "error",
      },
      {
        inputs: [
          { internalType: "address", name: "operator", type: "address" },
        ],
        name: "ERC721InvalidOperator",
        type: "error",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "ERC721InvalidOwner",
        type: "error",
      },
      {
        inputs: [
          { internalType: "address", name: "receiver", type: "address" },
        ],
        name: "ERC721InvalidReceiver",
        type: "error",
      },
      {
        inputs: [{ internalType: "address", name: "sender", type: "address" }],
        name: "ERC721InvalidSender",
        type: "error",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ERC721NonexistentToken",
        type: "error",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "index", type: "uint256" },
        ],
        name: "ERC721OutOfBoundsIndex",
        type: "error",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
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
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "claims",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getApproved",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "operator", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
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
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "operator", type: "address" },
          { internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
        name: "tokenByIndex",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "index", type: "uint256" },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_tokenId", type: "uint256" },
        ],
        name: "tokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
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
        {/* <div style={{ display: "flex" }}>{cannotMint ? "Cannot mint" : ""}</div> */}
      </div>
    ),
    intents,
  });
});

// app.frame("/mint", async (c) => {
//   // https://sepolia.etherscan.io/address/0xD4207017F90e020494b28432d54bA5c5Dc2A2b9F#code

//   const nftOwnerPrivateKey = process.env.NFT_OWNER_PRIVATE_KEY;

//   const { previousState } = c;

//   const account = privateKeyToAccount(nftOwnerPrivateKey as `0x${string}`);

//   const client = createWalletClient({
//     account,
//     chain: sepolia,
//     transport: http(),
//   });

//   let txHash = "";
//   try {
//     txHash = await client.writeContract({
//       address: NFT_CONTRACT_ADDRESS,
//       abi: nftAbi,
//       functionName: "safeMint",
//       account,
//       chain: sepolia,
//       args: [
//         previousState.receivingAddress,
//         previousState.name,
//         CLASS_DESCRIPTIONS[previousState.class as NFT_CLASS],
//         previousState.class,
//         CLASSES_IMG_URI[previousState.class as NFT_CLASS],
//       ],
//     });
//   } catch (e) {}

//   return c.res({
//     image: (
//       <div style={{ color: "white", display: "flex", fontSize: 60 }}>
//         <div style={{ display: "flex" }}>Minting your character...</div>
//       </div>
//     ),
//     intents: [
//       <Button action="/status" value={txHash}>
//         Check Status
//       </Button>,
//     ],
//   });
// });

// app.frame("/status", async (c) => {
//   const { buttonValue } = c;
//   const client = createPublicClient({
//     chain: sepolia,
//     transport: http(),
//   });

//   let status = "pending";
//   try {
//     const txReceipt = await client.getTransactionReceipt({
//       hash: buttonValue as `0x${string}`,
//     });
//     status = txReceipt.status;
//   } catch (e) {}

//   return c.res({
//     image: (
//       <div
//         style={{
//           color: "white",
//           display: "flex",
//           flexDirection: "column",
//           fontSize: 60,
//         }}
//       >
//         <div style={{ display: "flex" }}>Checking transaction status...</div>
//         <div style={{ display: "flex" }}>
//           {status === "pending"
//             ? "Pending"
//             : status === "success"
//             ? "Success"
//             : "Failed"}
//         </div>
//       </div>
//     ),
//     intents: [
//       <Button action="/status" value={buttonValue}>
//         Re-Check Status
//       </Button>,
//       <Button.Link href={`https://sepolia.etherscan.io/tx/${buttonValue}`}>
//         View on Etherscan
//       </Button.Link>,
//     ],
//   });
// });

export const GET = handle(app);
export const POST = handle(app);
