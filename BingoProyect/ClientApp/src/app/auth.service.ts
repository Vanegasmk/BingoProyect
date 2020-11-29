import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginComponent } from "./login/login.component";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private Router: Router) {}

  canActivate() {
    if(localStorage.getItem('token')){
        return true;
    }else{
        this.Router.navigate(['']);
        return false;
    }
  }
}
