import express from 'express';
import { submitReport, submitUserReport, getReports, getVerifiedReports, getUserReports, verifyReport } from '../controllers/reportController.js';

const router = express.Router();

router.post('/submitReport', submitReport);
router.post('/submitUserReport', submitUserReport);
router.get('/reports', getReports);
router.get('/verifiedReports', getVerifiedReports);
router.get('/userReports', getUserReports);
router.post('/verifyReport', verifyReport);

export default router;
