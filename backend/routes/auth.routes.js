import { Router } from 'express';
import { connectWallet, setWalletBan } from '../controllers/auth.controller.js';

const router = Router();

router.get('/ping', (req, res) => {
    res.status(200).json({ ok: true, route: 'auth', message: 'auth router mounted' });
});

router.route('/connect-wallet').post(connectWallet);
router.route('/set-wallet-ban').post(setWalletBan);

export default router;


