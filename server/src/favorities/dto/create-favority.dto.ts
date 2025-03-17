import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateFavorityDto {
    @ApiProperty({ type: 'string', description: "", required: true })
    @IsNotEmpty()
    @IsString()
    readonly title: string;
    
    @ApiProperty({ type: 'string', description: "", required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    
    @ApiProperty({ type: 'string', description: "", required: true })
    @IsNotEmpty()
    @IsString()
    readonly sorted: string;
    
    @ApiProperty({ type: 'string', description: "", required: true })
    @IsNotEmpty()
    @IsString()
    readonly maxCount: string;

    @ApiProperty({
        description: 'Список идентификаторов строк',
        type: [String], // Указываем массив строк
        example: [
            'd1597c74-b88d-44c7-9c3a-9ae428712747', 
            '355a51c2-1ab4-435e-816f-aec261d533a2', 
            '4e418330-41a3-4edb-bd0d-e5e0d2cf7580'
        ], // Пример значения
    })
    @IsArray() // Проверяем, что это массив
    @ArrayNotEmpty() // Проверяем, что массив не пустой
    @IsString({ each: true }) // Проверяем, что каждый элемент массива является строкой
    readonly videoIds: string[];
}