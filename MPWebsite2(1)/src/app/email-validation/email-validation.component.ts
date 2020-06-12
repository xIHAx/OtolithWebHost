
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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.myForm = this.fb.group ({   
      name: '',    
      password: '',
      token: ''   
    });
  }

  onSubmit() {  
    if(this.myForm.value.name == "" || this.myForm.value.password =="" || this.myForm.value.token == ""){
      this.toastr.warning('Fill in all fields!', 'Warning');
    }
    else{
      this.authService.verifyUser(this.myForm.value.name.trim(),
        this.myForm.value.password.trim(), this.myForm.value.token.trim()).subscribe(data => {
          this.results = data;
          console.log(data);
          if (this.results[0].auth)
          {
            this.authService.setSecureToken(this.myForm.value.name);
            this.authService.setUserRole(this.results[0].role);
            sessionStorage.setItem("address", this.results[0].address);
            sessionStorage.setItem("email", this.results[0].email);
            sessionStorage.setItem("mobile", this.results[0].mobile);
            sessionStorage.setItem("userID", this.results[0].userID);
            sessionStorage.setItem("unitNo", this.results[0].unitNo);
            sessionStorage.setItem("housingType", this.results[0].housingType);
            sessionStorage.setItem("key", "loggin");
            this.toastr.success(this.myForm.value.name, 'Welcome!');
            this.router.navigateByUrl('/home');
          }
          else{
            this.toastr.warning('Invalid input', 'Warning');
          }
        }); 
    }
    
  }

}

