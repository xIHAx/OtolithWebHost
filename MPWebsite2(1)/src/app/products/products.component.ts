import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  _id:string;
  products: any = [];
  p: Number = 1;
  type: any;
  name:string;
  price : number;
  category: string;
  image:string;
  quantity:number;
  carts: any = [];
  loadedproductList: any[];  
  productID:string;
  constructor(private postsService: PostsService, private route: ActivatedRoute, private router:Router,private toastr: ToastrService, public service: AuthService) {
   
 
    if(service.isLoggedIn()){
      this.postsService.getCart(sessionStorage.getItem("userID")).subscribe(carts => {
        console.log(carts);
        this.carts = carts;
      },
        error => {
          console.log("Cart View Error: ", error);
        });
    }
    
    
    this.type = this.route.snapshot.paramMap.get("type");
    console.log(this.type);

    if(this.type == "All"){
      for (let i = 1; i <= this.products.length; i++) {
        this.products.push(`item ${i}`);
      }
      this.postsService.getAllProducts().subscribe(products => {
        this.products = products;
        this.loadedproductList = products;
        console.log(this.products);
        
        });
        
    }
    else{
    this.postsService.getProductsByCategory(this.type).subscribe(Data => 
      {
        this.products = Data;
        console.log("Product by category:", Data);
      });
    }
  }

  getNewDate()
   {
    if(this.type == "All"){
      this.postsService.getAllProductsNewDate().subscribe(products => {
        this.products = products;
        });
        
    }
    else{
    this.postsService.getProductsByNewDate(this.type).subscribe(Data => 
      {
        this.products = Data;
       
      });
    }
   }

   getOldDate()
   {
    if(this.type == "All"){
      this.postsService.getAllProductsOldDate().subscribe(products => {
        this.products = products;
        });
        
    }
    else{
    this.postsService.getProductsByOldDate(this.type).subscribe(Data => 
      {
        this.products = Data;
       
      });
    }
   }


  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  initializeItems(): void {
    this.products = this.loadedproductList;
  }

  search(event) {
    console.log('Function works!');
    this.initializeItems();
    //Set searchTerm with input from search bar
    const searchTerm = event.srcElement.value;
  
    if (!searchTerm) {
    return;
    }
    //Filters enquiries list with keywords from searchTerm
    this.products = this.products.filter(i => {
    if (i.name && searchTerm) {
    if (i.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
    return true;
    }
    return false;
    }
    });
  }

  inArray(target, array)
  {
    for(var i = 0; i < array.length; i++) 
    {
      if(array[i].name == target)
      {
        return true;
      }
    }
    return false; 
  }

 

  addToCart(pID, pName, pPrice, pCat, pImg) {
    if(this.inArray(pName, this.carts)){
      this.toastr.warning('This product is already in your cart', 'Warning');
    }
    else{
      if(confirm('Do you want to add item ?'))
      {
        console.log(pName, pPrice, pCat, pImg);
        this.productID = pID;
        this.name = pName;
        this.price = pPrice;
        this.category = pCat;
        this.image= pImg;
        this.quantity=1;
        
        this.postsService.addToCart(sessionStorage.getItem("userID"),this.productID,this.name,this.price,this.category,this.image,this.quantity) .subscribe(results =>{
          this.toastr.success("Successfully added item to cart!", 'Success!');
         
          })
        location.reload();
      }
    }
      
  }

}
