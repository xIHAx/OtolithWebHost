import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  productsForm: FormGroup;
  products: any = [];
  base64Image= null;
  last_update: Date = new Date();
  
  constructor(private postsService: PostsService,private fb: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    console.log("Nav Add Products Page");
    this.productsForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      availability: ['', Validators.required],
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
    if(this.productsForm.value.name == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    else if(this.productsForm.value.price == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    else if(this.productsForm.value.category == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    else if(this.productsForm.value.description == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    
    else if(this.productsForm.value.availability == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    else if(this.productsForm.value.image == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning!');
    }
    else{
     
      this.postsService.addProducts(this.productsForm.value.name,this.productsForm.value.price,this.productsForm.value.category,this.productsForm.value.description,this.last_update,this.productsForm.value.availability,this.base64Image).subscribe(results => {
      this.toastr.success("Successfully added!", 'Success!');
      this.router.navigateByUrl('/products/All');
    });
    }
}



}
