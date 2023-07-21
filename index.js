import express from "express";
import jwt from "jsonwebtoken";
// import { randomBytes } from "crypto";

const app = express();
const secretKey = "TuClaveSecreta";
const base64SecretKey = Buffer.from(secretKey).toString("base64"); // Reemplaza esto con tu propia clave secreta

app.use(express.json());

app.get("/login", (req, res) => {
    // Crear la carga útil (claims)
    const payload = {
        sub: "1234567890",
        name: "John Doe",
        admin: true,
    };

    const token = jwt.sign(payload, base64SecretKey);

    res.json({
        token,
    });
});

app.post("/signup", (req, res) => {
    const { token } = req.body;

    jwt.verify(token, base64SecretKey, (err, decoded) => {
        if (err) {
            res.status(401).send("Unauthorized");
            return;
        }

        res.send("OK");
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
