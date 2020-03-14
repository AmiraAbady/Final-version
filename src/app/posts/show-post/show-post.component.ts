import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Router } from '@angular/router'; 
import { PostsService } from "../posts.service";
import { ToastrService } from 'ngx-toastr';
import { Post } from '../post.model';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
  postId:string;
  constructor(
    public postsService: PostsService,
    private tostr: ToastrService ,
    private router:Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => { 
        this.postId = paramMap.get("postId"); 
        this.postsService.getPost(this.postId) 
    });

  }

  onEdit(post: Post) {
    this.postsService.setValue(post) 
    this.router.navigate(['/edit',post.id]) 
  }


  onDelete(id: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.postsService.deletePost(id);
      this.tostr.warning("Deleted Successfully", "Post Deleted");
    }
    this.router.navigate(['/'])
  }

}
