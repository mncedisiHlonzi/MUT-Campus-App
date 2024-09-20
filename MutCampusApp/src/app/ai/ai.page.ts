import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls

@Component({
  selector: 'app-ai',
  templateUrl: './ai.page.html',
  styleUrls: ['./ai.page.scss'],
})
export class AIPage {
  userInput: string = '';
  chatMessages: { sender: string; text: string }[] = [];

  constructor(private http: HttpClient) {}  // Inject HttpClient

  sendMessage() {
    if (this.userInput.trim()) {
      // Add user message to the chat
      this.chatMessages.push({ sender: 'user', text: this.userInput });

      // Convert the user input to lowercase before sending it to the server
      const normalizedInput = this.userInput.toLowerCase();

      // Make an API request to get AI's response
      this.http.post<any>('http://172.16.21.22:3000/get-response', { message: normalizedInput }).subscribe(
        (response) => {
          this.chatMessages.push({ sender: 'ai', text: response.reply });
        },
        (error) => {
          console.error('Error:', error);
          this.chatMessages.push({ sender: 'ai', text: 'An error occurred. Please try again.' });
        }
      );

      // Clear the input
      this.userInput = '';
    }
  }
}