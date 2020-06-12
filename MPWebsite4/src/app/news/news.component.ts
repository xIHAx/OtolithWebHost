import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  
  news: any = [];
  p: Number = 1;
  loadednewsList: any[];

  constructor(private postsService: PostsService, public service: AuthService) { 

    for (let i = 1; i <= 100; i++) {
      this.news.push(`item ${i}`);
    }

    this.postsService.getAllNews().subscribe(news => {
      var Length = news.length;

        for (var i = 0; i < Length; i++){
          console.log(news[i]);
          JSON.stringify(news[i]._id);
          console.log(news[i]._id);
        }
        this.news = news;
        this.loadednewsList = news;
        console.log(this.news);
      });
  }

  getNewsByNewDate(){
    this.postsService.getNewsByNewDate().subscribe(news => {
        this.news = news;
      });
  }

  getNewsByOldDate(){
    this.postsService.getNewsByOldDate().subscribe(news => {
        this.news = news;
      });
  }

  ngOnInit() {
  }

  initializeItems(): void {
    this.news = this.loadednewsList;
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
    this.news = this.news.filter(i => {
    if (i.title && searchTerm) {
    if (i.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
    return true;
    }
    return false;
    }
    });
    }

}