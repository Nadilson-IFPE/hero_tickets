import { App } from "./app";

require('dotenv').config({ path: '/.env' });

const app = new App();

app.listen()