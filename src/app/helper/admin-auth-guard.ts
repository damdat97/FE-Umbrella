import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {isDefaultLibrary} from "@angular/compiler-cli/ngcc/src/packages/source_file_cache";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  currentUser: any;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(
      next => {
        this.currentUser = next;
      }
    );
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let hasRoleAdmin = false;
    let hasRoleUser = false;
    if (this.currentUser) {
      let roleList = this.currentUser.roles;
      if (roleList == undefined) {
        roleList = [{
        }]
      }
      for (const role of roleList) {
        if (role.authority === 'ROLE_ADMIN') {
          hasRoleAdmin = true;
        } else if (role.authority === 'ROLE_USER') {
          hasRoleUser = true;
        }
        break;
      }
      if (hasRoleAdmin) {
        return true;
      } else {
        this.authService.logout();
        this.router.navigate(['/', 'admin'], {queryParams: {login: true}, queryParamsHandling: 'merge'});
        return false;
      }
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/', 'login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
      let roleList = this.currentUser.roles;
      if (roleList == undefined) {
        roleList = [{

        }]
      }
      let hasRoleAdmin = false;
      let hasRoleUser = false;
      for (const role of roleList) {
        if (role.authority === 'ROLE_ADMIN') {
          hasRoleAdmin = true;
          break;
        }
        if (role.authority === 'ROLE_USER') {
          hasRoleUser = true;
          break;
        }
      }
      return hasRoleAdmin;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/', 'login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return true;
  }
}
