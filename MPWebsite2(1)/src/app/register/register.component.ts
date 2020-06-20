import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from '../connection.service';


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
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService, private connectionService: ConnectionService) 
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
      unitNo: '',
      radioBtn: '',
      password: '',
      repassword: ''
    });
  
  }

  
  
  onSubmit() {  
    console.log(this.myForm.value.radioBtn);

    var unlistLength = this.userNameList.length;
    for (var i = 0; i < unlistLength; i++){
      if(this.userNameList[i].name == this.myForm.value.name){
        this.toastr.warning('Name already taken', 'Warning');
        return;
      }
    }
    // var unlistLength = this.userNameList.length;
    // for (var i = 0; i < unlistLength; i++){
    //   if(this.userNameList[i].email == this.myForm.value.email){
    //     this.toastr.warning('Email already in use', 'Warning');
    //     return;
    //   }
    // }
    
    //Check if all input fields are filled
    if(this.myForm.value.name == "" || this.myForm.value.password == "" || this.myForm.value.repassword == "" || this.myForm.value.mobile == "" || this.myForm.value.email == "" || this.myForm.value.address == "" || this.myForm.value.radioBtn == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning');
    }
    
    else if(this.myForm.controls.email.hasError('email'))
    {
      this.toastr.warning('Invalid email!', 'Warning');
    }

    else if(/#[\d]{2}-[\d]{3}/.test(this.myForm.value.unitNo) == false)
    {
      this.toastr.warning('Invalid unit no format', 'Warning');
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

    else if(this.myForm.controls.address.hasError('minlength') || this.myForm.controls.address.hasError('maxlength'))
    {
      this.toastr.warning('Invalid postal code!', 'Warning');
    }
  
    //Creates new user from register form 
    else{
      var userHouseLoc
      this.connectionService.getLocationByPostalCode(this.myForm.value.address).subscribe(location => {
        
        
        if(location["results"][0] == null){
          this.toastr.warning('Invalid Postal Code', 'Warning');
        }
        
        else if(this.myForm.value.radioBtn == "Landed Housing"){
          userHouseLoc = location["results"][0]["ADDRESS"];
          this.authService.regUser(this.myForm.value.name,
          this.myForm.value.password, "user", this.myForm.value.email, this.myForm.value.mobile, userHouseLoc, "not applicable", this.myForm.value.radioBtn).subscribe();
          localStorage.setItem("regUsername", this.myForm.value.name);
          this.router.navigateByUrl('/login');
          this.toastr.success('Registered sucessfully, please go to you entered email to verify your account', 'Success');
        }
        else{
          userHouseLoc = location["results"][0]["ADDRESS"];
          this.authService.regUser(this.myForm.value.name,
          this.myForm.value.password, "user", this.myForm.value.email, this.myForm.value.mobile, userHouseLoc, this.myForm.value.unitNo, this.myForm.value.radioBtn).subscribe();
          localStorage.setItem("regUsername", this.myForm.value.name);
          this.router.navigateByUrl('/login');
          this.toastr.success('Registered sucessfully, please go to you entered email to verify your account', 'Success');
        }

      }
      // ,error => {
      //   this.toastr.warning('Invalid Postal Code', 'Warning');
      //   alert('Invalid Postal Code');
      //   console.log("Error: ", error);
      // }
      );
      
    }
  }

}
