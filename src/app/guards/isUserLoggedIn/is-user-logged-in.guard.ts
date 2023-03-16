import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Injectable({
  providedIn: 'root'
})
export class IsUserLoggedInGuard implements CanActivate {

  constructor(private userHandlerService: UserHandlerService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userHandlerService.isUserLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/landing']);
      return false;
    }
  }

}
