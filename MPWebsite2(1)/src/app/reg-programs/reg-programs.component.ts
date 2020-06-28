import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service'; 

@Component({
  selector: 'app-reg-programs',
  templateUrl: './reg-programs.component.html',
  styleUrls: ['./reg-programs.component.css']
})

export class RegProgramsComponent implements OnInit {

  programsArray: any = [];
  programEmpty:boolean;
  msg:string;
  orders:any=[];
  constructor(public postsService: PostsService,private route: ActivatedRoute, private toastr: ToastrService, private router: Router, public authService: AuthService) {
     this.postsService.getAllProgrammes().subscribe(programs => {
      for(var i = 0; i < programs.length; i++)
      {

        for(var j = 0; j < programs[i].slot.length; j++)
        {

          if(programs[i].slot[j] == sessionStorage.getItem("LoggedIn"))
          {
            this.programsArray.push(programs[i]);
            this.msg = ""
            this.programEmpty = false
          }
          else
          {
            this.msg = "You haven't sign up for any program or workshop"
            this.programEmpty = true
          }
        }
      }
      console.log(this.programsArray);
          
      });

      this.postsService.getOrders(sessionStorage.getItem("userID")).subscribe(orders => {

        this.orders = orders;
  
      });
     }

  ngOnInit(): void {
  }

  removeProgram(_id){
    let userName =  sessionStorage.getItem("LoggedIn");
    if(confirm('Are you sure that you want to cancel your registration for this program ?')){
      var currentdate= new Date().getDate();
      for(var i =0; i<this.orders.length; i++)
      {
        if(this.orders[i].userID == sessionStorage.getItem("userID") && this.orders[i].itemID == _id)
        {
          var orderDate = new Date(this.orders[i].order_date).getDate()+2;
          if(orderDate >= currentdate)
          {
           this.postsService.removeFromPrograms(_id,userName).subscribe(results =>{
           this.toastr.success("Successfully cancel your registration", 'Success!');
          })
          location.reload();
          
          }
         else {
            alert('Sorry! You are only allow to cancel your program or workshop within 2 days from your order date');
            return;
          }
         
        }
      }
    
    }
  }

}
