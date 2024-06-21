import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './core/components/header/header.component';
import { UserService } from './views/auth/services/user.service';
import { UserStore } from './views/auth/store/user.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  userStore = inject(UserStore);
  userService = inject(UserService);

  ngOnInit(): void {
    this.setUser();
  }

  setUser() {
    const userData = this.userService.getUserData();
    this.userStore.setUser(userData);
  }
}
