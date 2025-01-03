
import { Expose } from "class-transformer"
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator"

export class UserDTO {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email:string

  @Expose()
  @IsNotEmpty()
  @MinLength(6)
  password:string

  @Expose()
  @IsNotEmpty()
  name:string

  @Expose()
  @IsOptional()
  doB?:Date

  @Expose()
  @IsOptional()
  gender?:string

  @Expose()
  @IsOptional()
  address?:string

  @Expose()
  @IsOptional()
  phone?:string

  @Expose()
  @IsOptional()
  avatar?:string

  @Expose()
  @IsOptional()
  role?:string
}

