
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
    else{
      
        var unlistLength = this.userNameList.length;
  
        for (var i = 0; i < unlistLength; i++){
       
        
        if(this.userNameList[i].name == localStorage.getItem("regUsername"))
        {
        this.authService.verifyAccount(localStorage.getItem("regUsername"),this.myForm.value.password);
        this.toastr.success(localStorage.getItem("regUsername"), 'Welcome!');
        this.router.navigateByUrl('/home');
        localStorage.removeItem("regUsername");
        return;
         }
     
      
      }
    
    }
    
  }

}

