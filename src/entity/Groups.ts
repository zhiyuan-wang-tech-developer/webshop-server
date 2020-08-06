import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
} from "typeorm";
import AdminUser from "./AdminUsers";

@Entity({ name: "Groups" })
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToMany(() => AdminUser, (adminUser) => adminUser.adminUserGroups)
  adminUsers!: AdminUser[];
}
