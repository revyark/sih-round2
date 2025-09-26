import { submitUserReport as submitUserReportModel, submitReport as submitReportModel, getReports as getReportsModel, verifyReport as verifyReportModel } from '../models/reportModel.js';
import safeJson from '../utils/safeJson.js';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

export async function submitReport(req, res) {
    try {
        // Auth check
        const token = req.cookies?.accessToken || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
        if (!token) {
            throw new ApiError(401, 'Unauthorized');
        }
        let walletHash;
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            walletHash = decoded.sub;
        } catch (err) {
            throw new ApiError(401, 'Invalid or expired token');
        }

        const { url, accusedWallet } = req.body;

        console.log("🌐 Received report request for URL:", url);
        console.log("👤 Accused Wallet:", accusedWallet);

        const result = await submitReportModel(url, accusedWallet);
        res.json(result);
    } catch (err) {
        console.error("❌ Error submitting report:", err);
        res.status(err.statusCode || 500).json({ error: err.message || err.toString() });
    }
}
export async function submitUserReport(req, res) {
    try {
        // Auth check
        const token = req.cookies?.accessToken || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
        if (!token) {
            throw new ApiError(401, 'Unauthorized');
        }
        let walletHash;
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            walletHash = decoded.sub;
        } catch (err) {
            throw new ApiError(401, 'Invalid or expired token');
        }

        const { url, userWallet } = req.body;
        console.log("🌐 Received user report request for URL:", url);
        console.log("👤 User Wallet:", userWallet);
        const result = await submitUserReportModel(url, userWallet);
        res.json(result);
    } catch (err) {
        console.error("❌ Error submitting user report:", err);
        res.status(err.statusCode || 500).json({ error: err.message || err.toString() });
    }
}

export async function getReports(req, res) {
    try {
        const data = await getReportsModel();
        res.send(safeJson(data));
    } catch (err) {
        console.error("❌ Error fetching reports:", err);
        res.status(500).json({ error: err.toString() });
    }
}

export async function verifyReport(req, res) {
    try {
        const { reportId } = req.body;

        if (reportId === undefined) {
            return res.status(400).json({ error: "reportId is required" });
        }

        const result = await verifyReportModel(reportId);
        res.json(result);
    } catch (err) {
        console.error("❌ Error verifying report:", err);
        res.status(500).json({ error: err.toString() });
    }
}
