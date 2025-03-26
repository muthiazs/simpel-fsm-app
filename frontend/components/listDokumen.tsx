import React from 'react';
import { List, Card, Space, Tag } from 'antd';
import { DownloadOutlined, FileOutlined } from '@ant-design/icons';
import axios from 'axios';

interface DocumentItem {
  title: string;
  url: string | null;
  bucket: string;
}

const getPresignedUrl = async (bucket: string, filename: string): Promise<string | null> => {
  console.log("🔍 Mengirim request untuk presigned URL:", { bucket, filename });

  try {
    const response = await axios.get("http://localhost:3001/api/minio/presigned-url", {
      params: { bucket, filename },
    });

    console.log("✅ Response dari server:", response.data);
    return response.data.success ? response.data.url : null;
  } catch (error) {
    console.error(
      "❌ Gagal mendapatkan presigned URL",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

const DocumentList = ({ title, dataSource, grid }: { title: string; dataSource: DocumentItem[]; grid: any }) => {
  return (
    <Card
      title={
        <Space>
          <FileOutlined />
          <span>{title}</span>
        </Space>
      }
      hoverable
      variant="outlined"
      style={{
        height: "100%",
        width: "100%",
        boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <List
        grid={grid}
        dataSource={dataSource}
        renderItem={(item: DocumentItem) => (
          <List.Item>
            <Card
              hoverable
              size="small"
              onClick={async () => {
                if (item.url) {
                  const url = await getPresignedUrl(item.bucket, item.url.split("/").pop()!);
                  if (url) window.open(url, "_blank");
                }
              }}
            >
              <Card.Meta
                avatar={<DownloadOutlined />}
                title={
                  <Space>
                    {item.title}
                    {item.url ? (
                      <Tag color="green">File Tersedia</Tag>
                    ) : (
                      <Tag color="red">File Tidak Tersedia</Tag>
                    )}
                  </Space>
                }
                description={item.url ? "Klik untuk mengunduh" : "Tidak ada file"}
              />
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default DocumentList;
