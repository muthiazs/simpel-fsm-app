// /routes/generateDocumentRoute.ts
import { Elysia } from 'elysia';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import * as mammoth from 'mammoth';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';
import MinioClient from '../lib/MinioClient';

interface RequestBody {
  token: string;
}

const generateDocumentRoute = new Elysia()
  .post('/generate-document/:id', async ({ params, body, set }) => {
    try {
      const { id } = params;
      const { token: storedToken } = body as RequestBody;
      
      // Fetch permohonan data
      const response = await fetch(`http://localhost:3001/api/permohonan/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      
      if (!response.ok) {
        set.status = 400;
        return { success: false, message: 'Failed to fetch permohonan data' };
      }
      
      const data = await response.json();
      if (!data.success) {
        set.status = 400;
        return { success: false, message: 'Invalid permohonan data' };
      }
      
      const permohonanData = data.data;
      const pemohon = permohonanData.pemohon;
      
      // Format date range
      const startDate = new Date(permohonanData.tglmulai);
      const endDate = new Date(permohonanData.tglselesai);
      const formattedDateRange = `${startDate.getDate()} - ${endDate.getDate()} ${startDate.toLocaleString('id-ID', { month: 'long' })} ${startDate.getFullYear()}`;
      
      // Load the template
      const templatePath = path.join(process.cwd(), 'templates', 'Template_Surat_Permohonan_PDLN.docx');
      const content = fs.readFileSync(templatePath, 'binary');
      
      // Create a zip object from the content
      const zip = new PizZip(content);
      
      // Create a Docxtemplater instance
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      
      // Render the document with data
      doc.render({
        'Nama + Gelar Lengkap': pemohon.nama,
        'NIP/NIM': pemohon.nipnim,
        'Pangkat/Gol': pemohon.pangkatgol,
        'Jabatan': pemohon.jabatan,
        'NIK': pemohon.nik,
        'Email': pemohon.email || '',
        'Nomor WA': pemohon.nohp,
        'Keperluan': permohonanData.keperluan,
        'Waktu Kegiatan': formattedDateRange,
        'Instansi Tujuan': permohonanData.instansitujuan,
        'Negara Tujuan': permohonanData.negaratujuan,
        'Kota Tujuan': permohonanData.kotatujuan || permohonanData.negaratujuan,
        'No Paspor': pemohon.nopaspor,
        'Perkiraan Biaya (Rupiah)': permohonanData.biaya,
      });
      
      // Get the zip file as binary content
      const generatedDoc = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
      });
      
      // Generate a unique filename
      const timestamp = Date.now();
      const filename = `permohonan_${id}_${timestamp}.docx`;
      
      // Upload to MinIO
      await MinioClient.putObject('documents', filename, generatedDoc, generatedDoc.length, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      
      // Return the document URL
      const documentUrl = `http://localhost:9000/documents/${filename}`;
      
      return {
        success: true,
        message: 'Document generated successfully',
        documentUrl,
        filename,
      };
    } catch (error) {
      console.error('Error generating document:', error);
      set.status = 500;
      return { 
        success: false, 
        message: 'Failed to generate document', 
        error: (error as Error).message,
      };
    }
  });

export default generateDocumentRoute;
