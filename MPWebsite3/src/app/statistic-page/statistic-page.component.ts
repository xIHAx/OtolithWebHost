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
  values: any = [];
  

  constructor(private postsService: PostsService) {
  }

  findLargest5(array){ 
    // sort descending
    array.sort(function(a,b){
        if(a < b){ return 1; } 
        else if(a == b) { return 0; } 
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
      for (var i = 0; i < orders.length; i++){
        this.ordersProductName.push(orders[i].product_name); 
      }
      var objProductNameCount = this.getWordCount(this.ordersProductName)
      this.entries = Object.entries(objProductNameCount);
      var top5SeliingProducts = this.findLargest5(this.entries);
      var top5ProductNameArray: any = [];
      var top5ProductNameCountArray: any = [];

      for (var i = 0; i < top5SeliingProducts.length; i++){
        top5ProductNameArray.push(top5SeliingProducts[i][0]);
        top5ProductNameCountArray.push(top5SeliingProducts[i][1]);
      }
      console.log(top5SeliingProducts);
      console.log(top5ProductNameArray);
      console.log(top5ProductNameCountArray);

      var myChart = new Chart("myChart", {
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
      });
  
    

    });
    
  }

}
