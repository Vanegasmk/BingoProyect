// import { Component, OnInit } from '@angular/core';
// import gql from 'graphql-tag';
// import { Apollo } from 'apollo-angular';

// const SUBSCRIBE_QUERY = gql`
// subscription{
//   messageReceived {
//     body
//     subject
//   }
// }`;

// @Component({
//   selector: 'app-counter-component',
//   templateUrl: './counter.component.html'
// })
// export class CounterComponent implements OnInit {
//   constructor(private apollo: Apollo) {

//   }
//   ngOnInit(): void {
//     this.apollo.subscribe({query: SUBSCRIBE_QUERY}).subscribe((data) => {
//       console.log(data.data);
//     });
//   }
//   public currentCount = 0;

//   public incrementCounter() {
//     this.currentCount++;
//   }
// }
