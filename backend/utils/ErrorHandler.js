class ErrorHandler extends Error{
    constructor(message="Something Went Wrong",statusCode=400,errors=[]){
        super(message);
        this.statusCode=statusCode;
        this.errors=errors;
        this.data=null;
        this.success=false;
    }
}

module.exports=ErrorHandler;