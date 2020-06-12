import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 


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
  userExist: boolean;
  userList: any[];
  userDetails: any;

  constructor(private authService: AuthService) 
  { 
    this.authService.getAllUserName().subscribe(data =>{
      this.userList = data;
      var unlistLength = this.userList.length;

      for (var i = 0; i < unlistLength; i++){
        console.log(this.userList[i]._id);
      }
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
    console.log("1");
    if (resultString != null) {
      this.qrResult = resultString;
      console.log("2");
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
    // var unlistLength = this.userList.length;
    if(this.inArray(this.qrResult, this.userList) == true)
    {
      this.userExist = true
      console.log("3");
      console.log("yay");
      this.clearResult();
      this.clearMessage();
      this.authService.updateCollectionStatus(results, true);
      this.authService.getUserDetails(results).subscribe(data => {
        this.userDetails = data;
        console.log(this.userDetails);
        console.log(this.userDetails[0].name);
      });
      return
    }
    else {
          this.userExist = false;
          console.log("4");
          console.log("ugh");
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

