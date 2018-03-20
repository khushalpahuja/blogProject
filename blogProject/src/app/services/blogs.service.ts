import { Blog } from "../models/blog.model";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class BlogService{
    constructor(private http:Http){}
    blogEdit:Blog;
    public comment:Comment[];
    public blogs:Blog[] = [
      // new Blog(
      //   "Sacred land",
      //   "https://static2.visitestonia.com/images/3060913/original-original-Kaali%2Bsacred%2Bplace.+visit+Estonia-min.jpg",
      //   "this is a Sacred land sdbdbsjdbguhsdbghd\r\ndkjdfhjdd\r\nsdhsbdhbdhjbdd\r\nsdjdnjsndjds\r\nsmdksmdksmd\r\nksdmkd",        
      //   11
      // ),
      // new Blog(
      //   "asnsdjnn",
      //   "http://www.silentjourney.com/blog/wp-content/uploads/2015/01/top-10-amazing-places-you-wont-b.jpg",
      //   "mksddsksdkmkdjkdfjkjdfj\r\ndjffbjdgfdgfd\r\nbndjhdbjhbss",
      //   4
      // )
    ];

    getBlogs(){
      // console.log("Sddnj");
      return this.http.get('http://localhost:8000/blogs').map(
        (response:Response) => {
          // console.log(response.json());
          return response.json();
        }
      )
        
    }

    createBlog(blog:Blog){
      return this.http.post('http://localhost:8000/blogs' , blog).map(
        (response:Response) => {
          // this.blogsUpdated.next(response.json());
          // this.blogs.push(response.json());
          return response.json();
        }
      )
    }
  
    getBlog(str:string){
      return this.http.get('http://localhost:8000/blogs/'+ str).map(
        (response:Response)=> {
          console.log(response);
          this.blogEdit = response.json().foundBlog;
          return response.json();
        }
      )
    }

    updateBlog(id:string , updateBlog:Blog){
      return this.http.put('http://localhost:8000/blogs/'+ id ,updateBlog).map(
        (response:Response)=> {
          // console.log(response);
          return response.json();
        }
      )
    }

    deleteBlog(id:string){
      return this.http.delete('http://localhost:8000/blogs/'+ id);
    }

    likeIncrease(BlogId:string , likeCount:number){

      console.log("like service method");
      return this.http.put('http://localhost:8000/blogs/'+ BlogId + '/like' , {likeCount});
    }

    addComment(id:string,text:string){
      // console.log(text);
      return this.http.post('http://localhost:8000/blogs/'+ id +'/comments' ,{text})
    }

    editComment(blogId:string ,id:string,text:string){
      console.log("backend call");
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.put('http://localhost:8000/blogs/'+blogId+'/comments/'+id , {text} , {headers:headers} );
    }
    
    deleteComment(blogId:string ,commentId:string){
      return this.http.delete('http://localhost:8000/blogs/'+ blogId +'/comments/'+ commentId);
    }



}