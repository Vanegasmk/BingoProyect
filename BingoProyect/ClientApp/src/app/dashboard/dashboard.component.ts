import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Room } from './room.interface';
import { ROOMS_QUERY } from './queries';
import { CREATE_ROOM, DELETE_ROOM } from './mutations';
import { ClipboardService } from 'ngx-clipboard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

 
  showForm = false;
  rooms: Room[];
  currentRoom: Room;
  public admin = JSON.parse(localStorage.getItem("admin"));

  constructor(private apollo: Apollo,private clipboardService: ClipboardService) { 
    this.currentRoom = { id: -1, name: '', code: null};
    this.getRooms();
  }


  deleteRoom(room: Room)// Remove room from databas
  { 
    let mutation = DELETE_ROOM;
    this.apollo.mutate({
      mutation: mutation,
      variables: {id : room.id},
    }).subscribe(() => {
      this.currentRoom = { id: -1, name: '', code: null};
      this.showForm = false;
      this.getRooms();
    })
  }

  saveRoom() // Save new room in database
  {
    this.showForm = true;
    const variables = {
      input: {
        name: this.currentRoom.name,
        code: this.createRandomCode()
      }
    };

    this.apollo.mutate({
      mutation: CREATE_ROOM,
      variables: variables
    }).subscribe(() => {
      this.currentRoom = { id: -1, name: '', code: null };
      this.showForm = false;
      this.getRooms();
    });
  }

  getRooms() {//Get all room from database
    this.apollo.watchQuery({
      query: ROOMS_QUERY,
      fetchPolicy: 'network-only'
    }).valueChanges.subscribe(result => {
      this.rooms = result.data['rooms'];
    })
  }

  generateLink(id: string) //Generate link for room
  {
    var url = 'https://localhost:5001/room/' + id;

    Swal.fire({
      title: 'Link generated!',
      text: 'https://localhost:5001/room/' + id,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#008f39',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Copy Link'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Copied!',
          'You have copied the link',
          'success'
        );
        this.clipboardService.copyFromContent(url);
      }
    })

  }

  deleteAlert(room: Room)
  { 
    Swal.fire({
      title: 'Do you want to delete the room?',
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteRoom(room);
        Swal.fire('Removed', '', 'success')
      }
    })
  }

  removeLocalStorage()//Remove 'Admin' localstorage
  { 
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
  }

  createRandomCode()//Generates a hexadecimal code
  {
    var code = (Math.random() * 0xffff * 1000000).toString(16);
    return code.slice(0, 6).toString();
  }
  
  
}
