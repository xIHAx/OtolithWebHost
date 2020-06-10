import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  programs: any = [];
  news: any = [];
  loadednewsList: any[];
  p: Number = 1;


  constructor(private postsService: PostsService, public service: AuthService) {
    for (let i = 1; i <= 100; i++) {
      this.news.push(`item ${i}`);
    }

    this.postsService.getAllNews().subscribe(news => {
      var Length = news.length;

        for (var i = 0; i < Length; i++){
          JSON.stringify(news[i]._id);
        }
        this.news = news;
        this.loadednewsList = news;
      });


      for (let i = 1; i <= 100; i++) {
        this.programs.push(`item ${i}`);
      }
  
      this.postsService.getAllPrograms().subscribe(programs => {
        this.programs = programs;
        });
  }


  ngOnInit() {
  }
 
}
