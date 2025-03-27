import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "Roles" })
export default class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    text: string
}