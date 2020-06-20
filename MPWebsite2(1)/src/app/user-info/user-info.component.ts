import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service'; 
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  _id: string;
  elementType: "url" | "canvas" | "img" = "url";
  userInfo: any = [];
  private sub: any;
  programsArray: any = [];
  projectsArray: any = [];
  programEmpty:boolean;
  projectEmpty:boolean;
  msg:string;
  msg2:string;
 
  constructor(public postsService: PostsService,private route: ActivatedRoute, private toastr: ToastrService, private router: Router, public authService: AuthService) {
     this.postsService.getAllProgrammes().subscribe(programs => {
      for(var i = 0; i < programs.length; i++)
      {

        for(var j = 0; j < programs[i].slot.length; j++)
        {

          if(programs[i].slot[j] == this.userInfo[0].name)
          {
            this.programsArray.push(programs[i]);
            this.msg = ""
            this.programEmpty = false
          }
          else
          {
            this.msg = this.userInfo[0].name + " haven't sign up for any program or workshop"
            this.programEmpty = true
          }
        }
      }
      console.log(this.programsArray);
          
      });
      
      this.postsService.getAllPrograms().subscribe(projects => {
        for(var i = 0; i < projects.length; i++)
        {
  
          for(var j = 0; j < projects[i].attendees.length; j++)
          {
  
            if(projects[i].attendees[j] == this.userInfo[0].name)
            {
              this.projectsArray.push(projects[i]);
              this.msg2 = ""
              this.projectEmpty = false
            }
            else
            {
              this.msg2 = this.userInfo[0].name + " haven't sign up for any project"
              this.projectEmpty = true
            }
          }
        }
        console.log(this.projectsArray);
        
      });
  
  }
 

  returnB(_id, greenCurrency) {
    this.authService.updateCollectionStatusReturn(_id, false, greenCurrency);
    location.reload();
  }
 

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this._id = params['_id']; 
      
      this.authService.getUserDetails(this._id).subscribe(userInfo => {
      this.userInfo = userInfo;  
      });
    });

  
  }

}
