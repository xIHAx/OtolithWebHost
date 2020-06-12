import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-staff-project-list',
  templateUrl: './staff-project-list.component.html',
  styleUrls: ['./staff-project-list.component.css']
})
export class StaffProjectListComponent implements OnInit {

  programs: any[];
  plist: any[];
  name = '';
  constructor(private toastr: ToastrService, public postsService: PostsService) 
  { 
    this.postsService.getAllPrograms().subscribe(programs => {
      this.programs = programs;
      this.plist = programs;

      });
  }

  ngOnInit(): void {
  }

  initializeItems(): void {
    this.programs = this.plist;
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
    this.programs = this.programs.filter(i => {
    if (i.title && searchTerm) {
    if (i.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
    return true;
    }
    return false;
    }
    });
  }

  addResident(_id){
    let value = (<HTMLSelectElement>document.getElementById(_id)).value;
    console.log(_id);
    console.log(value);
    if(confirm('Do you want to add this user into the project?')){
      this.postsService.addToAttend(_id, value) .subscribe(results =>{
        this.toastr.success("Successfully added " + value + " to the project!" , 'Success!');
      })
      location.reload();
    }  
  }


  removeResident(_id){
    let value1 = (<HTMLSelectElement>document.getElementById(_id +"1")).value;
    console.log(_id);
    console.log(value1);
    if(confirm('Do you want to remove this user from the project?')){
      this.postsService.removeResident(_id, value1).subscribe(results =>{
        this.toastr.success("Successfully remove user", 'Success!');
      })
      location.reload();
    }
  }

}
