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

export const GET = handle(app);
export const POST = handle(app);
