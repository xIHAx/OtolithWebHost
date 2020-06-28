import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service'; 
@Component({
  selector: 'app-reg-projects',
  templateUrl: './reg-projects.component.html',
  styleUrls: ['./reg-projects.component.css']
})
export class RegProjectsComponent implements OnInit {

  projectsArray: any = [];
  projectEmpty:boolean;
  msg:string;

  constructor(public postsService: PostsService,private route: ActivatedRoute, private toastr: ToastrService, private router: Router, public authService: AuthService) {
    this.postsService.getAllPrograms().subscribe(projects => {
      for(var i = 0; i < projects.length; i++)
      {

        for(var j = 0; j < projects[i].attendees.length; j++)
        {

          if(projects[i].attendees[j] == sessionStorage.getItem("LoggedIn"))
          {
            this.projectsArray.push(projects[i]);
            this.msg = ""
            this.projectEmpty = false
          }
          else
          {
            this.msg = "You haven't sign up for any project"
            this.projectEmpty = true
          }
        }
      }
      console.log(this.projectsArray);
      
    });
   }

  ngOnInit(): void {
  }

  removeProject(_id){
    let userName = sessionStorage.getItem("LoggedIn");
    if(confirm('Are you sure that you want to cancel your registration for this project ?')){
      this.postsService.removeResident(_id, userName).subscribe(results =>{
        this.toastr.success("Successfully cancel your registration", 'Success!');
      })
      location.reload();
    }
  }
}
