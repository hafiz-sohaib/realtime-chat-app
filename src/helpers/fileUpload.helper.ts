import fs from 'fs';
import { google } from 'googleapis';
import globalConstants from '../config/constants';

export const auth: any = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/drive',
});

const drive: any = google.drive({ version: 'v3', auth });

export default async function uploadFileOnCloud(filePath: string, fileName: string): Promise<any> {
    const fileMetadata: any = {name: fileName, parents: [globalConstants.DRIVE_FOLDER_ID]};
    const media: any = {mimeType: 'application/octet-stream', body: fs.createReadStream(filePath)};

    try {
        return (await drive.files.create({requestBody: fileMetadata, media, fields: 'id'})).data;
    } catch (error) {
        console.log(`uploading error ${error}`);
    }
}