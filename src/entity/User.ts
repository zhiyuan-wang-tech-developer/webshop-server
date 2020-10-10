import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Unique,
} from "typeorm";
import { IsString, IsEmail, Length, MinLength } from "class-validator";
import ShoppingCart from "./shopping.cart";
import { Exclude } from "class-transformer";
import { hash, compare } from "bcrypt";

@Entity({ name: "Users Table", orderBy: { name: "ASC" } })
@Unique(["name", "email"])
@Unique(["email"])
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "Id" })
  id?: number;

  @Column({ name: "Name", type: "varchar", length: 30, nullable: true })
  @IsString()
  @Length(0, 30)
  name!: string;

  @Column({ name: "Email", type: "varchar", length: 40, nullable: true })
  @IsString()
  @IsEmail()
  @Length(0, 40)
  email!: string;

  @Column({ name: "Password", type: "varchar", length: 255, nullable: true })
  @IsString()
  @MinLength(8)
  @Exclude({ toPlainOnly: true }) // "password" is hidden and can not be sent back to client.
  password!: string;

  @Column({ name: "Address", type: "varchar", length: 30, nullable: true })
  @IsString()
  @Length(0, 30)
  address!: string;

  @Column({ name: "Zip", type: "varchar", length: 20, nullable: true })
  @IsString()
  @Length(0, 20)
  zip!: string;

  @Column({ name: "City", type: "varchar", length: 20, nullable: true })
  @IsString()
  @Length(0, 20)
  city!: string;

  @Column({ name: "Country", type: "varchar", length: 20, nullable: true })
  @IsString()
  @Length(0, 20)
  country!: string;

  // One user owns a shopping cart.
  // One shopping cart belongs to a user.
  // User cascades shopping cart to change it.
  // User is eager to load shopping cart.
  @OneToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.user, {
    cascade: true,
    eager: true,
  })
  shoppingCart!: ShoppingCart;

  async hashPassword(plaintextPassword: string): Promise<void> {
    const hashedPassword = await hash(plaintextPassword, 8); // bcrypt will go through 2^8 iterations of processing.
    this.password = hashedPassword;
  }

  checkPassword(plaintextPassword: string): Promise<boolean> {
    return compare(plaintextPassword, this.password);
  }
}
