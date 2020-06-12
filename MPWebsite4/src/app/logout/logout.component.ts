import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router, private toastr:ToastrService) { }

  ngOnInit() {
    this.toastr.success('You have successfully logout', 'See ya!');
    this.authService.logout();    
    this.router.navigateByUrl('/login'); 
  }

}
