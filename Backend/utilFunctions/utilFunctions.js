import * as fs from "fs"

export const deleteFileAfterProcessing = (filePath) => {

    fs.unlink(filePath,(err)=>{
        if(err){
            console.log("Error in deleting File");
        }else{
            console.log("File deleted successfully");
        }
    })
}