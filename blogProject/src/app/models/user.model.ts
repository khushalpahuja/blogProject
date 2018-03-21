export class User {
    constructor(
        public username : string ,
        public _id:string ,
        public password : String ,
        public email : string , 
        public dob : Date , 
        public type : string , 
        public phone : number ,
        public isActive : {type : Boolean , default : false}
    ){}
    
}