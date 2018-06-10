import { FollowersService } from './../services/followers.service';
import { Component, OnInit } from '@angular/core';
import { NotFoundError } from './../common/errors/not-found-error';
import { AppError } from './../common/errors/app-error';
import { PostService } from './../services/post.service';
import { error } from 'util';

@Component({
  selector: 'app-mosh-followers',
  templateUrl: './mosh-followers.component.html',
  styleUrls: ['./mosh-followers.component.css']
})
export class MoshFollowersComponent implements OnInit {
  followers: any[];
  
  constructor(private service: FollowersService) { }

  ngOnInit() {
    this.service.getHttp()
      .subscribe(followers => {
        console.log( followers );
        this.followers = followers;
      })
  }
}
