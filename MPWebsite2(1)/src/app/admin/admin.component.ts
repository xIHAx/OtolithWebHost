import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  elementType: "url" | "canvas" | "img" = "url";
  userList: any = [];
  loadedUserList: any[];
  constructor(private authService: AuthService, private toastr: ToastrService) 
  {
   
    this.authService.getAllUserName().subscribe(data =>{
      
      var Length = data.length;

      for (var i = 0; i < Length; i++){
        JSON.stringify(data[i]._id);
      }
      this.userList = data;
      this.loadedUserList = data;
      
    });
    
  }

  ngOnInit(): void {
  }

  initializeItems(): void {
    this.userList = this.loadedUserList;
  }

  search(event) {
    console.log('Function works!');
    this.initializeItems();
    //Set searchTerm with input from search bar
    const searchTerm = event.srcElement.value;
  
    if (!searchTerm) {
    return;
    }
    //Filters enquiries list with keywords from searchTerm
    this.userList = this.userList.filter(i => {
    if (i.name && searchTerm) {
    if (i.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
    return true;
    }
    return false;
    }
    });
  }

  deleteUser(_id){
    if(confirm('Are you sure you want to delete this user?'))
    {
      this.authService.deleteUser(_id).subscribe(results => {
        location.reload();
        });
    }
  }

  changeRole(_id){
    let value1 = (<HTMLSelectElement>document.getElementById(_id +"1")).value;
    this.toastr.success("Successfully updated user role");
    this.authService.changeUserRole(_id, value1);
    location.reload();
  }

}
