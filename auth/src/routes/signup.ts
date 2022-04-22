import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest,BadRequestError } from '@mnwork/common';
import { User } from '@mnwork/common';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Nem valid e-mail cím'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('A jelszó 4 és 20 karakter között a megfelelő'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password,name,rule,job_title,phone,city,address,postcode } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Az e-mail használatban van már');
    }

    const user = User.build({email, password,name,rule,job_title,phone,city,address,postcode});
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signupRouter };
