import { Injectable } from "@angular/core";  
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
 

    selectedPost:Post=new Post();
    comingPosts:Post[]=[]
    fetchedPost:Post=new Post();

  
  constructor(private firestore: AngularFirestore) {}

  getPosts(){
       
    return this.firestore.collection('posts').snapshotChanges();
  }

  addPost(post)
  {
    this.firestore.collection('posts').add(post);
  }

  getPost(id:string){
    this.firestore.collection('posts').doc(id)
    .get()
    .pipe(
      map(post=>{
      const data=post.data() as Post
      return { id,...data}
    }))
    .subscribe(singlePost=>{ 
      this.fetchedPost= singlePost;
      console.log(this.fetchedPost)
      
    })
      
  }


  updatePost(id:string,data){ 
    this.firestore.doc('posts/' +id).update(data);
  }


  deletePost(id : string){
    this.firestore.doc('posts/' + id).delete();
  }



  setValue(value:Post){ 
    this.selectedPost=value;
  }

  // fetchValue(value:Post){ 
  //   this.fetchedPost=value;
  // }
   
}