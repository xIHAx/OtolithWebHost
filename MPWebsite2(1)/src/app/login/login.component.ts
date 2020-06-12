import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;   
  results: any = false; 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    console.log("Nav login page");
    this.myForm = this.fb.group ({   
      name: '',    
      password: ''   
    });
   
  }

  onSubmit() {  
    if(this.myForm.value.name == "" || this.myForm.value.password ==""){
      this.toastr.warning('Fill in all input fields!', 'Warning');
    }


    else{
      this.authService.authUser(this.myForm.value.name,
        this.myForm.value.password).subscribe(data => {
          this.results = data;
        
          if (this.results[0].auth)
          {
            this.authService.setSecureToken(this.myForm.value.name);
            this.authService.setUserRole(this.results[0].role);
          
            sessionStorage.setItem("address", this.results[0].address);
            sessionStorage.setItem("email", this.results[0].email);
            sessionStorage.setItem("mobile", this.results[0].mobile);
            sessionStorage.setItem("userID", this.results[0].userID);
            sessionStorage.setItem("key", "loggin");
            this.toastr.success(this.myForm.value.name, 'Welcome!');
            this.router.navigateByUrl('/home');
          }
          else{
           this.toastr.warning('This user is not yet verified or dosen\'t exist!', 'Warning');
           return;
          }
        }); 
    }
    
  }

 
}
