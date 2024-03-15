/*
 How to set up a local proxy server: https://www.digitalocean.com/community/tutorials/how-to-set-up-squid-proxy-on-ubuntu-22-04

# Install Squid on Ubuntu:
sudo apt install squid apache2-utils
sudo htpasswd -c /etc/squid/passwords foobar

# Configure Squid:
vi /etc/squid/squid.conf
## Add the following lines:
auth_param basic program /usr/lib/squid/basic_ncsa_auth /etc/squid/passwords
auth_param basic realm proxy
acl authenticated proxy_auth REQUIRED
http_access allow authenticated

# Restart the Squid service:
sudo systemctl restart squid.service
sudo ufw allow 3128

curl -v -x http://foobar:Ya4zAzj8i@localhost:3128 http://www.google.com/
*/

'use strict';

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const context = await browser.createBrowserContext({ proxyServer: 'http://localhost:3128'});
  const page = await context.newPage()
  await page.authenticate({username: 'foobar', password: 'Ya4zAzj8i' });
  await page.goto('https://www.google.com');
  console.log(await page.content());
  await browser.close();
})();
