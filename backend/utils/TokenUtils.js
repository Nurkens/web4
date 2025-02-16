import jwt from 'jsonwebtoken';

class TokenUtils {
    createAccessToken(payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    }

    createRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    }
}


export default new TokenUtils();