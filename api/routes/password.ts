import express from 'express';
const Vigenere = require('caesar-salad').Vigenere;
import {Decode, Encoded, Message} from "../types";
const passwordRouter = express.Router();

passwordRouter.post('/encode', (req, res) => {
    const encode: Encoded = {
        encoded: Vigenere.Cipher(req.body.password).crypt(req.body.message),
    };

    res.send(encode);
});

passwordRouter.post('/decode', async (req, res) => {
    const decode: Decode = {
        decoded: Vigenere.Decipher(req.body.password).crypt(req.body.message),
    }

    res.send(decode);
});

export default passwordRouter;