import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginRequestDto, UserDto } from '../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequestDto): Observable<UserDto> {
    return this.http.post<UserDto>('/api/auth/token/login/', loginRequest);
  }
}
