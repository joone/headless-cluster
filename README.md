# Headless Cluster [![NPM](https://img.shields.io/npm/v/chatgpt.svg)](https://www.npmjs.com/package/headless-cluster)
headless-cluster is a fork of the renowned [puppeteer-cluster](https://github.com/thomasdondorf/puppeteer-cluster) library, designed to streamline and optimize the process of managing multiple puppeteer instances concurrently. This project enhances the core functionalities of puppeteer-cluster by providing proxy support and integrating the latest features of Puppeteer.

# Proxy support

Headless-cluster enables authenticated proxy support. Pass a data object to cluster.execute containing proxy settings (contextOptions) and authentication credentials (authentication). Retrieve these in your task callback and use page.authenticate to set username and password. See the example code in examples/execute-proxy.js.

```js
  // Create a cluster with 2 workers
  const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_BROWSER,
      maxConcurrency: 2,
  });

  // Define a task
  await cluster.task(async ({ page, data }) => {
      await page.goto(data.url);
      const pageTitle = await page.evaluate(() => document.title);
      return pageTitle;
  });

  // Use try-catch block as "execute" will throw instead of using events
  try {
      // Execute the tasks one after another via execute
      let data = { contextOptions: {'proxyServer': 'http://localhost:3128'}, url: 'https://www.google.com',
          authentication: { username: 'foobar', password: 'Ya4zAzj8i' }};
      console.log(data);

      const result1 = await cluster.execute(data);
      console.log(result1);
      const result2 = await cluster.execute({ url: 'https://www.wikipedia.org'});
      console.log(result2);
  } catch (err) {
      // Handle crawling error
  }

  // Shutdown after everything is done
  await cluster.idle();
  await cluster.close();
```
* https://pptr.dev/api/puppeteer.browsercontextoptions
