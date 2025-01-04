import { Expose } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsStrongPassword,
    MaxLength,
} from 'class-validator';

export class CreateNewShopDTO {
    @Expose()
    @IsNotEmpty()
    name: string

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Expose()
    @IsNotEmpty()
    password: string

    @Expose()
    @IsOptional()
    @IsPhoneNumber('VN',{message:"PhoneVN begin 09xx.xxx.xxx"})
    phone: string
    

    @Expose()
    @IsOptional()
    address: string

    @Expose()
    @IsOptional()
    dateOfBirth: Date

}