import  express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();


const PORT = 800;

//initalise express app
const app = express();

//initialise server
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
});

//engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/public", express.static(path.join(__dirname, "public")));

//app.use(express.static(path.join(__dirname, 'public')));

//body parser
app.use(bodyParser.urlencoded({ extended: true }));


//allows us to handle posts requests more efficiently
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

//requests and routes
//home page
app.get('/home', (req, res) => {
    res.sendFile('./public/home.html', { root: __dirname });
})

//key people
app.get('/people', (req, res) => {
    res.sendFile('./public/people.html', { root: __dirname })
});

//careers
app.get('/careers', (req, res) => {
    res.sendFile('./public/careers.html',  { root: __dirname })
});

//about Us
app.get('/about', (req, res) => {
    res.sendFile('./public/about.html', { root: __dirname })
});

//gallery
app.get('/gallery', (req, res) => {
    res.sendFile('./public/gallery.html', { root: __dirname })
});

//newsletter
// app.get('/newsletter', (req, res) => {
//     res.send("404 PAGE NOT AVAILABLE")
// });

//contact us
app.get('/contact', (req, res) => {
    res.sendFile('./public/contact.html', { root: __dirname })
});

//receipt
app.get('/recipt', (req, res) => {
    res.send('thank you')
});

//404 page not found
app.get('/newsletter', (req, res) => {
    res.sendFile('./public/404.html', { root: __dirname })
})



//email server
app.post('/emailList', async (req, res) => {
    try {
        const { fullName, email, message } = req.body;

        //validate user input
        if(!fullName && !email && !message) {
            return res.status(400).send('all input required')
        
        } else {

        //initalise nodemailer server
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.email,
              pass: process.env.password
            },
        });

        const mailOptions = {
            from: fullName,
            to: email,
            subject: null,
            text: message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          res.status(200).send('success')
        }
    } catch (err) {
        return console.log(err, 'error occured')
    }
})

//careers email server
app.post('/careersList', async (req, res) => {
    try {
        const { userName, userEmail, subject, userMessage } = req.body;

        //validate user input
        if(!userName && !userEmail && !subject && !userMessage) {
            return res.status(400).send('all input required')
        
        } else {

        //initalise nodemailer server
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "youremail@gmail.com",
              pass: "yourPassword",
            },
        });

        const mailOptions = {
            from: userName,
            to: userEmail,
            subject: subject,
            text: userMessage
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          return res.status(200).send('success')
        }
    } catch (err) {
        return console.log(err, 'error occured')
    }
});