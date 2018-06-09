import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  posts: any[];
  
  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(response => {
        this.posts = response.json();
        console.log(response.json());
      })
  }
  
  updatePost(post){
    console.log(post.title);
  }

  createPost(input: HTMLInputElement){
    let post = {title: input.value};
    input.value = '';

    this.service.createPost(JSON.stringify(post))
      .subscribe(response => {
        post['id']=response.json().id;
        this.posts.splice(0, 0, post);
      });
  }
}
