import { delay, map, Observable,of } from "rxjs";
import { User,Address,Product,SignUp,LoginCredentials, productDetails } from "./Types";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MockDataBase{

    private setProductId:number = 104
    private  users = new Map<string,User>()                  // all the users mapped to their username as its unique
    private  products = new Map<number,Product>()            // Storing all the products on pid
    private productCount = new Map<number,number>()          // total count of all the products
    private cartItems = new Map<string,Map<number,number>>() // string is username and map of product id and count
    

    private john_doe: User = 
    {
            username: "john_doe",
            email: "john@example.com",
            password: "hashed-password",
            fullName: "John Doe",
            addresses: [
            {
            street: "123 Elm Street",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "USA"
            }
        ]
    }
    
    // adding defualt values
    constructor(){
        this.users.set("john_doe",this.john_doe)

        //Products
        this.products.set(101,
            {
                id: 101,
                name: "Wireless Mouse",
                price: 25.99,
                description: "A smooth and responsive wireless mouse.",
                imageUrl: "/assets/mouse.jpg",
                category: "Electronics",
                inStock: true
            }
        )
        this.products.set(102,
            {
                id: 102,
                name: "Bluetooth Speaker",
                price: 59.99,
                description: "Portable speaker with deep bass.",
                imageUrl: "/assets/speaker.jpg",
                category: "Audio",
                inStock: false
            }
        )
        this.products.set(103,
            {
                id: 103,
                name: "Gaming Keyboard",
                price: 75.50,
                description: "Mechanical RGB keyboard for gaming.",
                imageUrl: "/assets/keyboard.jpg",
                category: "Electronics",
                inStock: true
            }
        )

        this.productCount.set(101,10);
        this.productCount.set(102,10);
        this.productCount.set(103,10);
    }



// These are the uesr mock data apis ............
// ###############################################

    private checkForUsername(username:string):boolean{
        return this.users.has(username)
    }

    private checkForEmail(email:string): string | false{
        for( let [username,user] of this.users){
            if(user.email === email) return user.username;
        }
        return false;
    }

    registerUser(userSignUp:SignUp):Observable<boolean | string>{

        // for(let i =0; i < this.Users.length;i++){
        //     if(this.Users[i].username === userSignUp.username){
        //         return of(false).pipe(delay(2000))
        //     }
        // }

        if(this.checkForUsername(userSignUp.username)) return of(false).pipe(delay(2000));
        if(!this.checkForEmail(userSignUp.email)) return of("email already in use").pipe(delay(2000))

        let newUser:User = {
            email: userSignUp.email,
            password: userSignUp.email,
            username: userSignUp.username,
            fullName : userSignUp.fullName
        }
        this.users.set(userSignUp.username,newUser)
        let pMap = new Map<number,number>() // product map for cart initialization
        this.cartItems.set(userSignUp.username,pMap)
        return of(true).pipe(delay(3000))
    }

    login(loginDetails:LoginCredentials): Observable<(string | null)>{
        // for(let i = 0; i < this.Users.length;i++){
        //     if(this.Users[i].username === loginDetails.username && this.Users[i].password === loginDetails.password){
        //         return of(this.Users[i]).pipe(delay(3000))
                
        //     }
        // }
        console.log(loginDetails.password)
        if(loginDetails.username ){
            console.log(loginDetails.username)
            if(this.checkForUsername(loginDetails.username) && this.users.get(loginDetails.username)?.password === loginDetails.password){
                return of(loginDetails.username).pipe(delay(3000))
            }
        } 
        else if(loginDetails.email){
            console.log(loginDetails.email)
            let username = this.checkForEmail(loginDetails.email);
            let user:User | undefined = undefined
            if(username){
                user = this.users.get(username)
            }
            if(user){
                if(loginDetails.password === user.password){
                    return of(loginDetails.username as string).pipe(delay(3000))
                }
            }
        }
        return of(null).pipe(delay(2000))
    }

    getUser(username:string):Observable<User | undefined>{
        // const user:User | undefined = this.Users.find((user) =>{
        //     user.username === username
        // })
        // return of(user).pipe(delay(1000))
        return of(this.users.get(username)).pipe(delay(1000))
    }

    updateUser(user:User,username:string):void{
        this.getUser(username).pipe(
            map((data) => data = user)
        )
    }

    changePassword(username:string,oldpas:string,newpas:string):Observable<boolean>{
        let user : User | undefined = this.users.get(username)
        if(user){
            user.password = newpas
            return of(true).pipe(delay(3000))
        }
        else return of(false).pipe(delay(1000))
        
    }


// These are the products mock data apis...........
// ###############################################
    getAllProducts(): Observable<Product[]>{
        const prod: Product[] = []
        for(let [id,product] of this.products){
            prod.push(product)
        }
        return of(prod).pipe(delay(5000))
    }

    getProductById(id:number) :Observable<Product | undefined>{
        return of(this.products.get(id)).pipe(delay(1000))
    }

    filterProductByCategory(category:string) : Observable<Product[]>{
        const prod:Product[] = []
        for(let  [key ,product] of this.products){
            if(product.category === category) prod.push(product)
        }
        return of(prod).pipe(delay(3000))
    }

    getInStockProducts():Observable<Product[]>{
        const prod:Product[] = []
        for(let  [key ,product] of this.products){
            if(product.inStock) prod.push(product)
        }
        return of(prod).pipe(delay(3000))
    }

    addProduct(productdetails:productDetails,pcount:number):void{
        const product:Product = {
            id:this.setProductId,
            name: productdetails.name,
            price: productdetails.price,
            description: productdetails.description,
            imageUrl: productdetails.imageUrl,
            category: productdetails.category,
            inStock: productdetails.inStock
        }
        this.products.set(this.setProductId,product)
        this.productCount.set(this.setProductId,pcount)
        this.setProductId++;
    }

    editProduct(id:number,product:Product):void{
        this.products.set(id,product);
    }

    deleteProduct(id:number):void{
        this.products.delete(id);
    }

// These are cart's mock data apis
// ###############################

    addToCart(username:string,pid:number):void{
        let count = this.cartItems.get(username)?.get(pid);
        let user = this.cartItems.get(username)
        if(count){ 
            this.cartItems.get(username)?.set(pid,count+1)
        }
        else if(user) this.cartItems.get(username)?.set(pid,1)
    }

    removeFromCart(username:string,pid:number):void{
        let user  = this.cartItems.get(username)
        if(user) this.cartItems.get(username)?.delete(pid)
    }

    getProductInCartCount(username:string):Observable<Map<number,number>>{
        let cartItemsCount = new Map<number,number>() // product id and its count for cart items
        let user = this.cartItems.get(username)
        if(user){
            for(let pid of user.keys()){
            let pcount = this.productCount.get(pid)
            if(pcount){
                cartItemsCount.set(pid,pcount)
            }
            }
        }
        return of(cartItemsCount).pipe(delay(6000)) 
    }

    cartQuantities(username:string):Observable<Map<number,number>>{
        const cartCount = new Map<number,number>();
        const user = this.cartItems.get(username);
        if(user){
            for(let [pid,count] of user){
                cartCount.set(pid,count)
            }
        }
        return of(cartCount).pipe(delay(4000))
    }

    updateCartQuantity(username:string,pid:number,quantity:number):void{
        let user = this.cartItems.get(username)
        if(user){
            user.set(pid,quantity)
        }
    }

}