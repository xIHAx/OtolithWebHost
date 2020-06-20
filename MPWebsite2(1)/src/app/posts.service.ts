import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { ArrayType } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient) { }

  getAllNews() {
    return this.http.get<any[]>('./api/news');
  }

  getNewsByNewDate() {
    return this.http.get<any[]>('./api/newsByNewDate');
  }

  getNewsByOldDate() {
    return this.http.get<any[]>('./api/newsByOldDate');
  }

  getNewsUsingID(_id) {
    return this.http.get<any[]>('./api/newsInfo/' +_id);
  }

  postNews (title: string, body:string,publish: Date, image:string) {
	
    return this.http.post<any[]>('./api/postNews/', {'title':title,'body': body,'publish':publish,'image':image });
  }

  deleteNews(id: string) {
    return this.http.delete<any[]>('./api/deleteNews/' + id);
  }
      
  editNews(id: string, newTitle:string,newDescription:string,newDate:Date, newImage:string) {
    return this.http.put<any[]>('./api/editNews/' + id, {'title': newTitle,'body': newDescription,'publish':newDate, 'image':newImage
     });
  }
      
  getAllPrograms() {
    return this.http.get<any[]>('./api/programs');      
  }

  getProgramsByNewDate() {
    return this.http.get<any[]>('./api/programssByNewDate');
  }

  getProgramsByOldDate() {
    return this.http.get<any[]>('./api/programsByOldDate');
  }
  
  getProgramID(_id) {
      return this.http.get<any[]>('./api/programInfo/' +_id);
  }    

  postProgram (title: string, body:string, publish: Date, image:string, attendees:any ) {
	
    return this.http.post<any[]>('./api/postProgram/', {'title':title,'body': body,'publish':publish,'image':image, 'attendees':attendees });
  }
  
  editProgram(id: string, newTitle:string, newDescription:string, publish:Date, newImage:string) {
    return this.http.put<any[]>('./api/editProgram/' + id, {'title': newTitle,'body': newDescription, 'publish':publish ,'image':newImage});
  }    

  deleteProgram(id: string) {
    return this.http.delete<any[]>('./api/deleteProgram/' + id);
  }
  
  addToAttend (_id:string, userID:string) {
    
    return this.http.put<any[]>('./api/postAttendee/'+_id, {'test': userID});
  }

  removeResident (_id:string, userID:string) {
    
    return this.http.put<any[]>('./api/removeResident/'+_id, {'test': userID});
  }

  getAllProducts() {
    return this.http.get<any[]>('./api/products');
    }

  getProductsByCategory(category: string) {
   return this.http.get<any[]>('./api/productsByCategory/' + category);
    }

  getAllProductsNewDate() {
    return this.http.get<any[]>('./api/allProductsNewDate');
    }

  getProductsByNewDate(category: string) {
    return this.http.get<any[]>('./api/productsByNewDate/' + category);
    }

  getAllProductsOldDate() {
    return this.http.get<any[]>('./api/allProductsOldDate');
  }

  getProductsByOldDate(category: string) {
    return this.http.get<any[]>('./api/productsByOldDate/' + category);
    }

  getProductsUsingID(_id) {
    return this.http.get<any[]>('./api/productsInfo/' +_id);
    }

  addProducts (name: string, price:number,category: string,description: string,last_update: Date,availability: string, image:string) {
    return this.http.post<any[]>('./api/addProducts/', {'name':name,'price': price,'category':category,'description':description,'last_update':last_update,'availability':availability,'image':image });
    }
    
  deleteProducts(id: string) {
    return this.http.delete<any[]>('./api/deleteProducts/' + id);
    }

  editProducts(id: string, newName:string,newPrice:number, newCategory:string,newDescription:string,newDate:Date,newAvailability:string, newImage:string) {
    return this.http.put<any[]>('./api/editProducts/' + id, {'name': newName,'price': newPrice,'category': newCategory,'description': newDescription,'last_update':newDate, 'availability':newAvailability, 'image':newImage
      });
    }

  getCart(uID: string) {
    return this.http.get<any[]>('./api/cart/' + uID);
  }

  addToCart(userID: string,itemID: string, name: string, price:number,category: string, image:string, quantity:number) {
    return this.http.post<any[]>('./api/addToCart/', {'userID' :userID , 'itemID': itemID ,'name':name,'price':price,'category':category,'image':image,'quantity':quantity});
    }

  
  deleteCart(id: string) {
    return this.http.delete<any[]>('./api/deleteCart/' + id);
    }

  clearCart(userID: string) {
    return this.http.delete<any[]>('./api/clearCart/' + userID);
    }

 
  increaseQuantity(id: number, newquantity: number) {
    return this.http.put<any[]>('./api/cart/' + id, {'quantity': newquantity
   });
   }

   decreaseQuantity(id: number, newquantity: number) {
    return this.http.put<any[]>('./api/cart/' + id, {'quantity': newquantity
   });
   }

   addOrder (userID:string,itemID:string,product_name: string,price:number,category:string,image:string, quantity:number,amount:number,fullname: string, email:string,phone:number,address:string,order_date:Date,card_type:string,card_no:number,expiration:Date,cvc:number) {
    return this.http.post<any[]>('./api/order/', {'userID':userID,'itemID':itemID,'product_name':product_name,'price':price,'category':category,'image':image,'quantity':quantity,'amount': amount,'fullname':fullname,'email':email,'phone':phone,'address': address,'order_date':order_date,'card_type':card_type,'card_no':card_no,'expiration':expiration,'cvc':cvc});
    }

    getAllOrders() {
      return this.http.get<any[]>('./api/order');
    }

    getOrders(userID: string) {
    return this.http.get<any[]>('./api/order/' + userID);
    }

  
    getOrderUsingID(_id) {
      return this.http.get<any[]>('./api/orderInfo/' +_id);
    }

    deleteOrder(orderDate: Date) {
    return this.http.delete<any[]>('./api/deleteOrder/' + orderDate);
    }

    

    getWishlist(uID: string) {
      return this.http.get<any[]>('./api/wishlist/' + uID);
    }

    addToWishlist(userID: string, name: string, price:number,category: string, image:string, quantity:number) {
      return this.http.post<any[]>('./api/addToWishlist/', {'userID' :userID ,'name':name,'price':price,'category':category,'image':image,'quantity':quantity});
      }

    increaseQty(id: number, newquantity: number) {
      return this.http.put<any[]>('./api/wishlist/' + id, {'quantity': newquantity
       });
       }
    
    decreaseQty(id: number, newquantity: number) {
      return this.http.put<any[]>('./api/wishlist/' + id, {'quantity': newquantity
       });
       }

    deleteWishlist(id: string) {
      return this.http.delete<any[]>('./api/deleteWishlist/' + id);
      }    

    getAllProgrammes() {
      return this.http.get<any[]>('./api/programmes');
      }

   
    getProgrammesByNewDate() {
      return this.http.get<any[]>('./api/programmesByNewDate');
      }
    
    getProgrammesByOldDate() {
      return this.http.get<any[]>('./api/programmesByOldDate');
      }
    
    getProgrammesUsingID(_id) {
      return this.http.get<any[]>('./api/programmesInfo/' +_id);
      }
    
    addProgrammes (name: string, price:number,category: string, description: string, last_update: Date, capacity: number, date: Date, time:string, image:string, slot:any) {
      
      return this.http.post<any[]>('./api/addProgrammes/', {'name':name,'price': price,'category':category, 'description': description, 'last_update': last_update, 'capacity':capacity, 'date': date, 'time':time,'image':image,'slot':slot });
      }

    addToPrograms (_id:string, userID:string) {
    
      return this.http.put<any[]>('./api/addToPrograms/'+_id, {'test': userID});
      }

    removeFromPrograms (_id:string, userID:string) {
    
    return this.http.put<any[]>('./api/removeFromPrograms/'+_id, {'test': userID});
      }

    
    deleteProgrammes(id: string) {
      return this.http.delete<any[]>('./api/deleteProgrammes/' + id);
      }
          
    editProgrammes(id: string, newName:string, newPrice: number, newCategory: string, newDescription:string, newLastUpdate:Date, newCapacity:number, newDate:string, newTime:string, newImage:string) {
      return this.http.put<any[]>('./api/editProgrammes/' + id, {'name': newName, 'price': newPrice, 'category': newCategory,'description': newDescription,'last_update':newLastUpdate, 'capacity':newCapacity, 'date': newDate, 'time':newTime, 'image':newImage
         });
      }
}
