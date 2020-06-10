import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  
  constructor(private fb: FormBuilder,private connectionService: ConnectionService) { }
  
  ngOnInit() {
    this.contactForm = this.fb.group({
      contactFormFullname: ['', Validators.required],
      contactFormEmail: ['', [Validators.required, Validators.email]],
      contactFormSubject: ['', Validators.required],
      contactFormMessage: ['', Validators.required]
     
      });
     
  }

  onSubmit() {
    this.connectionService.sendContactForm(this.contactForm.value).subscribe(() => {
      alert('Your message has been sent.');
      this.contactForm.reset();
    }, (error: any) => {
      console.log('Error', error);
    });
  }

 
  

}
