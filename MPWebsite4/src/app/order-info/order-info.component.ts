import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {
  _id: string;
  orderInfo: any = [];
  private sub: any;
  constructor(private postsService: PostsService,private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this._id = params['_id']; 
      
      this.postsService.getOrderUsingID(this._id).subscribe(orderInfo => {
      this.orderInfo = orderInfo;  
      });
    });
  }

}
