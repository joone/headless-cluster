
import * as puppeteer from 'puppeteer';

import { ResourceData } from '../ConcurrencyImplementation';
import SingleBrowserImplementation from '../SingleBrowserImplementation';

export default class Context extends SingleBrowserImplementation {

    protected async createResources(data: any): Promise<ResourceData> {
        const context = await (this.browser as puppeteer.Browser)
            .createBrowserContext(data.contextOptions || {});
        const page = await context.newPage();
        if (data.authentication)
            page.authenticate(data.authentication);
        return {
            context,
            page,
        };
    }

    protected async freeResources(resources: ResourceData): Promise<void> {
        await resources.context.close();
    }

}
