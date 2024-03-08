import { Button, Frog } from "frog";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/vercel";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  initialState: {
    drinkCount: 0,
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
      <Button action="/" value="Mint">
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
      <Button>Join Me (mint)</Button>,
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
      <Button>Join Me (mint)</Button>,
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
      <Button action="/9" value="Learn">
        Learn more
      </Button>,
      <Button action="/3" value="Archer">
        Archer
      </Button>,
      <Button action="/" value="Bar">
        Return
      </Button>,
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
      <Button action="/" value="Bar">
        Return
      </Button>,
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
      <Button action="/" value="Bar">
        Return
      </Button>,
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
      <Button>Join Me (mint)</Button>,
    ],
  });
});

export const GET = handle(app);
export const POST = handle(app);
