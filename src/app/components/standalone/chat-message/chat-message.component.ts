// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   CreateChatSessionGQL,
//   CloseChatSessionGQL,
//   CreateChatMessageGQL,
// } from 'src/generated/graphqlTypes';
// import { FormsModule } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-chat-message',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './chat-message.component.html',
//   styleUrls: ['./chat-message.component.css'],
// })
// export class ChatMessageComponent implements OnDestroy, OnInit {
//   isChatOpen: boolean = false;
//   private isSessionActive: boolean = false;
//   private sessionId: string | null = null;
//   private sessionTimeout: any;
//   userMessage = '';
//   userMessageValue = '';
//   private maxMsgLength = 150;
//   private minMsgLength = 1;
//   private messageQueue: string[] = [];
//   private messageProcessing: boolean = false;
//   dialogFlowResponses: string[] = []; // Array to store responses
//   dialogFlowResponse = '';
//   messageCount = 0;

//   constructor(
//     private createChatSessionGQL: CreateChatSessionGQL,
//     private closeChatSessionGQL: CloseChatSessionGQL,
//     private createChatMessageGQL: CreateChatMessageGQL,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit() {
//     window.addEventListener('beforeunload', this.handleTabClose);
//   }

//   // press to open chatbox
//   OpenChat(): void {
//     // Toggle chatbox display status
//     this.toggleChatBoxDisplay();
//   }

//   toggleChatBoxDisplay(): void {
//     this.isChatOpen = !this.isChatOpen;

//     // Start a new session only if it's not already active
//     if (this.isChatOpen && !this.isSessionActive) {
//       this.startSession();
//     }
//   }

//   startSession(): void {
//     this.createChatSessionGQL.mutate().subscribe((result) => {
//       if (result.data?.createChatSession) {
//         this.sessionId = result.data.createChatSession.id;
//         this.isSessionActive = true;
//         this.resetSessionTimer();
//         console.log('new session created');
//         this.dialogFlowResponses.push(
//           `Hello and thanks for choosing Innov8ivs! Could you kindly provide your name, email, and a phone number for further communication?`
//         );
//       }
//     });
//   }

//   resetSessionTimer(): void {
//     clearTimeout(this.sessionTimeout);
//     this.sessionTimeout = setTimeout(() => this.closeSession(), 180000); // 10 minutes
//   }

//   minimizeSession(): void {
//     this.isChatOpen = false;
//   }

//   closeSession(): void {
//     if (this.sessionId) {
//       this.closeChatSessionGQL
//         .mutate({ sessionId: this.sessionId })
//         .subscribe(() => {
//           this.sessionId = null;
//           this.isSessionActive = false;
//           this.isChatOpen = false;
//           clearTimeout(this.sessionTimeout);
//         });

//       this.snackBar.open(`Session Ended`, 'Close', {
//         duration: 3000,
//         panelClass: 'custom-snackbar',
//       });
//     }
//   }

//   // Modified sendMessage method to process the queue
//   sendMessage(): void {
//     this.userMessageValue = this.userMessage.trim();
//     const messageLength = this.userMessageValue.length;
//     this.messageCount += 1;

//     if (this.messageProcessing || !this.sessionId) return;

//     // if a user has typed message it should be of certain length
//     if (
//       this.userMessageValue &&
//       messageLength > this.minMsgLength &&
//       messageLength < this.maxMsgLength
//     ) {
//       // send to backend as well as frontend
//       this.addMessageToQueue(this.userMessageValue);
//       // store messages at frontend only
//       this.dialogFlowResponses.push('You: ' + this.userMessage);
//       this.processMessageQueue();
//       this.userMessage = ''; // Clear the input field
//     } else {
//       this.snackBar.open(
//         `Your Message Length should be between ${this.minMsgLength} - ${this.maxMsgLength} characters`,
//         'Close',
//         {
//           duration: 3000,
//           panelClass: 'custom-snackbar',
//         }
//       );
//     }
//   }

//   // Wait for ChatGpts Response
//   // Max Limit of 4 messages
//   private addMessageToQueue(message: string): void {
//     if (this.messageQueue.length < 4) {
//       this.messageQueue.push(message);
//     } else {
//       this.snackBar.open(
//         `Already ${this.messageQueue.length} messages in queue `,
//         'Close',
//         {
//           duration: 3000,
//           panelClass: 'custom-snackbar',
//         }
//       );
//     }
//   }

//   private processMessageQueue(): void {
//     if (this.messageQueue.length === 0 || this.messageProcessing) return;

//     this.messageProcessing = true;
//     const message = this.messageQueue.shift();
//     if (message) {
//       this.sendChatMessage(message);
//     }
//   }

//   private sendChatMessage(message: string): void {
//     let fromUser = localStorage.getItem('email') ? true : false;

//     if (!this.sessionId) {
//       // If the session has timed out then create a new session
//       this.startSession();
//     }

//     this.createChatMessageGQL
//       .mutate({
//         sessionId: this.sessionId!,
//         text: message,
//         fromUser: fromUser,
//       })
//       .subscribe({
//         next: (result) => {
//           // Handle success
//           this.messageProcessing = false;
//           this.resetSessionTimer();
//           this.processMessageQueue(); // Process next message
//           // Simulate receiving a response from Dialogflow
//           // this.dialogFlowResponse = result.data?.createChatMessage.text!;
//           const dialogflowReply = result.data?.createChatMessage.text!;
//           this.dialogFlowResponses.push('Johnson: ' + dialogflowReply);
//         },
//         error: (error) => {
//           // Handle error, re-add message to the queue
//           this.messageQueue.unshift(message);
//           this.messageProcessing = false;
//           // Optional: implement retry logic or error handling here
//         },
//       });
//   }

//   // Problem
//   // this.closeSession doesn't exec properly after tab close action is called by user
//   handleTabClose(event: BeforeUnloadEvent): void {
//     // Your code to handle the tab close
//     // Example: event.returnValue = "Are you sure you want to exit?";
//     console.log('ng on destroy is called');
//     this.closeSession();
//     clearTimeout(this.sessionTimeout);
//   }

//   ngOnDestroy(): void {
//     window.removeEventListener('beforeunload', this.handleTabClose);
//   }
// }
