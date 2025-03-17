import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @ApiProperty({ type: "string", description: "Логин пользователя", required: true })
    @IsNotEmpty()
    @IsString()
    @Expose()
    readonly login: string;

    @ApiProperty({ type: "string", description: "Пароль пользователя", required: true })
    @IsNotEmpty()
    @IsString()
    @Expose()
    readonly password: string;
}
