import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { IsString, IsInt, IsEnum } from "class-validator";
import InventoryItem from "./InventoryItem";
import ShoppingCart from "./ShoppingCart";
import { CartItemStatus } from "../utils/CustomTypes";

@Entity({ name: "Shopping Cart Items Table", orderBy: { id: "ASC" } })
@Unique(["shoppingCart", "inventoryItem"])
export default class ShoppingCartItem extends BaseEntity {
  // @PrimaryGeneratedColumn("uuid", { name: "Id" })
  @PrimaryGeneratedColumn({ name: "Id" })
  id?: number;

  // Many shopping cart items belong to one shopping cart.
  // One shopping cart has many shopping cart items.
  @ManyToOne(
    () => ShoppingCart,
    (shoppingCart) => shoppingCart.shoppingCartItems
  )
  @JoinColumn()
  shoppingCart!: ShoppingCart;

  // Show related shopping cart id
  // @Column({ type: "int", nullable: true })
  // shoppingCartId?: number | null;

  // Many shopping cart items can correspond to one inventory item.
  // One inventory item can correspond to many shopping cart items.
  // Shopping cart item is eager to load inventory item.
  @ManyToOne(
    () => InventoryItem,
    (inventoryItem) => inventoryItem.shoppingCartItems,
    { eager: true }
  )
  @JoinColumn()
  inventoryItem!: InventoryItem;

  // @Column({ type: "int", nullable: true })
  // inventoryItemId?: number | null;

  @Column({ name: "Item Total Amount", type: "int", nullable: true })
  @IsInt()
  amount: number = 1;

  // @Column({ name: "Item Total Price", type: "int", nullable: true })
  // @IsInt()
  // price!: number;

  @Column({
    name: "Item Status",
    type: "varchar",
    length: 25,
    nullable: true,
  })
  @IsString()
  @IsEnum(CartItemStatus)
  status: CartItemStatus = CartItemStatus.ORDERED;
}
