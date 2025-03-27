import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Validate } from 'class-validator';
import { Post } from './post.entity';

@Entity({ tableName: 'Users' })
export class User {
    
    // @PrimaryGeneratedColumn()
    @PrimaryKey()
    @ApiProperty({ example: 0 , description: 'The id of the user' })
    @IsNumber()
    id: number;

    // @Column()
    @Property()
    @IsString()
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    // @Validate(CustomTextValidator)
    @Length(3, 5,{"message": "Минимальная длина имени 3, максимальная 5"})
    name: string;

    // @Column()
    @Property()
    age: number;

    @Property()
    test: string;

    @OneToMany(() => Post, post => post.author)
    posts = new Collection<Post>(this);
}