import express, { Request, Response } from 'express';
import { validateRequest,BadRequestError } from '@mnwork/common';
import { User } from '@mnwork/common';

const router = express.Router();

router.post(
  '/api/users/delete',
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.body;

    let existingUser = await User.findOne({ "_id" : id });
   
    if (!existingUser) {
      throw new BadRequestError('Nem találom a felhasználót!');
    }

    await User.deleteOne({ _id:id });


    res.status(201).send("Sikeres törlés!");
  }
);

export { router as deleteUser };
