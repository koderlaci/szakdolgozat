import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Injectable({
  providedIn: 'root',
})
export class IsUserLoggedInGuard {
  private userHandlerService = inject(UserHandlerService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userHandlerService.userLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/landing']);
      return false;
    }
  }
}
