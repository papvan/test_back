import {Router} from 'express';
import {calculateAction, validate} from "../controllers/commonController.js";

const router = Router();
router.post('/calculate', validate(), calculateAction);

export default router;