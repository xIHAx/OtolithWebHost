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
  programs: any = [];
  
  constructor(public postsService: PostsService,private route: ActivatedRoute, private toastr: ToastrService, private router: Router, public authService: AuthService) {
  
        this.postsService.getAllProgrammes().subscribe(programs => {
        this.programs = programs;
      
      });
      
  }
 

  returnB(_id) {
    this.authService.updateCollectionStatus(_id, false);
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
