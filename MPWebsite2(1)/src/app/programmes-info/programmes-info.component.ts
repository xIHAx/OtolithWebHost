import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-programmes-info',
  templateUrl: './programmes-info.component.html',
  styleUrls: ['./programmes-info.component.css']
})
export class ProgrammesInfoComponent implements OnInit {

  _id: string;
  programmesInfo: any = [];
  private sub: any;
  product:any = [];
  name:string;
  price : any;
  category: string;
  image:string;
  quantity:number;
  userName: string;
  userRole: string;
  userAdmin: boolean;
  residentNo: number = 0;
  msg:any;
  empty:boolean;
  carts: any = [];
  programID:string;
  
  constructor(private postsService: PostsService,private route: ActivatedRoute, private toastr: ToastrService, private router: Router, public service: AuthService) 
  {  
    this.residentNo = 0;
    this.msg = 'No resident sign up yet'
    if(service.isLoggedIn()){
      this.postsService.getCart(sessionStorage.getItem("userID")).subscribe(carts => {
        console.log(carts);
        this.carts = carts;
      },
        error => {
          console.log("Cart View Error: ", error);
        });
      }
  
  }  


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this._id = params['_id']; 
      this.postsService.getProgrammesUsingID(this._id).subscribe(programmesInfo => {
      this.programmesInfo = programmesInfo;
      });
      });
      this.checkUser()
  }

  deleteProgrammes()
  {
    if(confirm('Are you sure that you want to delete this program/workshop ?'))
    {
  this.postsService.deleteProgrammes(this._id).subscribe(results => {
    this.toastr.success("Successfully deleted!", 'Success!');
    this.router.navigateByUrl('/programmes');
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

  addProgramToCart() {
    if(this.inArray(this.programmesInfo[0].name, this.carts)){
      this.toastr.warning('This program or workshop is already in your cart', 'Warning');
    }
    else{
      if(confirm('If you want to join this program or workshop, you are require to make your payment. Are you sure you want make payment now?'))
    {
      
      for (var i = 0; i < this.programmesInfo[0].slot.length; i++){
        console.log(this.programmesInfo[0].slot[i]);
        this.userName = sessionStorage.getItem("LoggedIn");
        if(this.programmesInfo[0].slot[i] == this.userName){
          this.toastr.warning('You\'ve already joined this program or workshop', 'Warning');
          return;
        }
      }
      if(this.programmesInfo[0].slot.length >= this.programmesInfo[0].capacity){
        this.toastr.success("Sorry the program or workshop is already at max capacity", 'Success!');
      }
      else{
      this.programID = this.programmesInfo[0]._id;
      this.name=this.programmesInfo[0].name;
      this.price=this.programmesInfo[0].price;
      this.category=this.programmesInfo[0].category;
      this.image=this.programmesInfo[0].image;
      this.quantity = 1;
     
    
      this.postsService.addToCart(sessionStorage.getItem("userID"),this.programID,this.name,this.price,this.category,this.image,this.quantity).subscribe(results =>{
        this.toastr.success("Successfully added item to cart!", 'Success!');
       
        })
        location.reload();
      }
     
    }
    }

    
  }

  checkUser(): void {
    this.userRole = sessionStorage.getItem("UserRole")   
    console.log(this.userRole) 
      if(this.userRole == "staff"){
        console.log("Access granted")
        this.userAdmin = true

      }else {
        this.userAdmin = false;
      }
  }
  
}
