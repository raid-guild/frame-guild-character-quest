import { Button, Frog } from "frog";
// import { neynar } from 'frog/hubs'
// import { neynar } from 'frog/hubs'
import { handle } from "frog/vercel";
import { app as mintApp } from "./mint.js";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

app.route("/finish", mintApp);

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
      <Button action="/3" value="Bard">
        Bard
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
      <Button action="/6" value="0">
        Buy an ale
      </Button>,
      <Button action="/4" value="Cleric">
        Talk to cleric
      </Button>,
      <Button action="/" value="Bar">
        Return to bar
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
          A Bard plays his lute and sings of Raids of yore.
        </div>
      </div>
    ),
    intents: [
      <Button value="Raids">Raids</Button>,
      <Button action="/5" value="Wizard">
        Wizard
      </Button>,
      <Button value="Follow">Follow</Button>,
      <Button action="/" value="Bar">
        Return to bar
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
      <Button value="Join">Join</Button>,
      <Button action="/7" value="Moloch">
        Moloch
      </Button>,
      <Button action="/" value="Bar">
        Return to bar
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
      <Button action="/9" value="Learn">
        Learn more
      </Button>,
      <Button action="/3" value="Bard">
        Bard
      </Button>,
      <Button action="/" value="Bar">
        Return to bar
      </Button>,
    ],
  });
});

app.frame("/6", (c) => {
  const { buttonValue } = c;

  const drinks = Number(buttonValue);

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
          tipsy (you've had {drinks} drinks).
        </div>
      </div>
    ),
    intents: [
      <Button
        action={drinks === 5 ? "/8" : "/6"}
        value={(drinks + 1).toString()}
      >
        Drink more
      </Button>,
      <Button action="/" value="Bar">
        Return to bar
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
    intents: [<Button value="Battle">Battle!</Button>],
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
    intents: [<Button value="Brood">Brood</Button>],
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
      <Button action="/6" value="Battle">
        Battle!
      </Button>,
      <Button action="/" value="Tavern">
        "Wow, that's cool (walk away)"
      </Button>,
      <Button action="/4" value="Adventure">
        Adventure
      </Button>,
    ],
  });
});

export const GET = handle(app);
export const POST = handle(app);
