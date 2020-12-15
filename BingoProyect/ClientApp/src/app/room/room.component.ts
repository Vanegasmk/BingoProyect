import { CREATE_NUM } from './mutations';
import { Component, OnInit } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr"; // signalR Import
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Cardboard } from "./cardboard.interface";
import Swal from "sweetalert2";
import { Apollo } from "apollo-angular";
import { Router, ActivatedRoute } from '@angular/router';
import { CARDBOARD_QUERY, NUMBERS_QUERY} from './queries';
import {Numero} from "./numero.interface";
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
  public cardboard1: Cardboard;
  public cardboard2: Cardboard;
  public cardboard3: Cardboard;
  public list1 = [];

  public list : Numero;
  public currentNumber;

  public list2 = [];



  constructor(
    private ActivatedRoute: ActivatedRoute,
    private Builder: FormBuilder,
    private Apollo: Apollo
  ) {

    this.userForm = this.Builder.group({
      cards: ["", Validators.compose([Validators.pattern("^[0-9]*$"), Validators.required])]
    });
    this.showForms();
    this.builConnection();
    this.getList();



  }


  getList() {

    this.Apollo.watchQuery({
      query: NUMBERS_QUERY,
      fetchPolicy: "network-only",
      variables: {},
    }).valueChanges.subscribe(result =>{
      this.list = result.data['numeros'];
          this.list2 = [];
          for(let propety in this.list){
            this.list2.push(this.list[propety].num);
            this.sendMetadataNumber(this.list[propety].num);
          }
    })

  }

  addNum(){

    let mutation = CREATE_NUM;
    this.currentNumber = Math.floor(Math.random() * (75 - 1)) + 1;
    for(let propety in this.list){
      this.list2.push(this.list[propety].num);
    }
    if(this.list2.includes(this.currentNumber)){
      this.addNum();
    }else{
      const variables = {
          input:{num: this.currentNumber}
        }
        this.Apollo.mutate({
          mutation:mutation,
          variables: variables
        }).subscribe(() =>{
          this.getList();
          this.list2 = [];
          for(let propety in this.list){
            this.list2.push(this.list[propety].num);

          }
        });


    }
  }



  showForms()
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

    this.hubConnection.on("SendNumbers", (msg) => {
      this.list2.push(msg);
    });



    this.hubConnection.start().then(() => {
      this.getCodeRoom();
      this.hubConnection.invoke("AddToGroup", this.room);
    })
      .then(() => console.log("Bingo Hub Connection is start!"))
      .catch(() => console.log("Bingo Hub Connection not start"));


  }

  sendMetadataNumber(value){
    this.hubConnection.invoke("SendNumbersBingo",this.room,value);
  }

  sendCount() {//add a user when they enter the game
    this.hubConnection.invoke("SendCountToGroup", this.room, 1);
  }


  setNumberCards(values) {//function to get the number of cards per user
    this.totalCards = values.cards;

    if (this.totalCards >= 1 && this.totalCards <= 3) {
      this.sendCount();
      this.generateTotalCarboards(values.cards);
      this.showFormGame = true;
      this.showFormLogin = false;
    } else if (this.totalCards > 3) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The maximum number of cartons is three!'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The minimum quantity of cartons must be one!'
      });
    }
  }

  generateTotalCarboards(totalcarboards: number) {
    for (let i = 0; i < totalcarboards; i++) {
      var id = Math.floor(Math.random() * (11 - 1) + 1);
      // console.log(id);
      this.getCardboard(id);
    }
  }

  getCardboard(id: number) {
    this.Apollo.watchQuery({
      query: CARDBOARD_QUERY,
      fetchPolicy: "network-only",
      variables: {
        id: id
      },
    }).valueChanges.subscribe((result) => {
      if(this.cardboard1 == null && this.totalCards >= 1){
        this.cardboard1 = result.data['cardboard'];
        console.log("primer cartón");
        console.log(this.cardboard1);
      }else if(this.cardboard1 != null && this.cardboard2 == null && this.totalCards > 1){
        this.cardboard2 = result.data['cardboard'];
        console.log("segundo cartón");
        console.log(this.cardboard2);
      }else if( this.cardboard2 != null && this.cardboard3 == null && this.totalCards >= 3){
        this.cardboard3 = result.data['cardboard'];
        console.log("tercer cartón");
        console.log(this.cardboard3);
      }

    });
  }




}
