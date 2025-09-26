import { Router } from 'express';
import { upload, uploadImage } from '../controllers/upload.controller.js';
import { scanUrl } from '../controllers/upload.controller.js';

const router = Router();

// Upload image to Cloudinary
router.post('/image', upload.single('image'), uploadImage);

// Scan URL for phishing
router.get('/scan', scanUrl);

export default router;
