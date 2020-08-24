import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";
import { AuthorityAction } from "../utils/CustomTypes";

// @Unique(["groupId", "tableId", "action"])
@Entity({ name: "Authority" })
export class Authority extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  groupId!: number;

  @Column()
  tableId!: number;

  @Column()
  action: AuthorityAction = AuthorityAction.GET;
}
