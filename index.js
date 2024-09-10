import express from 'express';
import multer from "multer";
import mongoose from "mongoose";
import cors from 'cors'
import {registerValidation, loginValudation} from './validations.js'
import checkAuth from './utils/checkAuth.js'
import {UserController} from './controllers/index.js'
import handleErrors from "./utils/handleErrors.js";

mongoose.connect('mongodb+srv://aziretkrutdzumabekov:42qMwWSUw21shvKA@cluster0.ceq0v.mongodb.net/forms')
.then(() => console.log('MongoDB has been connected'))
.catch((err) =>console.log('DB Error', err))


const app = express();
const port = 4444;

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/upload', upload.single('image'), (req,res)=>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});

app.post('/auth/login', loginValudation, handleErrors,UserController.login)
app.post('/auth/register', registerValidation, handleErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);


app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`The server started on port ${port}`)
})