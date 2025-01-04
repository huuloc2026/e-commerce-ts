import { Get, JsonController, Controller, Body, Post } from 'routing-controllers';
import { AuthService } from './Auth.service';
import { IShop } from '../Shop/Shop.interface';


@JsonController('/auth')  
export class AuthController {
    @Post('/register') 
    async Register(@Body() input: IShop) {
        const result = await AuthService.SignUp(input)
        //console.log(result);
        return result
    }
}
