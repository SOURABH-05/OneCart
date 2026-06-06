import multer from 'multer'
import fs from 'fs'

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const dir = "./public";
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir)

    },
    filename:(req,file,cb)=>{
         cb(null,file.originalname)
    }
});

let upload = multer({storage})

export default upload