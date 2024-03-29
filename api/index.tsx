import { Button, Frog } from 'frog';
import { devtools } from 'frog/dev';
import { serveStatic } from 'frog/serve-static';

import { app as characters } from './characters.js';
import { app as items } from './items.js';

export const app = new Frog({ basePath: '/api' });

app.frame('/', c => {
  return c.res({
    image: 'http://localhost:5173/welcome.png',
    intents: [
      <Button action="/characters">Characters</Button>,
      <Button action="/items">Items</Button>,
    ],
  });
});

app.route('/characters', characters);
app.route('/items', items);

devtools(app, { serveStatic });
