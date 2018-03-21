export class Comment {
    constructor(
        public _id : string,
        public text : string,
        public author: {
            id:string,
            username:string
        }
    ){}
};