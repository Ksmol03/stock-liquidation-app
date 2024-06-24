import express from 'express';
import { logInController } from '../controllers/logIn.controller.js';
import { logOutController } from '../controllers/logOut.controller.js';
import { authenticateUserMiddleware } from '../middleware/authenticateUser.middleware.js';
import { listItemsController } from '../controllers/listItems.controller.js';

export const router = express.Router();

router.get('/logIn', logInController);
router.get('/logOut', logOutController);

router.use(authenticateUserMiddleware);
router.get('/listItems', listItemsController)