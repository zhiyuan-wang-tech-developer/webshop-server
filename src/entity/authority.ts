import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";
import { AuthorityAction } from "../utils/custom.types";

@Entity({ name: "Authority" })
@Unique(["groupId", "tableId", "action"])
export default class Authority extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  groupId!: number;

  @Column()
  tableId!: number;

  @Column()
  action: AuthorityAction = AuthorityAction.GET;
}
