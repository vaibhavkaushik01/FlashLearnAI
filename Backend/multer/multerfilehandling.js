import multer from "multer"

const storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null, 'D:/MinorProject/FlashLearnAI/Uploads'); //path where files will be stored
    },
    filename : function (req,file,cb) {
        const uniqueprefix = Date.now();
        cb(null, uniqueprefix + '-' + file.originalname); //what should be name of file that is stored
    }
})

export const upload = multer({storage});