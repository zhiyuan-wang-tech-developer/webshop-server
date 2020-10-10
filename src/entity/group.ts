import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
} from "typeorm";
import AdminUser from "./admin.user";

@Entity({ name: "Groups", orderBy: { id: "ASC" } })
export default class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToMany(() => AdminUser, (adminUser) => adminUser.adminUserGroups)
  adminUsers!: AdminUser[];
}
