import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public account = {  
    password: null  
    
  };  
    
  public barLabel: string = "Password strength:"; 
  myForm: FormGroup;
  userNameList: any[];
  email:string;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) 
  { 
    console.log("local storage"+ localStorage.getItem("data"));
    this.authService.getAllUserName().subscribe(data =>{
      this.userNameList = data;
 
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group ({
      password: '',
      repassword: ''
    });
  }


  
  onSubmit() {  
   
    //Check if all input fields are filled
    if(this.myForm.value.password == "" || this.myForm.value.repassword == ""  ){
      this.toastr.warning('Fill in all input fields!', 'Warning');
    }

    else if(this.myForm.controls.password.hasError('minlength'))
    {
      this.toastr.warning('Minimum 8 character is required for password!', 'Warning');
    }

    //Check if passwords match
    else if(this.myForm.value.password != this.myForm.value.repassword){
      this.toastr.warning('Passwords don\'t match!', 'Warning');
    }

     //Update user with input from myForm 
     else{
      var unlistLength = this.userNameList.length;

      for (var i = 0; i < unlistLength; i++){
     
      
      if(this.userNameList[i].name == localStorage.getItem("data"))
      {
      this.authService.resetPasswordByName(localStorage.getItem("data"),this.myForm.value.password);
      this.toastr.success('Password is reset', 'Success');
      this.router.navigateByUrl('/login');
      localStorage.removeItem("data");
      return;
       }
   
      if(this.userNameList[i].email == localStorage.getItem("data")){
      this.authService.resetPasswordByEmail(this.myForm.value.password,localStorage.getItem("data"));
      this.toastr.success('Password is reset', 'Success');
      this.router.navigateByUrl('/login');
      localStorage.removeItem("data");
     
      }
    }
  }
  }

}
