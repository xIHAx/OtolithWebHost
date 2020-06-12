import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  programs: any[];
  loadedProjectList: any[];
  p: Number = 1;
  constructor(private postsService: PostsService, public service: AuthService) { 

    this.postsService.getAllPrograms().subscribe(programs => {
      this.programs = programs;
      this.loadedProjectList = programs;
      });
  }

  getProgramsByNewDate(){
    this.postsService.getProgramsByNewDate().subscribe(programs => {
        this.programs = programs;
      });
  }

  getProgramsByOldDate(){
    this.postsService.getProgramsByOldDate().subscribe(programs => {
        this.programs = programs;
      });
  }

  ngOnInit() {
  }

  initializeItems(): void {
    this.programs = this.loadedProjectList;
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

  
}
