import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router'; 
import { AuthService } from '../auth.service'; 
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  
  addOrderForm: FormGroup;
  orders: any = [];
  carts: any = [];
  product_name:string;
  price:number;
  amount:number;
  category:string;
  image:string;
  quantity:number;
  order_date: Date = new Date();
  emailContent: any = [];
  totalAmount:any;
  submitted : boolean;
  formProcess:boolean;
  message: any;

  constructor(private postsService: PostsService,private fb: FormBuilder,private toastr: ToastrService, private router: Router,private authService: AuthService,private connectionService: ConnectionService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {total: string};
    this.totalAmount = state.total;
    console.log(this.totalAmount);
    this.postsService.getCart(sessionStorage.getItem("userID")).subscribe(carts => {
      this.carts = carts; 
    });
   }

  ngOnInit() {
    console.log("Nav Add Order Page");
    this.addOrderForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', [Validators.required,Validators.minLength(8)]],
      address: ['', Validators.required],
      card_type: ['', Validators.required],
      card_no: ['', Validators.required],
      expiration: ['', Validators.required],
      cvc: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(3)]]
    });
  }

  

  clearCart()
  {
    this.postsService.clearCart(sessionStorage.getItem("userID")).subscribe(results => {
      this.router.navigateByUrl('/order');
      });
    
  }
  
  onSubmit(){
    var productArray: any = [];
    var productList: any = [];
    if(this.addOrderForm.value.fullname == "" || this.addOrderForm.value.email == "" || this.addOrderForm.value.phone == "" || this.addOrderForm.value.address == "" || this.addOrderForm.value.card_type == "" || this.addOrderForm.value.card_no == "" || this.addOrderForm.value.expiration == "" || this.addOrderForm.value.cvc == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning');
    }
    else if(this.addOrderForm.controls.email.hasError('email'))
    {
      this.toastr.warning('Invalid email!', 'Warning');
    }

    else if(this.addOrderForm.controls.phone.hasError('minlength'))
    {
      this.toastr.warning('Invalid phone number! Minimum 8 character for phone number', 'Warning');
    }

    else if(this.addOrderForm.controls.cvc.hasError('minlength') || this.addOrderForm.controls.cvc.hasError('maxlength'))
    {
      this.toastr.warning('Invalid CVC', 'Warning');
    }
     else if(confirm('Are you sure you want to order now ?'))
      {
      this.StripePayment()
      for(var i = 0; i < this.carts.length; i++)
      {
        this.product_name = this.carts[i].name;
        productArray.push(this.carts[i].name);
        this.price = this.carts[i].price;
        this.category = this.carts[i].category;
        this.image = this.carts[i].image;
        this.quantity = this.carts[i].quantity;
        this.amount = this.carts[i].price * this.carts[i].quantity;
        this.postsService.addOrder(sessionStorage.getItem("userID"),this.product_name,this.price,this.category,this.image,this.quantity,this.amount,this.addOrderForm.value.fullname,this.addOrderForm.value.email,this.addOrderForm.value.phone,this.addOrderForm.value.address,this.order_date,this.addOrderForm.value.card_type,this.addOrderForm.value.card_no,this.addOrderForm.value.expiration,this.addOrderForm.value.cvc).subscribe(results => {
        this.clearCart();
        this.toastr.success("Successfully ordered!", 'Success!');
        });
      }
     
    
    console.log(productArray);
    this.emailContent.push(this.order_date.toISOString().slice(0, 10));
    this.emailContent.push(sessionStorage.getItem("userID"));
    this.emailContent.push(this.totalAmount.toFixed(2));
    this.emailContent.push(this.addOrderForm.value);
    for (var i = 0; i < productArray.length; i++)
     {
     productList += "<li>" + productArray[i] + "</li>";
   
     } 
  
    this.emailContent.push(productList);
   
    // sent to email
    this.connectionService.sendMessage(this.emailContent).subscribe(() => {
      alert('Your order has been sent.');
      this.addOrderForm.reset();
    }, (error: any) => {
      console.log('Error', error);
    });
    
    
    }//End of if statement
  }
  //stripe payment function
  StripePayment(){
    this.connectionService.stripePayment(this.totalAmount, sessionStorage.getItem("email")).subscribe(() =>
    {
      console.log('stripe payment works')
    },(error: any) =>{
      console.log('Error', error);
    });
  }

}
