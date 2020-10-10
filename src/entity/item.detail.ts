import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Unique,
  RelationId,
} from "typeorm";
import InventoryItem from "./inventory.item";

@Entity()
@Unique(["inventoryItem"])
export default class ItemDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  specification!: string;

  @Column({ nullable: true })
  usage!: string;

  // One item detail corresponds to an inventary item.
  // One inventory item has an item detail.
  @OneToOne(() => InventoryItem, (inventoryItem) => inventoryItem.itemDetail)
  @JoinColumn()
  inventoryItem!: InventoryItem;

  // Show the related inventory item id
  @RelationId((itemDetail: ItemDetail) => itemDetail.inventoryItem)
  inventoryItemId!: number;
}
