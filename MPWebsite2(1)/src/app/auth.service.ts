import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,private http: HttpClient) { }

  regUser(username: string, pw: string, role: string, email: string, mobile: string, address: string, unitNo: string, housingType: string)  {    
    return this.http.post<any[]>('./api/reguser/', {'username': username, 
    'password':  pw, 'role': role, "email" : email, "mobile": mobile, "address": address, "unitNo": unitNo, "housingType":housingType });   
  }

  authUser(username: string, pw: string)  {    
    return this.http.post<any[]>('./api/authuser/', {'username': username, 
    'password':  pw });   
  }

 
  verifyUser(username: string, pw: string, token: string)  {    
    return this.http.post<any[]>('./api/verifyUser/', {'username': username, 
    'password':  pw, 'token': token });   
  }

  verifyAccount( username: string, password: string) {
    return this.http.post<any[]>('./api/verifyAccount/' ,{"username": username, "password": password});
  }
  
  getAllResident() {
    return this.http.get<any[]>('./api/getAllResident');
  }

  getAllUserName() {
    return this.http.get<any[]>('./api/getAllUser');
  }

  getUser(name: string) 
  {
    return this.http.get<any[]>('./api/users/' + name);
  }
  
  setSecureToken(secure_token: string) {     
    sessionStorage.setItem("LoggedIn", secure_token)   
  }      
  
  getSecureToken() {     
    return sessionStorage.getItem("LoggedIn")   
  }      
  
  setUserRole(role: string) {     
    sessionStorage.setItem("UserRole", role);   
  }      
  
  getUserRole() {     
    return sessionStorage.getItem("UserRole")   
  } 
 
  logout() {     
    sessionStorage.removeItem("LoggedIn");     
    sessionStorage.removeItem("UserRole");
    sessionStorage.removeItem("key");    
  }

  isLoggedIn() {     
    return this.getSecureToken() !== null;   
  }

  isStaff() {   
    return (this.getUserRole() == "staff" || this.getUserRole() == "admin");   
  }
  
  isAdmin() {
    return (this.getUserRole() == "admin"); 
  }
  
  isUser() {    
    return (this.getUserRole() == "user" || this.getUserRole() == "staff");   
  }

  updateUser( username: string, password: string, email: string, mobile: string, address: string, unitNo: string, housingType: string) {
    
    return this.http.put<any[]>('./api/updateusers/' + username, { "username": username, "password": password, "email": email, "mobile": mobile, "address":address, "unitNo": unitNo, "housingType":housingType}
    ).subscribe(
    data  => {
      console.log("PUT Request is successful ", data);  
    },
    error  => { 
      console.log("Error", error);
    });
  }

  resetPasswordByName( username: string, password: string) {
    return this.http.put<any[]>('./api/resetPasswordByName/' + username, {"username": username, "password": password}
    ).subscribe(
    data  => {
      console.log("PUT Request is successful ", data);  
    },
    error  => { 
      console.log("Error", error);
    });
  }

  resetPasswordByEmail(password: string,email: string,) {
    return this.http.put<any[]>('./api/resetPasswordByEmail/' + email, {"password": password,"email": email, }
    ).subscribe(
    data  => {
      console.log("PUT Request is successful ", data);  
    },
    error  => { 
      console.log("Error", error);
    });
  }

  updateCollectionStatusRecieve( _id: string, boolean: boolean, greenCurrency: number) {
    console.log(_id);
    return this.http.put<any[]>('./api/box/' + _id, { "boolean": boolean, "greenCurrency":greenCurrency }
    ).subscribe(
    data  => {
      console.log("PUT Request is successful ", data);  
    },
    error  => { 
      console.log("Error", error);
    });
  }

  updateCollectionStatusReturn( _id: string, boolean: boolean, greenCurrency: number) {
    console.log(_id);
    return this.http.put<any[]>('./api/box/' + _id, { "boolean": boolean, "greenCurrency":greenCurrency }
    ).subscribe(
    data  => {
      console.log("PUT Request is successful ", data);  
    },
    error  => { 
      console.log("Error", error);
    });
  }

  useGC( _id: string, greenCurrency: number) {
    return this.http.put<any[]>('./api/useGC/' + _id, { "greenCurrency":greenCurrency }
    ).subscribe(
    data  => {
      console.log("PUT Request is successful ", data);  
    },
    error  => { 
      console.log("Error", error);
    });
  }

  changeUserRole( _id: string, role: string) {
    return this.http.put<any[]>('./api/changeUserRole/' + _id, { "role":role }
    ).subscribe(
    data  => {
      console.log("PUT Request is successful ", data);  
    },
    error  => { 
      console.log("Error", error);
    });
  }

  getUserDetails(_id) {
    return this.http.get<any[]>('./api/getUser/' +_id);
  }
  
  deleteUser(_id){
    return this.http.delete<any[]>('./api/deleteUser/' + _id);
  }

}

