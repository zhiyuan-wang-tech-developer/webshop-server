import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  Unique,
} from "typeorm";
import { IsString, Length, IsNumber, IsEnum } from "class-validator";
import ShoppingCartItem from "./shopping.cart.item";
import ItemDetail from "./item.detail";
import {
  InventoryItemCategory,
  InventoryItemStatus,
} from "../utils/custom.types";

@Entity({ name: "Inventory Items Table", orderBy: { id: "ASC" } })
@Unique(["name"])
export default class InventoryItem extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "Id" })
  id?: number;

  @Column({ name: "Name", type: "varchar", length: 25, nullable: true })
  @IsString()
  @Length(0, 25)
  name!: string;

  @Column({ name: "Description", type: "text", nullable: true })
  @IsString()
  @Length(0, 200)
  description!: string;

  @Column({ name: "Unit Price", type: "int", nullable: true })
  @IsNumber()
  price!: number;

  @Column({ name: "Category", type: "varchar", length: 20, nullable: true })
  @IsString()
  @Length(0, 20)
  @IsEnum(InventoryItemCategory)
  category: InventoryItemCategory = InventoryItemCategory.OTHERS;

  @Column({ name: "Status", type: "varchar", length: 20, nullable: true })
  @IsString()
  @Length(0, 20)
  @IsEnum(InventoryItemStatus)
  status: InventoryItemStatus = InventoryItemStatus.FOR_SALE;

  @Column({ name: "QuantityInStock", type: "int", nullable: true })
  @IsNumber()
  quantityInStock!: number;

  // One inventory item can correspond to many shopping cart items.
  // One shopping cart item belongs to an inventory item.
  @OneToMany(
    () => ShoppingCartItem,
    (shoppingCartItem) => shoppingCartItem.inventoryItem
  )
  shoppingCartItems!: ShoppingCartItem[];

  // One inventory item has an item detail.
  // One item detail corresponds to an inventory item.
  // The inventory item cascades the item detail.
  // The inventory item is eager to load the item detail.
  @OneToOne(() => ItemDetail, (itemDetail) => itemDetail.inventoryItem, {
    cascade: true,
    eager: true,
  })
  itemDetail!: ItemDetail;
}
