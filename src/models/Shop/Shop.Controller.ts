import { Get, JsonController, Controller } from 'routing-controllers';
import 'reflect-metadata';

@Controller('/shops')  // Prefix /shops
export class ShopController {
    @Get('/test') // Route /test within /shops
    getTest() {
        return "Test endpoint";
    }
}
