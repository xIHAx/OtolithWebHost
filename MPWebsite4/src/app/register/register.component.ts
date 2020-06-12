import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public account = {  
    password: null  
    
  };  
    
  public barLabel: string = "Password strength:"; 
  myForm: FormGroup;

  userNameList: any[];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) 
  { 
    this.authService.getAllUserName().subscribe(data =>{
      this.userNameList = data;

    });
  }

  ngOnInit() {
    console.log("Nav reg page");
    this.myForm = this.fb.group ({
      name: '',
      email: ['' ,Validators.email],
      mobile: '',
      address: '',
      password: '',
      repassword: ''
    });
  }
  
  onSubmit() {  
    var unlistLength = this.userNameList.length;
    for (var i = 0; i < unlistLength; i++){
      if(this.userNameList[i].name == this.myForm.value.name){
        this.toastr.warning('Username already taken', 'Warning');
        return;
      }
    }
    var unlistLength = this.userNameList.length;
    for (var i = 0; i < unlistLength; i++){
      if(this.userNameList[i].email == this.myForm.value.email){
        this.toastr.warning('Email already in use', 'Warning');
        return;
      }
    }
    
    //Check if all input fields are filled
    if(this.myForm.value.name == "" || this.myForm.value.password == "" || this.myForm.value.repassword == "" || this.myForm.value.mobile == "" || this.myForm.value.email == "" || this.myForm.value. address == ""){
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

    //Creates new user from register form 
    else{
      this.authService.regUser(this.myForm.value.name,
      this.myForm.value.password, "user", this.myForm.value.email, this.myForm.value.mobile, this.myForm.value.address).subscribe();
      this.router.navigateByUrl('/login');
      this.toastr.success('Registered sucessfully, please go to you entered email to verify your account', 'Success');
    }
  }

}
