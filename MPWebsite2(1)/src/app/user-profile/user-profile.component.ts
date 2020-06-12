import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public account = {  
    password: null  
    
  };  
    
  public barLabel: string = "Password strength:"; 
  myForm: FormGroup;
  elementType: "url" | "canvas" | "img" = "url";  
  userID: string;
  userRole: string;
  userDetails: any[];
  gCM: number;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) 
  { 
    
  }

  ngOnInit() {
    this.authService.getUserDetails(sessionStorage.getItem("userID")).subscribe(data => {
      this.userDetails = data;
      console.log(this.userDetails);
      console.log(this.userDetails[0].greenCurrency);
      this.gCM = this.userDetails[0].greenCurrency;

      this.myForm = this.fb.group ({
        name: sessionStorage.getItem("LoggedIn"),
        email: [sessionStorage.getItem("email"), Validators.email],
        mobile: sessionStorage.getItem("mobile"),
        address: sessionStorage.getItem("address"),
        role: sessionStorage.getItem("UserRole"),
        greenCurrency: this.gCM,
        password: '',
        repassword: ''
      });
    });
    console.log("nav profile page");
    
    this.userID = sessionStorage.getItem("userID");
    this.userRole = sessionStorage.getItem("UserRole")
    console.log(this.userRole)
  }

  onSubmit() {
    //Check if all input fields are filled
    if(this.myForm.value.password == "" || this.myForm.value.email == "" || this.myForm.value.mobile == "" || this.myForm.value.address == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning');
    }

    else if(this.myForm.controls.email.hasError('email'))
    {
      this.toastr.warning('Invalid email!', 'Warning');
    }

    else if(this.myForm.controls.password.hasError('minlength'))
    {
      this.toastr.warning('Minimum 8 character is required for password!', 'Warning');
    }

    //Check if passwords match
    else if(this.myForm.value.password != this.myForm.value.repassword){

    this.toastr.warning('Passwords don\'t match!', 'Warning');
    }


    else if(this.myForm.controls.mobile.hasError('minlength'))
    {
      this.toastr.warning('Invalid phone number! Minimum 8 character for phone number', 'Warning');
    }
   
    //Update user with input from myForm 
    else{
      this.toastr.success('User has been updated', 'Success');
      this.authService.updateUser( this.myForm.value.name, this.myForm.value.password, this.myForm.value.email, this.myForm.value.mobile, this.myForm.value.address);
      sessionStorage.setItem("address", this.myForm.value.address);
      sessionStorage.setItem("email", this.myForm.value.email);
      sessionStorage.setItem("mobile", this.myForm.value.mobile);
      window.location.reload();
    }

  }

  

}
