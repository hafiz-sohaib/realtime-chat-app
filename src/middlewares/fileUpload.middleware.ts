import multer from 'multer';
import { extname } from 'path';
import { RequestHandler } from 'express';

export default function uploadFile(fieldName: string): RequestHandler {
    const storage: any = multer.diskStorage({
        filename: async (request, file, callback) => {
            try {
                const uniqueSuffix: string = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext: string = extname(file.originalname);
                const filename: string = `${uniqueSuffix}${ext}`;
                callback(null, filename);
            } catch (error: any) {
                callback(null, error);
            }
        }
    });

    return multer({ storage }).fields([{ name: fieldName }]) as RequestHandler;
}