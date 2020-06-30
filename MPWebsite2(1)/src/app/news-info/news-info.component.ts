import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; 
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-news-info',
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.css']
})
export class NewsInfoComponent implements OnInit {
  _id: string;
  newsInfo: any = [];
  private sub: any;

  constructor(private postsService: PostsService,private route: ActivatedRoute, private toastr: ToastrService, private router: Router, public service: AuthService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this._id = params['_id']; 
      
      this.postsService.getNewsUsingID(this._id).subscribe(newsInfo => {
      this.newsInfo = newsInfo;  
      });
    });
  }

  deleteNews()
  {    
    if(confirm('Do you want to delete it ?'))
   {
    this.postsService.deleteNews(this._id).subscribe(results => {
    this.toastr.success("Successfully deleted!", 'Success!');
    this.router.navigateByUrl('/news');
  });
   }
  }
}
