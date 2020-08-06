import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { AuthorityActionType } from "../utils/CustomTypes";

@Entity({ name: "Authority" })
export class Authority extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  groupId!: number;

  @Column()
  tableId!: number;

  @Column()
  action: AuthorityActionType = AuthorityActionType.GET;
}
