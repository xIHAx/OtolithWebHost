import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationExtras } from '@angular/router'; 
import { AuthService } from '../auth.service'; 


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
  ID:any = [];
  programIDList:any = [];
  programIDArray:any = [];
  userInfo: any = [];
  userGCA: number;
  clicked: boolean;

  constructor(private router: Router,private postsService: PostsService,private toastr: ToastrService, private authService: AuthService) {
  this.quantity = 0;
  this.clicked = false; 
    this.postsService.getCart(sessionStorage.getItem("userID")).subscribe(carts => {
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
    });

    this.authService.getUserDetails(sessionStorage.getItem("userID")).subscribe(userInfo => {
      this.userInfo = userInfo;
      this.userGCA = userInfo[0].greenCurrency
    });
     
  }

  ngOnInit(): void {
    
  }

  useGC(){
    let value = (<HTMLSelectElement>document.getElementById("greenCurrencyInput")).value;
    var gc = parseInt(value);
    console.log(value);
    if(confirm('Do you want to deduct the total cost with your green currency?'))
    {
      if(value > this.userInfo[0].greenCurrency){
        alert("You don't have enough green currency");
        (<HTMLSelectElement>document.getElementById("greenCurrencyInput")).value = "0"
      }
      else if(gc > this.total){
        alert("You can't use more green currency than the total amount");
        (<HTMLSelectElement>document.getElementById("greenCurrencyInput")).value = "0"

      }
      else{
        document.getElementById("greenCurrencyInput")
        this.total = this.totalAmount() - gc;
        this.userGCA = this.userGCA - gc;
        this.clicked = true;
        (<HTMLSelectElement>document.getElementById("greenCurrencyInput")).value = "0"
  
      }
       
    }
    
  }

  undo(){
    location.reload();
  }

  passValue(){
    var afterGCDeduction: number;
    console.log(this.total);
    afterGCDeduction = this.total
    console.log(this.userGCA);
    if(this.total < 6){
      alert('You have to spend a minimum of $6 before you can check out.');
    }
    else{
      if(this.clicked == true){
        console.log(afterGCDeduction);
        console.log("clicked");
        
        for(var i = 0; i < this.carts.length; i++)
        {
          this.programIDList = this.carts[i].itemID;
          this.programIDArray.push(this.programIDList);
        }
        const navigationExtras: NavigationExtras = {state: {total: afterGCDeduction, ID: this.programIDArray, userGCA: this.userGCA}};
        this.router.navigate(['addOrder'], navigationExtras);
      }
      else{
        console.log("clicked1");
        for(var i = 0; i < this.carts.length; i++)
        {
          this.programIDList = this.carts[i].itemID;
          this.programIDArray.push(this.programIDList);
        }
        console.log(this.total);
        const navigationExtras: NavigationExtras = {state: {total: this.total, ID: this.programIDArray}};
        this.router.navigate(['addOrder'], navigationExtras);
    
      }
    
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
    if(confirm('Do you want to remove this item?'))
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
