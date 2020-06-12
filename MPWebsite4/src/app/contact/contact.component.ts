import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { ConnectionService } from '../connection.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  
  constructor(private fb: FormBuilder,private connectionService: ConnectionService, private toastr: ToastrService) { }
  
  ngOnInit() {
    this.contactForm = this.fb.group({
      contactFormFullname: ['', Validators.required],
      contactFormEmail: ['', [Validators.required, Validators.email]],
      contactFormSubject: ['', Validators.required],
      contactFormMessage: ['', Validators.required]
     
      });
     
  }

  onSubmit() {
     //Check if all input fields are filled
     if(this.contactForm.value.contactFormFullname == "" || this.contactForm.value.contactFormEmail == "" || this.contactForm.value.contactFormSubject == "" || this.contactForm.value.contactFormMessage == "" ){
      this.toastr.warning('Fill in all input fields!', 'Warning');
    }

    else if(this.contactForm.controls.contactFormEmail.hasError('email'))
    {
      this.toastr.warning('Invalid email!', 'Warning');
    }

   else{
    this.connectionService.sendContactForm(this.contactForm.value).subscribe(() => {
      this.toastr.success('Your message has been sent ', 'Success!');
      this.contactForm.reset();
    }, (error: any) => {
      console.log('Error', error);
    });
   }
  }

 
}
