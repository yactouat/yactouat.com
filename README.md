# yactouat.com

This is the full stack website and blog of yactouat.

## pre requisites

- a Google Cloud project
- env vars filled in (template in `.env.example`)
- Node.js and NPM installed with `nvm`:
  - `sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"`
  - `sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"`
  
### GCP integration

We use Cloud Logging and Error Reporting to monitor the web app.
You can set up error reporting notifications from the Google Cloud Console.

For this you need to enable the Google Cloud Logging and Error Reporting APIs.

You will also need a service account with the following permissions (`./gcp-creds.json` service account key, gitignored):

  - `errorreporting.errorEvents.create`
  - `logging.logEntries.create`

## deployment

- set up `pm2` to keep the app running:
  - `yarn build && pm2 start npm --name "yactouat.com" --time --update-env -- run start`
  - `pm2 save`
  - (if you didn't already set automatically `pm2` to start on boot with other services, you can do so by running `pm2 startup` and following the instructions)
