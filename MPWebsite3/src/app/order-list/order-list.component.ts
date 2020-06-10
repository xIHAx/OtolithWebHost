import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: any = [];
  p: Number = 1;
  loadedOrderList: any[];
  constructor(private postsService: PostsService,private toastr: ToastrService) {
    for (let i = 1; i <= this.orders.length; i++) {
      this.orders.push(`item ${i}`);
    }
    this.postsService.getAllOrders().subscribe(orders => {
      var Length = orders.length;

      for (var i = 0; i < Length; i++){
        console.log(orders[i]);
        JSON.stringify(orders[i]._id);
        console.log(orders[i]._id);
      }
      this.orders = orders;
      this.loadedOrderList = orders;
      console.log(this.orders);
      
    });
   }

  ngOnInit(): void {
  }


  initializeItems(): void {
    this.orders = this.loadedOrderList;
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
    this.orders = this.orders.filter(i => {
    if (i.fullname && searchTerm) {
    if (i.fullname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
    return true;
    }
    return false;
    }
    });
    }

 

}
