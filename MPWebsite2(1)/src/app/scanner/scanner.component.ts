import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResult: any;
  userExist: any;
  userList: any[];
  userDetails: any;

  constructor(private authService: AuthService, private toastr: ToastrService) 
  { 
    this.authService.getAllUserName().subscribe(data =>{
      this.userList = data;
    });
  }

  ngOnInit(): void {
    console.log("Nav scanner page");
  }

  clearResult(): void {
    this.qrResult = null;
  }

  onCodeResult(resultString: string): void {
    this.userExist = null;
    if (resultString != null) {
      this.qrResult = resultString;
      this.checkInUser(this.qrResult);
      this.clearMessage();
    } else {
      this.userExist = false;
      this.clearMessage();
    }
  }

  inArray(target, array)
  {
    for(var i = 0; i < array.length; i++) 
    {
      if(array[i]._id == target)
      {
        return true;
      }
    }
    return false; 
  }

  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  checkInUser(results: string): void {
    if(this.inArray(this.qrResult, this.userList) == true)
    {
      this.authService.getUserDetails(results).subscribe(data => {
        this.userDetails = data;
        console.log(this.userDetails[0].collected);
        if(this.userDetails[0].collected == true){
          this.userExist = 1;
          this.toastr.warning('This person box has already been collected', 'Warning');
          this.clearResult();
          this.clearMessage();
          console.log("1");
          return
        }
        else if(this.userDetails[0].collected == false){
          console.log("2");
          this.userExist = true
          this.clearResult();
          this.clearMessage();
          console.log(this.userDetails[0].greenCurrency);
          console.log(this.userDetails[0].name);
          this.toastr.success('User has been found!       Username: ' + this.userDetails[0].name + ' box has been check into our collection center.', 'Success');
          this.authService.updateCollectionStatusRecieve(results, true, this.userDetails[0].greenCurrency + 5);
          return
        }
        else{
          console.log("3");
          return          
        }
      });
    }
    else {
          this.userExist = false;
          this.toastr.warning('This person is not a User!', 'Warning');
          this.clearResult();
          this.clearMessage();
          return
    }

  }

  clearMessage() {
    setTimeout(() => {
      this.userExist = null;
    }, 6000);
  }

  checkQRJSON(qrString: string): boolean {
    if (
      /^[\],:{}\s]*$/.test(
        qrString
          .replace(/\\["\\\/bfnrtu]/g, "@")
          .replace(
            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            "]"
          )
          .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

}

