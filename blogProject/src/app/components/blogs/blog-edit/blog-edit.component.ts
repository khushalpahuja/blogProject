import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { BlogService } from '../../../services/blogs.service';
import { Blog } from '../../../models/blog.model';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  editMode:boolean;
  editItem : Blog;
  id:string;
  blogForm:FormGroup;
  blogTitle = '';
  blogImage = '';
  blogBody = '';
  likes = 0;

  constructor(private route:ActivatedRoute , 
              private blogService:BlogService , 
              private router:Router ,
              private http:Http) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = params['id'];
        this.editMode = params['id']!=null;
        this.initForm();
      }
    )
  }

  onSubmit(blogForm:NgForm){
    // const blogValue = {
      
    // }

    if(this.editMode) {
        this.blogService.updateBlog(this.id , blogForm.value).subscribe(
          (blog:Blog)=>{
            // this.blogService.blogs.forEach(function(blog1){
            //   if(blog1._id === blog._id){
            //     blog1 = blog;
            //     console.log("1234",blog1)                
            //   }
            // })
            console.log("UpdateBlog",blog);
            this.router.navigate(['../'] , {relativeTo:this.route});
          }
        )
        
    } else {
      this.blogService.createBlog(blogForm.value).subscribe(
        (blog:Blog)=>{
          this.blogService.blogs.push(blog);
          console.log(this.blogService.blogs);
          this.router.navigate(['/blogs']);
        }
      )
    }   
   
    console.log(this.blogService.blogs);
    
  }

  private initForm() {
    

    if(this.editMode) {
      this.blogService.getBlog(this.id).subscribe(
        (blog:any)=>{
          console.log("1233",blog);
          this.blogTitle = blog.foundBlog.title;
          this.blogImage = blog.foundBlog.image;
          this.blogBody = blog.foundBlog.body;
        }
      )
    } 


  }

}
