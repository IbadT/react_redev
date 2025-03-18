import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVideoDto {
    @ApiProperty({ type: "string", description: "", required: true })
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @ApiProperty({ type: "string", description: "", required: true })
    @IsNotEmpty()
    @IsString()
    readonly videoId: string;

    @ApiProperty({ type: "string", description: "", required: true })
    @IsString()
    readonly likeCount: string;

    @ApiProperty({ type: "string", description: "", required: true })
    @IsNotEmpty()
    @IsString()
    readonly viewCount: string;

    @ApiProperty({ type: "string", description: "", required: true })
    @IsNotEmpty()
    @IsString()
    readonly commentCount: string;

    @ApiProperty({ type: "string", description: "", required: true })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty({ type: "string", description: "", required: true })
    @IsNotEmpty()
    @IsString()
    readonly date: string;

};