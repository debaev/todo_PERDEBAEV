import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { take } from 'rxjs';

import { LoginRequestDto, UserDto } from '../models/auth.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

type UserStore = {
  token: string;
  user_id: number | null;
  username: string;
  loading: boolean;
};

const initialState: UserStore = {
  token: '',
  user_id: null,
  username: '',
  loading: false,
};

export const UserStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods(
    (store, authService = inject(AuthService), userService = inject(UserService)) => ({
      login(userCredentials: LoginRequestDto) {
        patchState(store, { loading: true });
        authService.login(userCredentials).pipe(take(1)).subscribe({
          next: async userData => {
            await userService.setUserData(userData);
            patchState(store, { ...userData, loading: false });
          },
          error: () => patchState(store, { loading: false })
        })
      },
      
      logout() {
        userService.logout();
        patchState(store, { ...initialState });
      },
      
      setUser(userData: UserDto) {
        patchState(store, { ...userData });
      },
    })
  )
)