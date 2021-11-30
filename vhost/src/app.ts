import * as express from 'express';

// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port = process.env.PORT || 8000;

app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});

