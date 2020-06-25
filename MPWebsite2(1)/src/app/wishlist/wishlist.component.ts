import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlists: any = [];
  carts: any = [];
  p: Number = 1;
  name: string;
  price : number;
  category: string;
  quantity : number;
  image: string;
  amount : number;
  total : number;
  msg:string;
  empty: boolean;
  ID:string;
  constructor(private postsService: PostsService, private route: ActivatedRoute, private router:Router,private toastr: ToastrService,public service: AuthService) { 
    this.quantity = 0;
    if(service.isLoggedIn()){
      this.postsService.getCart(sessionStorage.getItem("userID")).subscribe(carts => {
        console.log(carts);
        this.carts = carts;
      },
        error => {
          console.log("Cart View Error: ", error);
        });
    }
    for (let i = 1; i <= this.wishlists.length; i++) {
    this.wishlists.push(`item ${i}`);
  }
  this.postsService.getWishlist(sessionStorage.getItem("userID")).subscribe(wishlists => {
    this.wishlists = wishlists;
    if(this.wishlists.length == 0){
      this.msg = 'Your wishlist is empty!'
      this.empty = true
     }
    else{
      this.msg = ''
      this.empty = false
     }
  });
  }
  ngOnInit(): void {
  }

  deleteWishlist(id:string)
  {
    if(confirm('Do you want to remove item ?'))
  {
 
    this.postsService.deleteWishlist(id).subscribe(results => {
      location.reload();
    
      });
    }
  }
  
  
   removeWishlist(itemID:string)
  {
    this.postsService.removeWishlist(itemID).subscribe(results => {
    
      });
  }

  increaseQty(id: number, oldquantity: string)
  {
    this.postsService.increaseQty(id, 
    parseInt(oldquantity)+1).subscribe(results => {
      location.reload();
    });
  }

  decreaseQty(id: number, oldquantity: string)
  {
    if(parseInt(oldquantity) <= 1)
    {
      alert('Quantity cannot be less than 1')
    }

    else{
      this.postsService.decreaseQty(id, 
      parseInt(oldquantity)-1).subscribe(results => {
        location.reload();
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

  


  addToCart(pID,pName, pPrice, pCat, pImg, pQty) {
    if(this.inArray(pName, this.carts)){
      this.toastr.warning('Product is already in your cart', 'Warning');
    }
    else{
      if(confirm('Do you want to add item ?'))
      {
        console.log(pID,pName, pPrice, pCat, pImg);
        this.ID = pID;
        this.name = pName;
        this.price = pPrice;
        this.category = pCat;
        this.image= pImg;
        this.quantity= pQty;
        this.removeWishlist(this.ID);
        this.postsService.addToCart(sessionStorage.getItem("userID"), this.ID,this.name,this.price,this.category,this.image,this.quantity) .subscribe(results =>{
          this.toastr.success("Successfully added item to cart!", 'Success!');
          })
        location.reload();
      }
    }
      
  }

}
