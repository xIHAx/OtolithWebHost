import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js'
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.css']
})
export class StatisticPageComponent implements OnInit {

  ordersProductName: any = [];
  entries: any = [];
  entries1: any = [];  
  projectName: any = []
  projectParticipantCount: any = []
  programName: any = []
  programParticipantCount: any = []
  top5ProductChart: Chart
  productCatergoryPopularityChart: Chart
  top5ProgramChart: Chart
  top5ProjectChart: Chart

  constructor(private postsService: PostsService) {
 
  }

  findLargest5(array){ 
    // sort descending
    array.sort(function(a,b){

        if(a[1] < b[1]){ return 1; } 
        else if(a[1] == b[1]) { return 0; } 
        else { return -1; }
    });
    return [array[0], array[1], array[2], array[3], array[4]]
  }
  
  getWordCount(array) {
    let map = {};
  for (let i = 0; i < array.length; i++) {
      let item = array[i];
      map[item] = (map[item] + 1) || 1;
    }
    return map;
  }
  
  ngOnInit(): void {
    
    this.postsService.getAllOrders().subscribe(orders => {

      var productCatergory: any =[]
      for (var i = 0; i < orders.length; i++){
        this.ordersProductName.push(orders[i].name);
        productCatergory.push(orders[i].category); 
      }
      productCatergory = this.getWordCount(productCatergory);
      this.entries1 = Object.entries(productCatergory);
      var productCatergoryName: any = [];
      var productCatergoryCount: any = [];

      var objProductNameCount = this.getWordCount(this.ordersProductName)
      this.entries = Object.entries(objProductNameCount);
      console.log(this.entries);
      var top5SeliingProducts = this.findLargest5(this.entries);
      console.log(top5SeliingProducts);
      var top5ProductNameArray: any = [];
      var top5ProductNameCountArray: any = [];

      for (var i = 0; i < this.entries1.length; i++){
        productCatergoryName.push(this.entries1[i][0]);
        productCatergoryCount.push(this.entries1[i][1]);
      }

      for (var i = 0; i < top5SeliingProducts.length; i++){
        top5ProductNameArray.push(top5SeliingProducts[i][0]);
        top5ProductNameCountArray.push(top5SeliingProducts[i][1]);
      }

      //Start of bar chart
      this.top5ProductChart = new Chart("myChartBar", {
        type: 'bar',
        data: {
            labels: top5ProductNameArray,
            datasets: [{
                label: 'Top 5 Selling Products',
                data: top5ProductNameCountArray,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
      });//End of bar chart

      //Start of radar chart
      this.productCatergoryPopularityChart = new Chart("myChartDoughnut", {
        type: 'doughnut',
        data: {
          labels: productCatergoryName,
          datasets: [{
            label: '# of Tomatoes',
            data: productCatergoryCount,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
          }]
        }
      });//end of radar chart

    });

    this.postsService.getAllPrograms().subscribe(projects => {
      var test: any = []
      for (var i = 0; i < projects.length; i++){
        test.push([projects[i].title, projects[i].attendees.length]);
      }

      var test1 = this.findLargest5(test);
      console.log(test1);
      console.log(test1[1][1]);
      console.log(test1[1][0]);


      for (var i = 0; i < test1.length; i++){
        this.projectName.push(test1[i][0]);
        this.projectParticipantCount.push(test1[i][1]);
      }

      //Start of top 5 popular project
      this.top5ProjectChart = new Chart("myChartBar1", {
        type: 'bar',
        data: {
          labels: this.projectName,
          datasets: [{
              label: 'Project Participants No.',
              data: this.projectParticipantCount,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
      });

    });
    
    this.postsService.getAllProgrammes().subscribe(programs => {

      var test: any = []
      for (var i = 0; i < programs.length; i++){
        test.push([programs[i].name, programs[i].slot.length]);
      }

      var test1 = this.findLargest5(test);

      for (var i = 0; i < test1.length; i++){
        this.programName.push(test1[i][0]);
        this.programParticipantCount.push(test1[i][1]);
      }

      //Start of top 5 popular Program
      this.top5ProgramChart = new Chart("myChartBar2", {
        type: 'horizontalBar',
        data: {
          labels: this.programName,
          datasets: [{
              label: 'Program Participants No.',
              data: this.programParticipantCount,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
      });
      
    });//end of top 5 popular Program
  

  }



}
