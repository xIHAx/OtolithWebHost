import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-programmes',
  templateUrl: './edit-programmes.component.html',
  styleUrls: ['./edit-programmes.component.css']
})
export class EditProgrammesComponent implements OnInit {

  editProgramsForm: FormGroup;
  _id: string;
  last_update: Date = new Date();
  private sub: any;
  programmesInfo: any = [];
  base64Image= null;
 constructor(private fb: FormBuilder,private postsService: PostsService,private route: ActivatedRoute,private router: Router, private toastr: ToastrService) { }

 ngOnInit(){
   console.log("Nav Edit Programs Page");
   this.sub = this.route.params.subscribe(params => {
     this._id = params['_id']; 
     
     this.postsService.getProgrammesUsingID(this._id).subscribe(programmesInfo => {
     this.programmesInfo = programmesInfo;
     
        this.editProgramsForm = this.fb.group({
          name: this.programmesInfo[0].name,
          price: this.programmesInfo[0].price,
          category: this.programmesInfo[0].category,
          description: this.programmesInfo[0].description,
          capacity: this.programmesInfo[0].capacity,
          date: this.programmesInfo[0].date,
          time: this.programmesInfo[0].time,
          image: this.programmesInfo[0].image
          
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


 editProgrammes(id: string)
 {
 
 console.log(this.base64Image);
 this.postsService.editProgrammes(id,
   this.editProgramsForm.value.name, this.editProgramsForm.value.price, this.editProgramsForm.value.category, this.editProgramsForm.value.description, this.last_update, this.editProgramsForm.value.capacity, this.editProgramsForm.value.date, this.editProgramsForm.value.time,this.base64Image).subscribe(results => {
     this.toastr.success("Successfully Updated!", 'Success!');
     this.router.navigateByUrl('/programmes');

 });
}

}

