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
  price : number;
  category: string;
  image:string;
  quantity:number;
  userName: string;
  userRole: string;
  userAdmin: boolean;
  residentNo: number = 0;
  msg:any;
  empty:boolean;

  
  constructor(private postsService: PostsService,private route: ActivatedRoute, private toastr: ToastrService, private router: Router, public service: AuthService) 
  {  
 this.residentNo = 0;
 this.msg = 'No resident sign up yet'
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
    if(confirm('Do you want to delete it ?'))
    {
  this.postsService.deleteProgrammes(this._id).subscribe(results => {
    this.router.navigateByUrl('/programmes');
  });
    }
  }


  addToPrograms(programID):void{

    this.userName = sessionStorage.getItem("LoggedIn");

    if(confirm('Do you want to join this program?'))
    {
      console.log("wabalaba dub dub");
      for (var i = 0; i < this.programmesInfo[0].slot.length; i++){
        console.log(this.programmesInfo[0].slot[i]);

        if(this.programmesInfo[0].slot[i] == this.userName){
          this.toastr.warning('You\'ve already joined this program', 'Warning');
          return;
        }
      }
      if(this.programmesInfo[0].slot.length >= this.programmesInfo[0].capacity){
        this.toastr.success("Sorry the program is already at max capacity", 'Success!');
      }
      else{
        this.postsService.addToPrograms(programID, this.userName) .subscribe(results =>{
          this.toastr.success("Successfully Joined program", 'Success!');
        })
        
        location.reload();
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
