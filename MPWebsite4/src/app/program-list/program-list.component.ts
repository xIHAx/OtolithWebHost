import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {

  programs: any[];
  plist: any[];
  name = '';
  constructor(private toastr: ToastrService, public postsService: PostsService) 
  { 
    this.postsService.getAllProgrammes().subscribe(programs => {
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
    if (i.name && searchTerm) {
    if (i.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
    return true;
    }
    return false;
    }
    });
  }

  addToPrograms(_id){
    let value = (<HTMLSelectElement>document.getElementById(_id)).value;
    console.log(_id);
    console.log(value);
    if(confirm('Do you want to add this user into the program/workshop?')){
      this.postsService.addToPrograms(_id, value) .subscribe(results =>{
        this.toastr.success("Successfully added " + value + " to the program/workshop!" , 'Success!');
      })
      location.reload();
    }  
  }


  removeFromPrograms(_id){
    let value1 = (<HTMLSelectElement>document.getElementById(_id +"1")).value;
    console.log(_id);
    console.log(value1);
    if(confirm('Do you want to remove this user from the program/workshop?')){
      this.postsService.removeFromPrograms(_id, value1).subscribe(results =>{
        this.toastr.success("Successfully remove user", 'Success!');
      })
      location.reload();
    }
  }

}

