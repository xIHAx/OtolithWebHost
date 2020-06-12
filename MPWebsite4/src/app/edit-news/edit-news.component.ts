import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {
  editNewsForm: FormGroup;
  _id: string;
  private sub: any;
  newsInfo: any = [];
  base64Image= null;
  publish: Date = new Date();

  constructor(private fb: FormBuilder,private postsService: PostsService,private route: ActivatedRoute,private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    console.log("Nav Edit News Page");

    this.sub = this.route.params.subscribe(params => {
      this._id = params['_id']; 
      
      this.postsService.getNewsUsingID(this._id).subscribe(newsInfo => {
      this.newsInfo = newsInfo;
      
         this.editNewsForm = this.fb.group({
           title: this.newsInfo[0].title,
           body: this.newsInfo[0].body,
           image: this.newsInfo[0].image
           
           });
         
      });
      
      });
  }

  handleUpload(event) {
    const comp = this;
    const img = <File>event.target.files[0];
    const promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      }
      reader.readAsDataURL(img);
    });
  
    promise.then(img => {
      comp.base64Image = img;
      console.log(this.base64Image);
    });
  }

  editNews(id: string)
  {
    
    console.log(this.base64Image);
    this.postsService.editNews(id,
    this.editNewsForm.value.title,this.editNewsForm.value.body,this.publish,this.base64Image).subscribe(results => {
      this.toastr.success("Successfully Updated!", 'Success!');

      this.router.navigateByUrl('/news');
  });
 }
}