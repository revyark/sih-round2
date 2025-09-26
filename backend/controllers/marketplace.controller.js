import jwt from 'jsonwebtoken';
import { Marketplace } from '../models/marketplace.model.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { checkPrediction, submitReport, verifyReport } from '../models/reportModel.js';
import { marketplace } from '../config/web3Config.js';

export const createMarketplace = async (req, res, next) => {
    try {
        const { name, marketplaceUrl, category, tags = [], imageUrl, description = '' } = req.body;

        if (!name || !marketplaceUrl || !category) {
            throw new ApiError(400, 'name, marketplaceUrl, and category are required');
        }

        // Read access token from cookie
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

        const creator = await User.findById(walletHash);
        if (!creator) {
            throw new ApiError(404, 'User not found');
        }

        // Check prediction
        const prediction = await checkPrediction(marketplaceUrl);
        if (prediction !== "benign") {
            await submitReport(marketplaceUrl, walletHash);
            const totalReports = await marketplace.methods.totalReports().call();
            const reportId = totalReports - 1;
            await verifyReport(reportId);
            throw new ApiError(400, 'Marketplace URL detected as malicious. Report submitted and verified. Listing not allowed.');
        }

        const marketplace = await Marketplace.create({
            name,
            marketplaceUrl,
            category,
            tags,
            imageUrl,
            description,
            createdByWalletHash: walletHash
        });

        // Link to user
        creator.marketplaces.push(marketplace._id);
        await creator.save();

        return res.status(201).json(new ApiResponse(201, { marketplace }, 'Marketplace created'));
    } catch (error) {
        next(error);
    }
};

export const getAllMarketplaces = async (req, res, next) => {
    try {
        const marketplaces = await Marketplace.find({}).sort({ createdAt: -1 });
        // Use imageUrl (Cloudinary URL) directly
        const marketplacesWithUrls = marketplaces.map((marketplace) => ({
            ...marketplace.toObject(),
            imageUrl: marketplace.imageUrl
        }));
        return res.status(200).json(new ApiResponse(200, { marketplaces: marketplacesWithUrls }, 'All marketplaces fetched'));
    } catch (error) {
        next(error);
    }
};

export const getMyMarketplaces = async (req, res, next) => {
    try {
        // Auth from cookie or bearer
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
        const marketplaces = await Marketplace.find({ createdByWalletHash: walletHash }).sort({ createdAt: -1 });
        const marketplacesWithUrls = marketplaces.map((marketplace) => ({
            ...marketplace.toObject(),
            imageUrl: marketplace.imageUrl
        }));
        return res.status(200).json(new ApiResponse(200, { marketplaces: marketplacesWithUrls }, 'My marketplaces fetched'));
    } catch (error) {
        next(error);
    }
};

export const discardMarketplace = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new ApiError(400, 'Marketplace id is required');
        }
        // Auth from cookie or bearer
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
        const marketplace = await Marketplace.findById(id);
        if (!marketplace) {
            throw new ApiError(404, 'Marketplace not found');
        }
        if (marketplace.createdByWalletHash !== walletHash) {
            throw new ApiError(403, 'Not allowed to discard this marketplace');
        }
        // Just delete the marketplace and unlink from user
        await Marketplace.deleteOne({ _id: id });
        await User.updateOne({ _id: walletHash }, { $pull: { marketplaces: id } });
        return res.status(200).json(new ApiResponse(200, {
            id,
            message: 'Marketplace discarded'
        }, 'Marketplace discarded'));
    } catch (error) {
        next(error);
    }
};


