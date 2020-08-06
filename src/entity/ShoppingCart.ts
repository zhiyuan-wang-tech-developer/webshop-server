import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  OneToMany,
  JoinColumn,
  Unique,
} from "typeorm";
import { IsInt } from "class-validator";
import User from "./User";
import ShoppingCartItem from "./ShoppingCartItem";

@Entity({ name: "Shopping Cart", orderBy: { id: "ASC" } })
@Unique(["user"])
export default class ShoppingCart extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "Id" })
  id?: number;

  // One shopping cart belongs to one user.
  // One user has one shopping cart.
  @OneToOne(() => User, (user) => user.shoppingCart) // specify inverse side as a second parameter
  @JoinColumn()
  user!: User;

  // Show related user id
  // @Column({ type: "int", nullable: true })
  // userId?: number | null;

  // One shopping cart has many shopping cart items.
  // One shopping cart item belongs to one shopping cart.
  // Shopping cart cascades shopping cart items to change them.
  // Shopping cart is eager to load shopping cart items.
  @OneToMany(
    () => ShoppingCartItem,
    (shoppingCartItem) => shoppingCartItem.shoppingCart,
    { cascade: true, eager: true }
  )
  shoppingCartItems!: ShoppingCartItem[];

  @Column({ name: "Total Amount In Cart", type: "int", nullable: true })
  @IsInt()
  totalAmountInCart!: number;

  @Column({ name: "Total Price In Cart", type: "int", nullable: true })
  @IsInt()
  totalPriceInCart!: number;
}
