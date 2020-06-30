
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.css']
})
export class EmailValidationComponent implements OnInit {

  myForm: FormGroup;   
  results: any = false; 
  userNameList: any[];
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
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
    if(this.myForm.value.password =="" || this.myForm.value.repassword == ""){
      this.toastr.warning('Fill in all fields!', 'Warning');
    }

     //Check if passwords match
     else if(this.myForm.value.password != this.myForm.value.repassword){
      this.toastr.warning('Passwords don\'t match!', 'Warning');
    }
    
    else{
      this.authService.verifyAccount(localStorage.getItem("regUsername").trim(),
      this.myForm.value.password.trim()).subscribe(data => {
        this.results = data;
      
        if (this.results[0].auth)
        {
           this.authService.setSecureToken(localStorage.getItem("regUsername"));
           this.authService.setUserRole(this.results[0].role);
           sessionStorage.setItem("address", this.results[0].address);
           sessionStorage.setItem("email", this.results[0].email);
           sessionStorage.setItem("mobile", this.results[0].mobile);
           sessionStorage.setItem("userID", this.results[0].userID);
           sessionStorage.setItem("key", "loggin");
          this.toastr.success(localStorage.getItem("regUsername"), 'Welcome!');
          this.router.navigateByUrl('/home');
        }
        else{
          this.toastr.warning('Invalid input', 'Warning');
        }
      }); 

    
    }
    
  }

}

