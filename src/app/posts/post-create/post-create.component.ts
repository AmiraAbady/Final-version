import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from "@angular/forms"; 
import { Router } from '@angular/router'; 
import { PostsService } from "../posts.service";
import { ToastrService } from 'ngx-toastr';
import { Post } from "../post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(
    public postsService: PostsService,
    private tostr: ToastrService ,
    private router:Router,
    private firestore: AngularFirestore 
  ) { }

  ngOnInit() {
  }

  onSavePost(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.invalid) {
      return;
    } 
     
    if (form.value.id == null)
    this.postsService.addPost(data);
     
  else
    this.postsService.updatePost(form.value.id,data);
    this.resetForm(form); 
    this.tostr.success('Submitted Succcessfully', 'Post Created');
    this.router.navigate(['/'])
   
  }


  resetForm(form?: NgForm) {
    if (form != null)
    form.reset();
    this.postsService.selectedPost = {
      id: null,
      title: '',
      content: ''  
    }
  }

}
