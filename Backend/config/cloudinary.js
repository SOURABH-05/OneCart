import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadCloud = async(filePath)=>{

 cloudinary.config({ 
        cloud_name: 'didrv4rrn', 
        api_key: '666795565416834', 
        api_secret: 'lff9kGEnT4plv_gj-rfA9r2jUqE' 
    });

    try {
       if(!filePath){
        return null
       } 

        const uploadResult = await cloudinary.uploader .upload(filePath)
        fs.unlinkSync(filePath)
        return uploadResult.secure_url

    } catch (error) {
         fs.unlinkSync(filePath)
         console.log(error)
    }
}

export default uploadCloud