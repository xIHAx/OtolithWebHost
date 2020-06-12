import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.css']
})
export class EditProgramComponent implements OnInit {
  editProgramForm: FormGroup;
  _id: string;
  private sub: any;
  programInfo: any = [];
  base64Image= null;
  publish: Date = new Date();

  constructor(private fb: FormBuilder,private postsService: PostsService,private route: ActivatedRoute,private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    console.log("Nav Edit program Page");

    this.sub = this.route.params.subscribe(params => {
      this._id = params['_id']; 
      
      this.postsService.getProgramID(this._id).subscribe(programInfo => {
      this.programInfo = programInfo;
      
         this.editProgramForm = this.fb.group({
           title: this.programInfo[0].title,
           body: this.programInfo[0].body,
           image: this.programInfo[0].image  
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

  editProgram(id: string)
  {

    this.postsService.editProgram(id,
    this.editProgramForm.value.title, this.editProgramForm.value.body, this.publish, this.base64Image).subscribe(results => {
      this.toastr.success("Successfully Updated!", 'Success!');

      this.router.navigateByUrl('/programs');
  });
 }
}
