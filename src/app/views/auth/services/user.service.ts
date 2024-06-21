import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserDto } from '../models/auth.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  async setUserData(userData: UserDto) {
    const { token, username, user_id } = userData;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('userid', user_id.toString());
    await this.router.navigate(['main']);
  }

  getUserData(): UserDto {
    return {
      token: this.getToken(),
      username: this.getUsername(),
      user_id: this.getUserId(),
    };
  }

  getUsername(): any {
    const username = localStorage.getItem('username');
    if (!username) this.logout();
    return username;
  }

  getUserId() {
    const user_id = Number(localStorage.getItem('userid'));
    if (!user_id) this.logout();
    return user_id;
  }

  getToken(): any {
    const token = localStorage.getItem('token');
    if (!token) this.logout();
    return token;
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
    this.snackBar.open('not authorized', 'Close', { duration: 5000 });
  }
}
