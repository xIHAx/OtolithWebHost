import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(     
    next: ActivatedRouteSnapshot,     
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {     
      const permission = next.data["permission"];
      //The user will be logged out if they visit any page that they are unauthorized to.     
      if(this.authService.isLoggedIn() && permission.only.includes(this.authService.getUserRole())){   
        return true;     
      } else{         
        this.router.navigateByUrl('/logout');     
      }   
    }
  
}
