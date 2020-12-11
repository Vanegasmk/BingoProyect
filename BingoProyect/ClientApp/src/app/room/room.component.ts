import { Component, OnInit } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr"; // signalR Import
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Cardboard } from "./cardboard.interface";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.css"],
})
export class RoomComponent {
  public showFormLogin = true; 
  public showFormGame = false; //show div from cards
  public showFormAdmin = false; //show div from admin
  public showFormUser = false;//show div from user 

  public hubConnection: HubConnection; //variable for connection with signalr
  public room: string; //variable to set room code
  public totalCards: number; //variable to set amount of player cards
  public userForm: FormGroup; //fromGroup object
  public usersOnline: number = 0; //variable to set usersOnline

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private Builder: FormBuilder
  ) {

    this.userForm = this.Builder.group({
      cards: ["", Validators.compose([Validators.pattern("^[0-9]*$"), Validators.required])]
    });
    this.showForms();
    this.builConnection();
  }



  showForms()//
  { 
    if("token" in localStorage)
    { 
      this.showFormLogin = false;
      this.showFormAdmin =  true;
      this.showFormUser = false;
    }else{
      this.showFormLogin = true;
      this.showFormUser = true;
      this.showFormAdmin = false;
    }
  }

  getCodeRoom() {//function to get room code with ActivatedRoute
    this.ActivatedRoute.paramMap.subscribe(param => {
      this.room = param.get('code');
    });
  }

  builConnection() {//connection generated signalr
    this.hubConnection = new HubConnectionBuilder().withUrl("/room").build();

    this.hubConnection.on("SendCount", (msg) => {
      this.usersOnline = this.usersOnline + msg;
    });

    this.hubConnection.start().then(() => {
      this.getCodeRoom();
      this.hubConnection.invoke("AddToGroup", this.room);
    })
      .then(() => console.log("Bingo Hub Connection is start!"))
      .catch(() => console.log("Bingo Hub Connection not start"));


  }
  
  sendCount() {//add a user when they enter the game
    this.hubConnection.invoke("SendCountToGroup", this.room, 1);
  }


}
