import express from 'express';
import { queryDatabase } from '../database/mySQL.database.js';
import { logInController } from '../controllers/logIn.controller.js';

export const router = express.Router();

router.get('/', logInController);