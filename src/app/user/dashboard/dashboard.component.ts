import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '@knora/core';
import { CacheService } from 'src/app/main/cache/cache.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading: boolean = true;

  user: User;

  username: string;
  sysAdmin: boolean = false;

  constructor(private _cache: CacheService,
              private _usersService: UsersService,
              private _titleService: Title) {
      // get username
      this.username = JSON.parse(localStorage.getItem('session')).user.name;
      this.sysAdmin = JSON.parse(localStorage.getItem('session')).user.sysAdmin;

      // set the page title
      this._titleService.setTitle(this.username);
  }

  ngOnInit() {

      this.loading = true;

      /**
       * set the cache here for current/logged-in user
       */
      this._cache.get(this.username, this._usersService.getUserByUsername(this.username));

      /**
       * and get the user information from the cache
       */
      this._cache.get(this.username, this._usersService.getUserByUsername(this.username)).subscribe(
          (response: User) => {
              this.user = response;
              this.loading = false;
          },
          (error: any) => {
              console.error(error);
          }
      );

  }


}

