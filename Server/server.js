import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: ["https://session-management-in-express.vercel.app/"],
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    cookie: { 
        secure: true,
        maxAge: 3600000 * 24 * 30,
        httpOnly: true,
     },
    secret: 'secretkeydsfsdf',
    resave: false,
    saveUninitialized: false,
}));

app.get('/', (req, res) => {
    res.send(req.session.user || "hello world");
})

// Register route
app.post("/api/users/register", (req, res) => {
    req.session.user = req.body;
    // console.log(req.session.user);
    req.session.save(err => {
        if (err) {
            return res.status(500).send("Session save failed.");
        }
        res.status(200).json({
            success: true,
            data: req.session.user,
        });
    });
});

// Users route
app.get("/api/users", (req, res) => {
    console.log(req.session.user);
    res.json(req.session.user || null);
})

app.post("/api/users/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Session destroy failed.");
        }
        res.status(200).json({
            success: true,
            message: "User logged out successfully.",
        });
    });
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
