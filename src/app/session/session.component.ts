import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionService } from '../services/sessions/sessions.service';
import { ChatService } from '../services/chats/chats.service';
import { Router } from '@angular/router';

interface Session {
  name: string;
  session_id?: number;
  messages: { message: string; answer: string }[];
}

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  @ViewChild('chatMessagesContainer') chatMessagesContainer!: ElementRef; // Reference to the chat messages container
  @ViewChild('sessionsList') sessionsList!: ElementRef; // Reference to the sessions list

  userData: any;
  sessions: Session[] = [];
  selectedSession: Session | null = null;
  userInput: string = '';

  constructor(private sessionService: SessionService, private chatService: ChatService,private router:Router) {
    const user = JSON.parse(localStorage.getItem('userData')!);
    this.userData = user;
    console.log(this.userData, 'UserData');
    this.getSessions();
  }
   // Delete session logic
   deleteSession(session: any, event: Event) {
    event.stopPropagation(); // Prevents triggering selectSession when delete is clicked

    if (this.selectedSession?.session_id === session.session_id) {
      this.sessionService.deteteSession(session.session_id).subscribe({
        next: (response) => {
        console.log(response);
        this.sessions = this.sessions.filter(s => s.session_id !== session.session_id);
        this.selectedSession = null; // Clear the selected session if it is deleted

        },
        error: (error) => {
          console.error('Session deleted failed:', error);
          alert('Session deleted failed. Please try again.');
        },
        complete: () => {
          console.log('Session fetching request completed.');        }
      });
  
    }
  }


  ngOnInit(): void {}

  getSessions(): void {
    this.sessionService.getSessions(this.userData.id).subscribe({
      next: (response) => {
        response.sessions.forEach((session: any) => {
          this.sessions.push({
            name: session.session_title,
            messages: session.chats,
            session_id: session.id,
          });
        });
      },
      error: (error) => {
        console.error('Session fetching failed:', error);
        alert('Session fetching failed. Please try again.');
      },
      complete: () => {
        console.log('Session fetching request completed.');
        const emptySession = this.sessions.find((session) => session.messages.length === 0);
        console.log('emp', emptySession);
        if (emptySession) {
          this.selectSession(emptySession);
        }
      }
    });
  }

  goToUserProfile(): void {
    this.router.navigate(['/profile']); // Navigate to user profile
  }

  startNewSession(): void {
    this.scrollToTop(); // Call scrollToTop after starting a new session

    const emptySession = this.sessions.find((session) => session.messages.length === 0);
    if (emptySession) {
      console.log(emptySession, 'empty session');
      this.selectedSession = emptySession;
      return;
    }
  
    this.sessionService.createSession({
      user_id: this.userData.id,
      session_title: 'New Session'
    }).subscribe({
      next: (response) => {
        console.log('Creation successful:', response);
        const newSession = {
          name: 'New Session',
          messages: [],
          session_id: response.id
        };
        // Use unshift to add the new session at the top of the array
        this.sessions.unshift(newSession);
        this.selectedSession = newSession;
      },
      error: (error) => {
        console.error('Session creation failed:', error);
        alert('Session creation failed. Please try again.');
      },
      complete: () => {
        console.log('Session creation request completed.');
      }
    });

  }
  

  selectSession(session: Session): void {
    this.selectedSession = session;
    console.log(this.selectedSession, 'seletedsession');
    this.scrollToBottom(); // Call scrollToBottom after sending user message

  }

  sendMessage(): void {
    if (this.userInput.trim() && this.selectedSession) {
      const userMessage = this.userInput;
      this.selectedSession.messages.push({ message: userMessage, answer: '' });

      this.chatService.createChats({
        user_id: this.userData.id,
        session_id: this.selectedSession.session_id,
        message: userMessage
      }).subscribe({
        next: (response) => {
          const gptResponse = response.answer;
          this.selectedSession?.messages.push({ message: '', answer: gptResponse });
          this.scrollToBottom(); // Call scrollToBottom after receiving GPT's response
        },
        error: (error) => {
          console.error('Message sending failed:', error);
          alert('Message sending failed. Please try again.');
        },
        complete: () => {
          console.log('Message sent successfully.');
        }
      });

      this.userInput = '';
      this.scrollToBottom(); // Call scrollToBottom after sending user message
    }
  }

  // Scroll to the bottom of the chat messages container
  scrollToBottom(): void {
    setTimeout(() => {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    });
  }
  scrollToTop(): void {
    this.sessionsList.nativeElement.scrollTop = 0; // Scroll to the top
  }

}
