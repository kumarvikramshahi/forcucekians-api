const JWT = require('jsonwebtoken');

module.exports = (req, resp, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            resp.status(401).json({ message: "Not authenticated" })
        }

        const token = authHeader.split(' ')[1];
        let decodeToken = JWT.verify(token, 'JoEsLineKoCopyKreWoDuniyaKaSbseBraWalaBhosriwalaSamjhaReRandiyaWala');
        if (!decodeToken) {
            resp.status(401).json({ message: "Not authenticated" })
        }

        req.userId = decodeToken.userId;
        next();
    } catch (err) {
        console.log(err)
        resp.status(500).json({ message: "Internal server error" })
    }
}