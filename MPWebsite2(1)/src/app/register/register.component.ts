import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup } from '@angular/forms'; 
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
      email: '',
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
    if(this.myForm.value.name == "" || this.myForm.value.password == "" || this.myForm.value.repassword == "" || this.myForm.value.mobile == "" || this.myForm.value.email == "" || this.myForm.value. address == "" || this.myForm.value.radioBtn == ""){
      this.toastr.warning('Fill in all input fields!', 'Warning');
    }
    //Check if passwords match
    else if(this.myForm.value.password != this.myForm.value.repassword){
      this.toastr.warning('Passwords don\'t match!', 'Warning');
    }
  
    //Creates new user from register form 
    else{
      var userHouseLoc
      this.connectionService.getLocationByPostalCode(this.myForm.value.address).subscribe(location => {
        userHouseLoc = location["results"][0]["ADDRESS"];
        
        if(this.myForm.value.radioBtn == "Landed Housing"){

          this.authService.regUser(this.myForm.value.name,
          this.myForm.value.password, "user", this.myForm.value.email, this.myForm.value.mobile, userHouseLoc, "not applicable", this.myForm.value.radioBtn).subscribe();
          this.router.navigateByUrl('/login');
          this.toastr.success('Registered sucessfully, please go to you entered email to verify your account', 'Success');
        }
        else{
          
          this.authService.regUser(this.myForm.value.name,
          this.myForm.value.password, "user", this.myForm.value.email, this.myForm.value.mobile, userHouseLoc, this.myForm.value.unitNo, this.myForm.value.radioBtn).subscribe();
          this.router.navigateByUrl('/login');
          this.toastr.success('Registered sucessfully, please go to you entered email to verify your account', 'Success');
        }

      },
      error => {
        this.toastr.warning('Invalid Postal Code', 'Warning');
        alert('Invalid Postal Code')
        console.log("Error: ", error);
      });
      
    }
  }

}
