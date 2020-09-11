import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { IsString, IsEmail } from "class-validator";
import { Exclude } from "class-transformer";
import { Group } from "./Groups";

@Entity({ name: "AdminUsers", orderBy: { id: "ASC" } })
export default class AdminUser extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "Id" })
  id?: number;

  @Column({ name: "Name", type: "varchar", length: 30, nullable: true })
  @IsString()
  name!: string;

  @Column({ name: "Email", type: "varchar", length: 40, nullable: true })
  @IsString()
  @IsEmail()
  email!: string;

  @Column({ name: "Password", type: "varchar", length: 255, nullable: true })
  @IsString()
  @Exclude({ toPlainOnly: true }) // "password" is hidden and can not be sent back to client.
  password!: string;

  @ManyToMany(() => Group, (adminUserGroup) => adminUserGroup.adminUsers, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: "AdminUserToGroup_JoinTable" })
  adminUserGroups!: Group[];
}
