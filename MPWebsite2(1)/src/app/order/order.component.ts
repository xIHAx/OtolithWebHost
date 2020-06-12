import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any = [];
  p: Number = 1;
  carts: any = [];
  productName: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
  msg:string;
  empty: boolean;
  constructor(private postsService: PostsService,private toastr: ToastrService) {
    this.postsService.getOrders(sessionStorage.getItem("userID")).subscribe(orders => {
      for (let i = 1; i <= this.orders.length; i++) {
        this.orders.push(`item ${i}`);
      }
      this.orders = orders;

      if(this.orders.length == 0){
        this.msg = 'Your order history is empty!'
        this.empty = true
      }
      else{
        this.msg = ''
        this.empty = false
      }
    });
    this.postsService.getCart(sessionStorage.getItem("userID")).subscribe(carts => {
      console.log(carts);
      this.carts = carts;
    });
  }
  
  ngOnInit(): void {
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

  addToCart(pName, pPrice, pCat, pImg) {
    if(this.inArray(pName, this.carts)){
      this.toastr.warning('This product is already in your cart', 'Warning');
    }
    else{
      if(confirm('Do you want to add item to cart ?')){
        console.log(pName, pPrice, pCat, pImg);
        this.productName = pName;
        this.price = pPrice;
        this.category = pCat;
        this.image= pImg;
        this.quantity=1;
        
        this.postsService.addToCart(sessionStorage.getItem("userID"),this.productName,this.price,this.category,this.image,this.quantity) .subscribe(results =>{
          this.toastr.success("Successfully added item to cart!", 'Success!');
          })
        location.reload();
      }
    }
  }


  deleteOrder(orderDate:Date)
  {
    if(confirm('Are you sure you want to cancel your order ?'))
  {
    var currentdate= new Date().getDate();
    console.log(currentdate);
    for(var i = 0; i < this.orders.length; i++)
    {
     
      if(this.orders[i].order_date == orderDate)
      {
        var date = new Date(this.orders[i].order_date).getDate()+2;
      }
    }
      console.log(currentdate);
      console.log(date);
      if(currentdate <= date) {
        this.postsService.deleteOrder(orderDate).subscribe(results => {
        location.reload();
       
        });
      }
    
      else{
        alert('Sorry! You are only allow to cancel your order within 2 days from your order date');
       }   
  
  }
 
}
}
  