'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button, message, Spin, Space, Tooltip } from 'antd';
import { FilePdfOutlined, DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';

interface GenerateDocumentProps {
  permohonanId: string;
  disabled?: boolean;
}

const GenerateDocument: React.FC<GenerateDocumentProps> = ({ permohonanId, disabled = false }) => {
  const [generating, setGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  const handleGenerateDocument = async () => {
    const storedToken = localStorage.getItem("authToken");
    
    if (!storedToken) {
      message.error("Token tidak ditemukan!");
      return;
    }

    setGenerating(true);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/generate-document/${permohonanId}`,
        { token: storedToken },
        { responseType: 'json' }
      );

      if (response.data.success) {
        setDownloadUrl(response.data.documentUrl);
        setFilename(response.data.filename);
        message.success('Dokumen berhasil dibuat');
      } else {
        message.error(response.data.message || 'Gagal membuat dokumen');
      }
    } catch (error) {
      console.error('Error generating document:', error);
      message.error('Terjadi kesalahan saat membuat dokumen');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      saveAs(downloadUrl, filename || 'permohonan_izin.docx');
    }
    console.log('Download URL:', downloadUrl);
    console.log('Filename:', filename);
  };

  return (
    <Space direction="horizontal">
      <Tooltip title="Generate Dokumen PDLN">
        <Button
          type="primary"
          icon={generating ? <LoadingOutlined /> : <FilePdfOutlined />}
          onClick={handleGenerateDocument}
          loading={generating}
          disabled={disabled || generating}
        >
          Generate Dokumen
        </Button>
      </Tooltip>
      
      {downloadUrl && (
        <Tooltip title="Download Dokumen">
          <Button
            type="default"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            Download
          </Button>
        </Tooltip>
      )}
    </Space>
  );
};

export default GenerateDocument;