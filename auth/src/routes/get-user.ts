import express from 'express';
import { User } from '@mnwork/common';
import { BadRequestError } from '@mnwork/common';

const router = express.Router();

router.get('/api/users/getuser', async (req, res) => {
    let userCurrent=null;

    if (req.query && req.query["_id"]) {
    const _id  = req.query["_id"];
    userCurrent = await User.findOne({ _id });


}else {
        throw new BadRequestError('Invalid credentials');
    }
    res.status(200).send(userCurrent);
});

export { router as getUser };
