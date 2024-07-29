import dotenv from 'dotenv'
dotenv.config();


const isAuthenticated = (req, res, next) => {
    const origin = req.headers.origin
    origin === process.env.ORIGIN ? next() : res.status(401).json({ error: "No estás autorizado" });
};




export { isAuthenticated };