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
  program_ID:any = [];
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

 


  deleteOrder(ID:string)
  {
    if(confirm('Are you sure you want to cancel your order ?'))
  {
    var currentdate= new Date().getDate();
    
    for(var i = 0; i < this.orders.length; i++)
    {
      
      var orderDate = new Date(this.orders[i].order_date).getDate()+2;
      var userName = sessionStorage.getItem("LoggedIn");
   
     console.log(orderDate);
     console.log(currentdate);
      if(orderDate >= currentdate && this.orders[i]._id == ID)
      {
      console.log(this.orders[i].itemID);
    
      
        this.postsService.removeFromPrograms(this.orders[i].itemID, userName).subscribe(results => {  
        });
        
        
        this.postsService.deleteOrder(ID).subscribe(results => {   
        location.reload();
       
        });
        return;
      }
    }

      if(orderDate < currentdate){
        alert('Sorry! You are only allow to cancel your order within 2 days from your order date');
       
      }   
    }
      
 
}
}
  
