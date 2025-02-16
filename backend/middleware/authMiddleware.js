import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1]; 
        if (!token) return res.status(401).json({ message: "No token provided" });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Invalid token" });

            req.user = user;
            next();
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default authMiddleware;
