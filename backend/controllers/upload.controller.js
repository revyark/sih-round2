import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'website_images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        transformation: [{ width: 800, height: 600, crop: 'limit' }],
    },
});

export const upload = multer({ storage });

export const scanUrl = async (req, res, next) => {
    try {
        const { url } = req.query;
        
        if (!url) {
            return res.status(400).json(new ApiResponse(400, null, 'URL parameter is required'));
        }

        const response = await fetch(`https://phishing-detection-production-983e.up.railway.app/predict?url=${encodeURIComponent(url)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to scan URL');
        }

        const data = await response.json();
        
        return res.status(200).json(new ApiResponse(200, data, 'URL scanned successfully'));
    } catch (error) {
        console.error('URL scan error:', error);
        next(error);
    }
};

export const uploadImage = async (req, res, next) => {
    try {
        // Check authentication
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

        // Check if file is provided
        if (!req.file) {
            throw new ApiError(400, 'No image file provided');
        }

        // File info from multer-storage-cloudinary
        const { path: imageUrl, originalname, mimetype, size } = req.file;

        return res.status(200).json(new ApiResponse(200, {
            imageUrl,
            size,
            originalName: originalname,
            mimetype
        }, 'Image uploaded successfully to Cloudinary'));
    } catch (error) {
        next(error);
    }
};

/**
 * Get presigned URL for direct upload (alternative approach)
 * GET /api/upload/presigned-url
 */
export const getPresignedUrl = async (req, res, next) => {
    try {
        // Check authentication
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

        // For now, return a simple response indicating the endpoint is ready
        // In a real implementation, you might want to generate a presigned URL
        // or return upload instructions
        return res.status(200).json(new ApiResponse(200, {
            message: 'Upload endpoint ready',
            uploadUrl: '/api/upload/image',
            maxFileSize: '5MB',
            allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        }, 'Presigned URL generated'));

    } catch (error) {
        next(error);
    }
};

/**
 * Get IPFS URL from CID
 * GET /api/upload/url/:cid
 */
export const getImageUrl = async (req, res, next) => {
    try {
        const { cid } = req.params;

        if (!cid) {
            throw new ApiError(400, 'CID is required');
        }

        const ipfsUrl = await getPinataFileUrl(cid);

        return res.status(200).json(new ApiResponse(200, {
            cid,
            ipfsUrl
        }, 'IPFS URL generated'));

    } catch (error) {
        next(error);
    }
};



