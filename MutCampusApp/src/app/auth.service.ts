import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Check if the student is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get the stored student data
  getStudent(): any {
    const student = localStorage.getItem('student');
    return student ? JSON.parse(student) : null;
  }

  // Logout the student
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
  }
}
