import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.css']
})
export class ProgrammesComponent implements OnInit {

  _id:string;
  programs: any = [];
  p: Number = 1;
  name:string;
  price : number;
  category: string;
  image:string;
  quantity:number;
  loadedprogramList: any[];  

  constructor(private postsService: PostsService, private route: ActivatedRoute, private router:Router,private toastr: ToastrService, public service: AuthService) {
      

      for (let i = 1; i <= this.programs.length; i++) {
        this.programs.push(`item ${i}`);
      }
      this.postsService.getAllProgrammes().subscribe(programs => {
        this.programs = programs;
        this.loadedprogramList = programs;
        console.log(this.programs);
        
        });
        
    }

  

  getNewDate()
   {
    
      this.postsService.getProgrammesByNewDate().subscribe(programs => {
        this.programs = programs;
        });

   }

   getOldDate()
   {
    
      this.postsService.getProgrammesByOldDate().subscribe(programs => {
        this.programs = programs;
        });

   }

  


  ngOnInit() {
   
  }

  initializeItems(): void {
    this.programs = this.loadedprogramList;
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

 
  

}

