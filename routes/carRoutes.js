import {Router} from 'express';
import {getList, getOne, createOne, updateOne, removeOne, validate, getFeatures} from '../controllers/carController.js';

const router = Router();

router.get('/list', getList);
router.get('/get/:id', getOne);
router.post('/create', validate('saveOne'), createOne);
router.put('/update/:id', validate('saveOne'), updateOne);
router.delete('/delete/:id', removeOne);
router.get('/features/list', getFeatures);

export default router;