import { Comment } from "./comment.model";

export class Blog{
    constructor(
        public _id : string ,
        public title : string , 
    	public image : string , 
        public body : string , 
        public likecount : number,
        public author : {
            id : string,
            username : String
        }, 
        public liked: string[] ,
        public comments : Comment[]
        ){}
}