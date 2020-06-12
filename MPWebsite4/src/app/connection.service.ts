import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class ConnectionService {
constructor(private http: HttpClient) { }

sendMessage(messageContent: any) {
  console.log(messageContent)
  return this.http.post('./api/sendEmailOrderConfirmation', JSON.stringify(messageContent), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
}

sendContactForm(messageContent: any) {
  console.log(messageContent)
  return this.http.post('./api/sendContact', JSON.stringify(messageContent), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
}

stripePayment(amount:number, email:string) {
  console.log("goes here 2")
  return this.http.post<any[]>('./api/stripePayment/', {'amount': amount, 'email': email});
} 

sendToResetPassword(messageContent: any) {
  console.log(messageContent)
  return this.http.post('./api/resetPassword', JSON.stringify(messageContent), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
}

}