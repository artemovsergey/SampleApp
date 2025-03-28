import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Validate } from 'class-validator';

export class User {
    
    @ApiProperty({ example: 0 , description: 'The id of the user' })
    @IsNumber()
    id: number;

    @IsString()
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    // @Validate(CustomTextValidator)
    @Length(3, 5,{"message": "Минимальная длина имени 3, максимальная 5"})
    name: string;

    @ApiProperty()
    age: number;

}