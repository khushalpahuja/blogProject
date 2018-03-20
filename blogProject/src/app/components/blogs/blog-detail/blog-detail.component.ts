import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blogs.service';
import { Blog } from '../../../models/blog.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Comment } from '../../../models/comment.model';
import { Response } from '@angular/http';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog :Blog;
  likecount:number;
  id:string;
  commentsArray;
  editComment='';
  currentComment;
  btnText = 'Add Comment';
  
  constructor(private blogService:BlogService ,
              private route:ActivatedRoute , 
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = params['id'];
        this.blogService.getBlog(this.id).subscribe(
          (data:any)=>{
            this.blog = data.foundBlog;
            this.blog.comments = data.comment;
            this.likecount = this.blog.likecount;
          }
        )
      }
    )
  }
  onEdit(){
    this.router.navigate(['edit'], {relativeTo:this.route });
  }

  onDelete(){
    this.blogService.deleteBlog(this.id).subscribe(
      (value:any)=> {
        this.router.navigate(['/blogs'])
      }
    );
    
  }

  onLike(){
    console.log("like button pressed");
    this.blogService.likeIncrease(this.id , this.blog.likecount).subscribe();
    this.likecount++;

  }

  onAddComment(comment:any){
    // console.log(comment);
    if(this.btnText === 'Edit'){
      this.blogService.editComment(this.id , this.currentComment._id , comment.value).subscribe(
        (response:any)=> {
          console.log(response);
          this.currentComment.text = response.json().text;
          console.log("edit comment");
        }
      )
    } else {
        this.blogService.addComment( this.id , comment.value).subscribe(
          (response:any)=> {
            console.log("abc");
            this.blog.comments.push(response.json());
            console.log(this.blog);
          }
        )
    }
    this.btnText = 'Add Comment';
    this.editComment = '';
    
  }

  onDeleteComment(commentId:string){
    this.blogService.deleteComment(this.id , commentId).subscribe(
      (response:Response)=>{
        var index = this.blog.comments.findIndex(comment=> comment._id === commentId);
        this.blog.comments.splice(index,1);
      }
    )
  }

  onEditComment(commentText, commentId:string){
    this.editComment = commentText;
    this.btnText = 'Edit'
    var index = this.blog.comments.findIndex(comment=> comment._id === commentId);
    // this.blog.comments[index].text = this.editComment;    
    this.currentComment = this.blog.comments[index];
    console.log(this.currentComment);

  }

}
