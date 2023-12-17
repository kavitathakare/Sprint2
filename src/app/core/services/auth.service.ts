import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Tokens } from '@core/models/tokens.model';
import { User } from '@core/models/user.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = `${environment.baseUrl}`;

  accessToken: any;
  refreshToken: any;
  user: any;

  public redirectUrl: string | undefined;

  constructor(private http: HttpClient, private router: Router) {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
    this.user = this.getUserDetails();
    if (!this.accessToken && !this.refreshToken) {
      return;
    }

    this.setUserFromToken();
    if (this.hasTokenExpired()) {
      this.refresh();
    }
  }

  getUsername(): string {
    return this.user.sub;
  }

  getUserId(): number {
    return this.user.userId;
  }

  getStudentId(): number {
    return this.user.studentId;
  }

  getTeacherId(): number {
    return this.user.teacherId;
  }

  getAdminId(): number {
    return this.user.adminId;
  }

  hasTokenExpired(): boolean {
    return !this.user;
  }

  saveAccessToken(token: string) {
    this.accessToken = token;
    this.setUserFromToken();
    localStorage.setItem('accessToken', token);
  }

  saveRefreshToken(token: string) {
    this.refreshToken = token;
    localStorage.setItem('refreshToken', token);
  }

  setUserFromToken() {
    if (!this.accessToken) {
      return;
    }
    // this.user = JSON.parse(atob(this.accessToken.split('.')[1]));
  }

  loggedIn(): boolean {
    return this.user;
  }

  login(user: User): Observable<Tokens> {
    const request = this.http.post<Tokens>(`${this.url}/login`, user);

    request.subscribe({
      next: (userDetails: any) => {
        if(userDetails && userDetails.id) {
          if(userDetails.type == 'student') {
            userDetails['roles'] = ['ROLE_STUDENT'];
            this.redirectUrl = 'student-services';
          }
          if(userDetails.type == 'teacher') {
            userDetails['roles'] = ['ROLE_TEACHER'];
            this.redirectUrl = 'teacher-services';
          }
          if(userDetails.type == 'admin') {
            userDetails['roles'] = ['ROLE_ADMIN'];
            this.redirectUrl = 'admin-panel';
          }
          userDetails['accessToken'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZyIsImlhdCI6MTcwMjU4MTk5MCwiZXhwIjoxNzAyNTg1NTkwfQ.bJvagWH5SrTcLA-IhE9SEpv7VGiS-zk8T2efjjJt3Sw";
          userDetails['refreshToken'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZyIsImlhdCI6MTcwMjU4MTk5MCwiZXhwIjoxNzAyNTg1NTkwfQ.bJvagWH5SrTcLA-IhE9SEpv7VGiS-zk8T2efjjJt3Sw";
        }
        this.user = userDetails;
        this.setUserDetails(this.user);
        this.saveAccessToken(userDetails.accessToken);
        this.saveRefreshToken(userDetails.refreshToken);

        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = undefined;
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {},
    });

    return request;
  }
  setUserDetails(user: any) {
   localStorage.setItem('user', JSON.stringify(user));
  }

  getUserDetails() {
    const user = localStorage.getItem('user');
    return !!user ? JSON.parse(user): null;
  }

  refresh() {
    return this.http.get<Tokens>(`${this.url}/refresh`, {
      headers: { Authorization: `Bearer ${this.refreshToken}` },
    });
  }

  logout() {
    this.accessToken = null;
    this.refreshToken = null;
    this.user = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/']);
  }

  validateRoles(roles: any, method = 'any') {
    if (!this.accessToken || !['any', 'all'].includes(method)) return false;

    if (method == 'any')
      return roles.some((role: any) => this.user.roles.includes(role));

    if (method == 'all')
      return roles.every((role: any) => this.user.roles.includes(role));
  }
}
