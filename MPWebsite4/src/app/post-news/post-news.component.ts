import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-post-news',
  templateUrl: './post-news.component.html',
  styleUrls: ['./post-news.component.css']

  
})
export class PostNewsComponent implements OnInit {
  newsForm: FormGroup;
  news: any = [];
  base64Image= null;
  publish: Date = new Date();

  constructor(private postsService: PostsService,private fb: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    console.log("Nav Post News Page");
    this.newsForm = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    image: ['', Validators.required]  
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

 

  onSubmit(){
    console.log(this.base64Image);
    if(this.newsForm.value.title == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    else if(this.newsForm.value.body == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    
    else if(this.newsForm.value.image == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    else{
      this.postsService.postNews(this.newsForm.value.title,this.newsForm.value.body,this.publish, this.base64Image).subscribe(results => {
      this.toastr.success("Successfully Posted!", 'Success!');
      this.router.navigateByUrl('/news');
    });
    }
}

}