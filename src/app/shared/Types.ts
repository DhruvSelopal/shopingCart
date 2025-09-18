export interface SignUp{
    username: string;
    email: string;
    password: string;
    fullName?: string;
}
export interface User extends SignUp{
  addresses?:Address[]
}
export interface LoginCredentials {
  email?:string,
  username?: string;
  password: string;
}
export interface productDetails{
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
    category?: string;
    inStock?: boolean;
}

export interface Product extends productDetails {
  id: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export interface cartProduct{
    quantity:number
}

export const constants = {
    cartTitle: "Cart",
    productTitle:"Products",
    productDescription:"Get your favrioute products from here"
}


