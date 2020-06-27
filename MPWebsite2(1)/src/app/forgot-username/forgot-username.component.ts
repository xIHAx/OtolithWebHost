import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from '../connection.service';
@Component({
  selector: 'app-forgot-username',
  templateUrl: './forgot-username.component.html',
  styleUrls: ['./forgot-username.component.css']
})
export class ForgotUsernameComponent implements OnInit {
  myForm: FormGroup;

  userNameList: any[];
  emailContent: any = [];
  constructor(private fb: FormBuilder, private connectionService: ConnectionService, private authService: AuthService, private router: Router, private toastr: ToastrService) 
   {
    this.authService.getAllUserName().subscribe(data =>{
      this.userNameList = data;
    });
   }

  ngOnInit() {
    console.log("Nav forgot username page");
    this.myForm = this.fb.group ({
      email: '',
    });
  }


  onSubmit(){
    //Check if all input fields are filled
    if(this.myForm.value.email == "" ){
      this.toastr.warning('Fill in all input fields!', 'Warning');
      return;
    }
  
    var unlistLength = this.userNameList.length;
    for (var i = 0; i < unlistLength; i++){
      var userName = this.userNameList[i].name;
      var email = this.userNameList[i].email;
         
     if(email == this.myForm.value.email){
      this.emailContent.push(userName);  
      this.emailContent.push(this.myForm.value.email);
     
      this.connectionService.sendToRequestUsername(this.emailContent).subscribe(() => {
        this.myForm.reset();
        this.toastr.success('Username has been sent to your email successfully!', 'Success');
        this.router.navigateByUrl('/login');
      });
     
     return;
     }
    

  } 


    var unlistLength = this.userNameList.length;
    for (var i = 0; i < unlistLength; i++){
      var userName = this.userNameList[i].name;
      var email = this.userNameList[i].email;
       
      if(email != this.myForm.value.email){
      
      this.toastr.warning('Email does not exist!', 'Warning');  
   
      return;
      }


    } 
  }
}
