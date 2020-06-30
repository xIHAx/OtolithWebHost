import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; 
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-program-info',
  templateUrl: './program-info.component.html',
  styleUrls: ['./program-info.component.css']
})
export class ProgramInfoComponent implements OnInit {
  _id: string;
  programInfo: any = [];
  private sub: any;
  userRole: string;
  userAdmin: boolean;
  userName: string;


  constructor(private postsService: PostsService,private route: ActivatedRoute, private toastr: ToastrService, private router: Router, public service: AuthService ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this._id = params['_id']; 
      
      this.postsService.getProgramID(this._id).subscribe(programInfo => {
      this.programInfo = programInfo;  
      });
    });
    this.checkUser()
  }

  deleteProgram()
  {   
    if(confirm('Are you sure that you want to delete this project ?'))
    {
    this.postsService.deleteProgram(this._id).subscribe(results => {
    this.toastr.success("Successfully deleted!", 'Success!');
    this.router.navigateByUrl('/programs');
    });
    }
  }

  addToAttend(projectID):void{

    this.userName = sessionStorage.getItem("LoggedIn");

    if(confirm('Do you want to join this project?'))
    {
      console.log("wabalaba dub dub");
      for (var i = 0; i < this.programInfo[0].attendees.length; i++){
        console.log(this.programInfo[0].attendees[i]);

        if(this.programInfo[0].attendees[i] == this.userName){
          this.toastr.warning('You\'ve already joined this project', 'Warning');
          return;
        }
      }
     
      
        this.postsService.addToAttend(projectID, this.userName) .subscribe(results =>{
          this.toastr.success("Successfully Joined project", 'Success!');
        })
        
        location.reload();
      
      
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
