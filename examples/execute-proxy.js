const { Cluster } = require('../dist');

(async () => {
    // Create a cluster with 2 workers
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 2,
    });

    // Define a task
    await cluster.task(async ({ page, data }) => {
        if (data.authentication)
           await page.authenticate({username: 'foobar', password: 'Ya4zAzj8i' });
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
})();