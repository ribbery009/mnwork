import express from 'express';
import { User } from '@mnwork/common';

const router = express.Router();

router.get('/api/users/getusers', async (req, res) => {
    const users = await User.find();
    let usersList = users.map((user) => {
        return user;
    })


    if (!usersList) {
        res.send({});
    }
    res.send(usersList)
})

// res.send(usersList ? (usersList) : ({}))



export { router as getUsers };
