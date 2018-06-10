import { NotFoundError } from './../common/errors/not-found-error';
import { AppError } from './../common/errors/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'util';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  posts: any[];
  
  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getHttp()
      .subscribe(posts => this.posts = posts)
  }
  
  updatePost(post){
    console.log(post.title);
  }

  deletePost(input: HTMLInputElement){
    this.service.deleteHttp(input.id)
      .subscribe(response => {
        let index = this.posts.indexOf(input)
        this.posts.splice(index, 1);
      })
  }

  createPost(input: HTMLInputElement){
    let post = {title: input.value};
    input.value = '';

    this.service.postHttp(JSON.stringify(post))
      .subscribe(newPost => {
        post['id']=newPost.id;
        this.posts.splice(0, 0, post);
      });
  }
}
