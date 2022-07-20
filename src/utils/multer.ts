import multer, { FileFilterCallback } from "multer";
import { Request } from 'express';
import fs from "fs"


const acceptedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif','image/JPG'];

//validate file
const checkFile = ( file: Express.Multer.File, cb:FileFilterCallback): void => {
    if (!acceptedMimeTypes.includes(file.mimetype)) {
        console.log("invalid mimetype")
        cb(null, false)
        return;
    }
    cb(null, true)
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      }
});

const upload = multer({
    storage: storage,
    fileFilter:function(req:Request,file:Express.Multer.File,cb:any)
    {
    checkFile(file,cb)
    },
    limits: { fileSize: 524288000 },
});

const deleteFile = (filePath:string)=>{
    fs.unlink(filePath,(err: any)=>{
        if(err){
            throw err;
        }
    })
}

// const cloudinaryStorage = () => {
//     const storage = multer.diskStorage({});
//     return multer({
//         storage: storage,
//         fileFilter: checkFile,
//         limits: { fileSize: 524288000 },
//     }).single('image')
// }

export default {upload,deleteFile};