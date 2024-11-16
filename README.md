# yactouat.com

This is the full stack website and blog of yactouat.

## deployment

### `pm2`

- set up `pm2` to keep the app running:
  - `yarn build && pm2 start npm --name "yactouat.com" --time --update-env -- run start`
  - `pm2 save`
  - (if you didn't already set automatically `pm2` to start on boot with other services, you can do so by running `pm2 startup` and following the instructions)


### `nginx`

- point `@` `www` DNS A records to the server's public IP (you can optionally add IPV6 support)
- `sudo nano /etc/nginx/sites-available/yactouat.com`
- add the following:

```
# Define a server block for handling HTTP requests
server {
    listen 80;
    server_name yactouat.com www.yactouat.com;

    # main location block to handle all requests to root path
    location / {
        # forward requests to Node.js app running on port 6002
        proxy_pass http://localhost:6002;
        # use HTTP/1.1 protocol for proxy
        proxy_http_version 1.1;
        # enable WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        # pass the original host header
        proxy_set_header Host $host;
        # ensure proxy doesn't serve cached content
        proxy_cache_bypass $http_upgrade;
        # pass the real IP of the client
        proxy_set_header X-Real-IP $remote_addr;
        # pass the full chain of forwarded IPs
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # location block specifically for static files
    location /public {
        # point to the physical directory containing static files
        alias /path/to/your/app/dist/public;
    }
}
```

(change the paths to the actual ones)

```
sudo ln -s /etc/nginx/sites-available/yactouat.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

- make sure port 80 is open in the firewall => `sudo ufw allow 80/tcp`
- `sudo certbot --nginx -d yactouat.com -d www.yactouat.com`
- disallow port 80 when done => `sudo ufw delete allow 80/tcp`

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
