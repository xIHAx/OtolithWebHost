import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-products-info',
  templateUrl: './products-info.component.html',
  styleUrls: ['./products-info.component.css'],

  
})
export class ProductsInfoComponent implements OnInit {
  _id: string;
  productsInfo: any = [];
  carts: any = [];
  private sub: any;
  product:any = [];
  name:string;
  price : number;
  category: string;
  image:string;
  quantity:number;
  wishlists: any = [];
  productID:string;
  itemID:string;
  constructor(private postsService: PostsService,private route: ActivatedRoute, private toastr: ToastrService, private router: Router, public service: AuthService) 
  { 
  
  
 
    if(service.isLoggedIn()){
      this.postsService.getCart(sessionStorage.getItem("userID")).subscribe(carts => {
        console.log(carts);
        this.carts = carts;
      },
        error => {
          console.log("Cart View Error: ", error);
        });

        this.postsService.getWishlist(sessionStorage.getItem("userID")).subscribe(wishlists => {
    
          this.wishlists = wishlists;
          });
    }    
    
  }  

   
  

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this._id = params['_id']; 
      this.postsService.getProductsUsingID(this._id).subscribe(productsInfo => {
      this.productsInfo = productsInfo;
      });
      });
  }

  deleteProducts()
  {
    if(confirm('Do you want to delete it ?'))
    {
  this.postsService.deleteProducts(this._id).subscribe(results => {
    this.router.navigateByUrl('/products/All');
  });
    }
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

  addToCart() {
    if(this.inArray(this.productsInfo[0].name, this.carts)){
      this.toastr.warning('This product is already in your cart', 'Warning');
    }
    else{
      if(confirm('Do you want to add item ?'))
    {
      this.productID = this.productsInfo[0]._id;
      this.name=this.productsInfo[0].name;
      this.price=this.productsInfo[0].price;
      this.category=this.productsInfo[0].category;
      this.image=this.productsInfo[0].image;
      this.quantity = 1;
      this.postsService.addToCart(sessionStorage.getItem("userID"),this.productID,this.name,this.price,this.category,this.image,this.quantity).subscribe(results =>{
        this.toastr.success("Successfully added item to cart!", 'Success!');
       
        })
      location.reload();
    }
    }

    
  }

  


   addToWishlist(){
    if(this.inArray(this.productsInfo[0].name, this.wishlists)){
      this.toastr.warning('Product is already in your wishlist', 'Warning');
    }
    else{
      if(confirm('Do you want to add item ?'))
    {
     this.itemID=this.productsInfo[0]._id; 
     this.name=this.productsInfo[0].name;
     this.price=this.productsInfo[0].price;
     this.category=this.productsInfo[0].category;
     this.image=this.productsInfo[0].image;
     this.quantity = 1;
     this.postsService.addToWishlist(sessionStorage.getItem("userID"),this.itemID,this.name,this.price,this.category,this.image,this.quantity).subscribe(results =>{
      this.toastr.success("Successfully added item to wishlist!", 'Success!');
  
      
      })
      location.reload();
    }
  }
    
 }

 
  
}
