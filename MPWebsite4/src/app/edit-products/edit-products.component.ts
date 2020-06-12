import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

   editProductsForm: FormGroup;
   _id: string;
   last_update: Date = new Date();
   private sub: any;
   productsInfo: any = [];
   base64Image= null;
  constructor(private fb: FormBuilder,private postsService: PostsService,private route: ActivatedRoute,private router: Router, private toastr: ToastrService) { }

  ngOnInit(){
    console.log("Nav Edit Products Page");
    this.sub = this.route.params.subscribe(params => {
      this._id = params['_id']; 
      
      this.postsService.getProductsUsingID(this._id).subscribe(productsInfo => {
      this.productsInfo = productsInfo;
      
         this.editProductsForm = this.fb.group({
           name: this.productsInfo[0].name,
           price: this.productsInfo[0].price,
           category: this.productsInfo[0].category,
           description: this.productsInfo[0].description,
           availability: this.productsInfo[0].availability,
           image: this.productsInfo[0].image
           
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


  editProducts(id: string)
  {
  
  console.log(this.base64Image);
  this.postsService.editProducts(id,
    this.editProductsForm.value.name, this.editProductsForm.value.price, this.editProductsForm.value.category, this.editProductsForm.value.description, this.last_update, this.editProductsForm.value.availability, this.base64Image).subscribe(results => {
      this.toastr.success("Successfully Updated!", 'Success!');
      this.router.navigateByUrl('/products/All');

  });
 }

}
