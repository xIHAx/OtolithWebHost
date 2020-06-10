import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationExtras } from '@angular/router'; 


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: any = [];
  price : number;
  quantity : number;
  amount : number;
  total : number;
  msg:string;
  empty: boolean;
  constructor(private router: Router,private postsService: PostsService,private toastr: ToastrService) {
   this.quantity = 0;
  
      this.postsService.getCart(sessionStorage.getItem("userID")).subscribe(carts => {
        console.log(carts);
        this.carts = carts;
        this.totalAmount();
          
        if(this.carts.length == 0){
          this.msg = 'Your cart is empty!'
          this.empty = true
         }
        else{
          this.msg = ''
          this.empty = false
         }
        
      },
      error => {
        console.log("Cart View Error: ", error);
      }
      );
     
    
   }

  ngOnInit(): void {
    
  }

  passValue(){
    if(this.totalAmount() < 6){
      alert('You have to spend a minimum of $6 before you can check out.')
    }
    else{
      const navigationExtras: NavigationExtras = {state: {total: this.totalAmount()}};
      this.router.navigate(['addOrder'], navigationExtras);
    }
  
  }


  totalAmount(){
    this.total = 0;
    for(var i = 0; i <this.carts.length;i++){
      this.total +=  this.carts[i].price * this.carts[i].quantity;
    }
    return this.total
  }

  deleteCart(id:string)
  {
    if(confirm('Do you want to remove item ?'))
  {
 
    this.postsService.deleteCart(id).subscribe(results => {
      location.reload();
      });
    }
  }

  clearCart()
  {
   
    if(confirm('Are you sure you want to remove all items in the cart ?'))
  {
   
    this.postsService.clearCart(sessionStorage.getItem("userID")).subscribe(results => {
      location.reload();
      });
    }
  }

  increaseQuantity(id: number, oldquantity: string)
  {
    this.postsService.increaseQuantity(id, 
    parseInt(oldquantity)+1).subscribe(results => {
      location.reload();
    });
  }

  decreaseQuantity(id: number, oldquantity: string)
  {
    if(parseInt(oldquantity) <= 1)
    {
      alert('Quantity cannot be less than 1')
    }

    else{
      this.postsService.decreaseQuantity(id, 
      parseInt(oldquantity)-1).subscribe(results => {
        location.reload();
      });
    }
  }

}
