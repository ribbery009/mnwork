import express from 'express';
import { User } from '@mnwork/common';

const router = express.Router();

router.get('/api/users/getusers', async (req, res) => {
const users = await User.find();
let usersList = users.map((user) =>{
    let newUser = {
        name: user.name,
        job_title: user.job_title,
        email: user.email
    };
return newUser
})
res.send(usersList ? (usersList) : ({}))
});

export { router as getUsers };
