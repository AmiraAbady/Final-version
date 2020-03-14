import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[]=[];
  constructor(public postsService: PostsService,private router:Router) { }

  ngOnInit() {  
    this.postsService.getPosts()
    .pipe(
      map(docArray =>{
        return docArray.map(doc=>{
          const id= doc.payload.doc.id
          const data= doc.payload.doc.data()as Post
          return { id,...data }  
        })  
    })).subscribe(actionArray => { 
      this.posts = actionArray   
    });
   
  }

  // singlePost(post: Post){ 
  //   this.postsService.fetchValue(post) 
  //   this.router.navigate(['/show',post.id]) 
 

  // }

}
