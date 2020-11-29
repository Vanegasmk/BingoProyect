import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Apollo } from "apollo-angular";
import { Admin } from "./admin.interface";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Md5 } from "md5-typescript";
import { ADMIN_QUERY } from "./queries";
import { Router } from "@angular/router";

import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  public AdminForm: FormGroup;
  public Admins: Admin[];

  constructor(private FormBuilder: FormBuilder, private Apollo: Apollo,private Router: Router) {
    this.AdminForm = this.FormBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.required],
    });
  }

  getAdminLogin(values) {
    const email = values.email;//values from formgroup
    const password = values.password;

    this.Apollo.watchQuery({
      query: ADMIN_QUERY,
      fetchPolicy: "network-only",
      variables: {
        email: email,
        password: password,
      },
    }).valueChanges.subscribe((result) => {
      this.Admins = result.data["admin"]; // Set result admin in admins[]

      const FindAdmin = this.Admins.find((admin) => admin.email === email && admin.password === Md5.init(password)); // Find admin in Admins[]

      if ( FindAdmin != null) {

        localStorage.setItem("token",Md5.init('logged' + email)); // Set token when logged in localstorage
        localStorage.setItem("admin",JSON.stringify(FindAdmin)); // Set user admin logged  in localstorage
        this.Router.navigate(['/dashboard']);// Navigate to dashboard
        
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your email or password is wrong!'
        })
      }
    });
  }
}
