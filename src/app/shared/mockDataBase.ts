import { delay, map, Observable,of } from "rxjs";
import { User,Address,Product,SignUp,LoginCredentials, productDetails } from "./Types";


export class MockDataBase{

    private setProductId:number = 104
    private  users = new Map<string,User>()
    private  products = new Map<number,Product>()
    private productCount = new Map<number,number>()

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

    registerUser(userSignUp:SignUp):Observable<boolean>{

        // for(let i =0; i < this.Users.length;i++){
        //     if(this.Users[i].username === userSignUp.username){
        //         return of(false).pipe(delay(2000))
        //     }
        // }

        if(!this.checkForUsername(userSignUp.username)) return of(false).pipe(delay(2000))

        let newUser:User = {
            email: userSignUp.email,
            password: userSignUp.email,
            username: userSignUp.username,
            fullName : userSignUp.fullName
        }
        this.users.set(userSignUp.username,newUser)
        return of(true).pipe(delay(3000))
    }

    login(loginDetails:LoginCredentials): Observable<(User | null)>{
        // for(let i = 0; i < this.Users.length;i++){
        //     if(this.Users[i].username === loginDetails.username && this.Users[i].password === loginDetails.password){
        //         return of(this.Users[i]).pipe(delay(3000))
                
        //     }
        // }
        if(this.users.has(loginDetails.username) && this.users.get(loginDetails.username)?.password === loginDetails.password){
            return of(this.users.get(loginDetails.username) as User).pipe(delay(3000))
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
            user.password = oldpas
            return of(true).pipe(delay(3000))
        }
        else return of(false).pipe(delay(1000))
        
    }


// These are the products mod data apis...........
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
        for(let  [key ,product] of this.products) prod.push(product);
        return of(prod).pipe(delay(3000))
    }

    getInStockProducts():Observable<Product[]>{
        const prod:Product[] = []
        for(let  [key ,product] of this.products){
            if(product.inStock) prod.push(product)
        }
        return of(prod).pipe(delay(3000))
    }

    addProduct(productdetails:productDetails):void{
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
        this.setProductId++;
    }

    editProduct(id:number,product:Product):void{
        this.products.set(id,product);
    }

    deleteProduct(id:number):void{
        this.products.delete(id);
    }
}