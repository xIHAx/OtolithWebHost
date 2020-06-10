import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-add-programmes',
  templateUrl: './add-programmes.component.html',
  styleUrls: ['./add-programmes.component.css']
})
export class AddProgrammesComponent implements OnInit {

  programsForm: FormGroup;
  programs: any = [];
  base64Image= null;
  last_update: Date = new Date();
  slot:any = [];
  constructor(private postsService: PostsService,private fb: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    console.log("Nav Add Programs Page");
    this.programsForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      capacity: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
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
    if(this.programsForm.value.name == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    else if(this.programsForm.value.price == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    else if(this.programsForm.value.category == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    else if(this.programsForm.value.description == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    
    else if(this.programsForm.value.capacity == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }

    else if(this.programsForm.value.date == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }

    else if(this.programsForm.value.time == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }

    else if(this.programsForm.value.image == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    else{
      
      this.postsService.addProgrammes(this.programsForm.value.name,this.programsForm.value.price,this.programsForm.value.category,this.programsForm.value.description,this.last_update,this.programsForm.value.capacity,this.programsForm.value.date,this.programsForm.value.time,this.base64Image,this.slot).subscribe(results => {
      this.toastr.success("Successfully added!", 'Success!');
      this.router.navigateByUrl('/programmes');
    });
    }
}



}

