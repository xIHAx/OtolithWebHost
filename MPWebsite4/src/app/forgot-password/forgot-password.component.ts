import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from '../connection.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  myForm: FormGroup;

  userNameList: any[];
  emailContent: any = [];
  msg: string;
  reset:boolean;
  constructor(private fb: FormBuilder, private connectionService: ConnectionService, private authService: AuthService, private router: Router, private toastr: ToastrService) 
  { 
  
    console.log("local storage: "+ localStorage.getItem("data"));
    this.authService.getAllUserName().subscribe(data =>{
      this.userNameList = data;

    });
  }

  ngOnInit() {
    console.log("Nav forgot password page");
    this.myForm = this.fb.group ({
      nameOrEmail: '',
    });
  }


 

  onSubmit() {
  
    //Check if all input fields are filled
    if(this.myForm.value.nameOrEmail == "" ){
      this.toastr.warning('Fill in all input fields!', 'Warning');
      return;
    }
  
    var unlistLength = this.userNameList.length;
    for (var i = 0; i < unlistLength; i++){
      var userName = this.userNameList[i].name;
      var email = this.userNameList[i].email;
         
     if(userName == this.myForm.value.nameOrEmail || email == this.myForm.value.nameOrEmail){
        
      this.emailContent.push(this.myForm.value.nameOrEmail);
      this.emailContent.push(email); 
  
      this.connectionService.sendToResetPassword(this.emailContent).subscribe(() => {
       
        localStorage.setItem("data",this.myForm.value.nameOrEmail);
        this.myForm.reset();
        this.toastr.success('Sent to your email sucessfully, please go to your registered email to reset password', 'Success');
      });
     
     return;
     }
    

  } 


    var unlistLength = this.userNameList.length;
    for (var i = 0; i < unlistLength; i++){
      var userName = this.userNameList[i].name;
      var email = this.userNameList[i].email;
       
      if(userName != this.myForm.value.nameOrEmail || email != this.myForm.value.nameOrEmail){
      
      this.toastr.warning('Username or email does not exist!', 'Warning');  
   
      return;
      }


    } 
    
 
  }

}
