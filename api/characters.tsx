import { Button, Frog } from 'frog';

export const app = new Frog();

app.frame('/', c => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#ff3864',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            fontSize: 60,
          }}
        >
          Characters
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://www.raidguild.org/">RaidGuild</Button.Link>,
      <Button.Reset>Reset</Button.Reset>,
    ],
  });
});
