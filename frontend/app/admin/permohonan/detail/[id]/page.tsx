'use client'
import React, { useEffect, useState } from 'react';
import { Row, Col, List, Typography, Card, Space, Badge, Tag, Button, Form, message } from 'antd';
import { 
    DownloadOutlined, 
    UserOutlined, 
    GlobalOutlined, 
    FileOutlined, 
    ArrowLeftOutlined
} from '@ant-design/icons';
import Menu from '../../../../../components/MenuAdmin';
import { useParams , useRouter } from "next/navigation";
import axios from 'axios';

const { Title, Text } = Typography;

interface PermohonanDetailResponse {
    success: boolean;
    message: string;
    data: {
      id_permohonan: number;
      negaratujuan: string;
      instansitujuan: string;
      keperluan: string;
      tglmulai: string;
      tglselesai: string;
      biaya: string;
      rencana: string;
      undangan: string;
      agenda: string;
      tor: string;
      status : string;
      createdat: string;
      updatedat: string;
      pemohon: {
        id_pemohon: number;
        nama: string;
        nohp: string;
        nik: string;
        jabatan: string;
        pangkatgol: string;
        nopaspor: string;
        prodi: string;
        nipnim: string;
        filektp: string;
        filekarpeg: string;
      };
    };
  }

const PermohonanDetailPage: React.FC = () => {
        const params = useParams();
        const id = params.id as string;
        const router = useRouter();
        const [detail, setDetail] = useState(null);
        const [loading, setLoading] = useState(true);

        

        useEffect(() => {
          const fetchPermohonanDetail = async () => {
            try {
              const response = await axios.get<PermohonanDetailResponse>(`http://localhost:3001/api/permohonan/${id}`);
              if (response.data.success) {
                setDetail(response.data);
              } else {
                message.error("Gagal mengambil data permohonan.");
              }
            } catch (error) {
              message.error("Terjadi kesalahan saat mengambil data permohonan.");
            } finally {
              setLoading(false);
            }
          };
        
          fetchPermohonanDetail();
        }, [id]); 

        if (loading) {
            return <div>Loading...</div>;
        }

        if (!detail) {
            return <div>Data tidak ditemukan</div>;
        }

        const currentPermohonan = detail.data;
        const pemohon = currentPermohonan.pemohon;
        const formatDate = (dateString) => {
            if (!dateString) return "-";
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
          };
        
          
        // Map status values to display text and Badge status type
        const statusConfig = {
          belumdisetujui: { text: 'Belum Disetujui', status: 'processing' },
          disetujui: { text: 'Disetujui', status: 'success' },
          ditolak: { text: 'Ditolak', status: 'error' },
          dalamproses: { text: 'Dalam Proses', status: 'warning' }
        };
        
        
        // Map status values to Tag colors for the Tag in the information section
        const tagColorMap = {
          belumdisetujui: 'blue',
          disetujui: 'green',
          ditolak: 'red',
          dalamproses: 'orange'
        };
        
        // Get status configuration or use default
        const status = currentPermohonan.status || 'belumdisetujui';
        const statusInfo = statusConfig[status] || { text: 'Belum Disetujui', status: 'processing' };
        
        const getPresignedUrl = async (bucket: string, filename: string) => {
          console.log("🔍 Mengirim request untuk presigned URL:", { bucket, filename });
        
          try {
            const response = await axios.get("http://localhost:3001/api/minio/presigned-url", {
              params: { bucket, filename } // Kirim apa adanya
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
        const updateStatus = async (status: string) => {
          if (!id) {
            message.error("ID permohonan tidak ditemukan");
            return;
          }

          const token = localStorage.getItem("authToken");
          console.log("🔹 Token sebelum dikirim:", token);
        
          try {
            const response = await fetch(`http://localhost:3001/api/permohonan/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${token}`,
              },
              body: JSON.stringify({ status }),
            });
        
            const data = await response.json();
            console.log("Response dari backend:", data); // 🔍 Debug response
        
            if (data.success) {
              message.success(`Permohonan telah ${status === "disetujui" ? "disetujui" : "ditolak"}`);
              window.location.reload(); // Reload halaman untuk memperbarui data
            } else {
              message.error("Gagal mengupdate status");
            }
          } catch (error) {
            console.error("Error:", error);
            message.error("Terjadi kesalahan saat mengupdate status");
          }
        };
        
          return (
            <>
           <Menu />
            <div style={{ display: "flex", flexDirection: "column", width: "100%", background: "#f5f5f5" }}>
              <div style={{ padding: "24px" }}>
              <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Card 
                hoverable
                variant = "outlined"
                    style = {{ height: '100%'  ,  width: '100%' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)'}}
                    >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <Space align="center" size="middle" style={{ display: 'flex', alignItems: 'center' }}>
                      {/* Gunakan button untuk navigasi kembali */}
                      <Button 
                        type="text" 
                        icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />} 
                        onClick={() => router.push('/admin/permohonan')}
                      />

                      <Title level={3} style={{ margin: 0 }}>Detail Permohonan</Title>
                      <Badge status={statusInfo.status} text={statusInfo.text} />
                    </Space>
                      <Space>
                      <Button 
                        type="primary" 
                        style={{ 
                          backgroundColor: currentPermohonan.status === "dalamproses"  ? "#d9d9d9" : "#52c41a", 
                          color: "#fff", 
                          cursor: currentPermohonan.status === "dalamproses" ? "not-allowed" : "pointer" 
                        }}
                        onClick={() => updateStatus("disetujui")}
                      >
                        Setuju
                      </Button>
                      <Button 
                        type="primary" 
                        style={{ 
                          backgroundColor: currentPermohonan.status === "belumdisetujui" || currentPermohonan.status === "ditolak" ? "#d9d9d9" : "#060270",
                          color: "#fff",
                          cursor: "not-allowed"
                        }}
                        disabled={currentPermohonan.status === "belumdisetujui" || currentPermohonan.status === "ditolak"}
                        onClick={() => updateStatus("dalamproses")}
                      >
                        Proses Permohonan
                      </Button>
                      <Button 
                        danger
                        style={{ 
                          backgroundColor: currentPermohonan.status === "dalamproses"  ? "#d9d9d9" : "#ff4d4f", 
                          color: "#fff", 
                          cursor: currentPermohonan.status === "dalamproses" ? "not-allowed" : "pointer" 
                        }}
                        disabled={currentPermohonan.status === "dalamproses"}
                        onClick={() => updateStatus("ditolak")}
                      >
                        Tolak
                      </Button>
                      </Space>
                    </div>
                    <Text type="secondary" style={{ display: "block" }}>
                      Dibuat: {formatDate(currentPermohonan.createdat)} • Diperbarui: {formatDate(currentPermohonan.updatedat)}
                    </Text>
                    </Card>
                  
                  <Row gutter={[24, 24]}>
                    {/* Data Diri */}
                    <Col xs={24} lg={12}>
                      <Card 
                        title={<Space><UserOutlined /><span>Data Diri</span></Space>} 
                        hoverable
                        variant = "outlined"
                        style = {{ height: '100%'  ,  width: '100%' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)'}}
                        >
                        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                          <Text type="secondary">Nama Lengkap</Text>
                          <Text strong>{pemohon.nama}</Text>
                          
                          <Row gutter={[16, 16]}>
                            <Col span={12}>
                              <Text type="secondary">Nomor HP</Text>
                              <div><Text>{pemohon.nohp || "-"}</Text></div>
                            </Col>
                            <Col span={12}>
                              <Text type="secondary">NIK</Text>
                              <div><Text>{pemohon.nik || "-"}</Text></div>
                            </Col>
                          </Row>
                          
                          <Row gutter={[16, 16]}>
                            <Col span={12}>
                              <Text type="secondary">NIP/NIM</Text>
                              <div><Text>{pemohon.nipnim || "-"}</Text></div>
                            </Col>
                            <Col span={12}>
                              <Text type="secondary">Program Studi</Text>
                              <div><Text>{pemohon.prodi || "-"}</Text></div>
                            </Col>
                          </Row>
                          
                          <Row gutter={[16, 16]}>
                            <Col span={12}>
                              <Text type="secondary">Jabatan</Text>
                              <div><Text>{pemohon.jabatan || "-"}</Text></div>
                            </Col>
                            <Col span={12}>
                              <Text type="secondary">Pangkat/Golongan</Text>
                              <div><Text>{pemohon.pangkatgol || "-"}</Text></div>
                            </Col>
                          </Row>
                          
                          <Row gutter={[16, 16]}>
                            <Col span={24}>
                              <Text type="secondary">Nomor Paspor</Text>
                              <div><Text>{pemohon.nopaspor || "-"}</Text></div>
                            </Col>
                          </Row>
                        </Space>
                      </Card>
                    </Col>
                    
                    {/* Informasi Permohonan */}
                    <Col xs={24} lg={12}>
                      <Card 
                        title={<Space><GlobalOutlined /><span>Informasi Permohonan</span></Space>}
                        hoverable
                        variant = "outlined"
                        style = {{ height: '100%'  ,  width: '100%' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)'}}
                        >
                        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                          <Row gutter={[16, 16]}>
                            <Col span={12}>
                              <Text type="secondary">Negara Tujuan</Text>
                              <div><Text strong>{currentPermohonan.negaratujuan || "-"}</Text></div>
                            </Col>
                            <Col span={12}>
                              <Text type="secondary">Instansi Tujuan</Text>
                              <div><Text>{currentPermohonan.instansitujuan || "-"}</Text></div>
                            </Col>
                          </Row>
                          
                          <Row gutter={[16, 16]}>
                            <Col span={24}>
                              <Text type="secondary">Keperluan</Text>
                              <div><Text>{currentPermohonan.keperluan || "-"}</Text></div>
                            </Col>
                          </Row>
                          
                          <Row gutter={[16, 16]}>
                            <Col span={12}>
                              <Text type="secondary">Tanggal Mulai</Text>
                              <div><Text>{formatDate(currentPermohonan.tglmulai)}</Text></div>
                            </Col>
                            <Col span={12}>
                              <Text type="secondary">Tanggal Selesai</Text>
                              <div><Text>{formatDate(currentPermohonan.tglselesai)}</Text></div>
                            </Col>
                          </Row>
                          
                          <Row gutter={[16, 16]}>
                            <Col span={12}>
                              <Text type="secondary">Sumber Biaya</Text>
                              <div><Text>{currentPermohonan.biaya || "-"}</Text></div>
                            </Col>
                          </Row>
                          
                          <Row gutter={[16, 16]}>
                            <Col span={24}>
                              <Text type="secondary">Rencana Kegiatan</Text>
                              <div><Text>{currentPermohonan.rencana || "-"}</Text></div>
                            </Col>
                          </Row>
                        </Space>
                      </Card>
                    </Col>
                    
                    {/* Dokumen Upload */}
                    <Col span={24}>
                      <Card
                       title={<Space><FileOutlined /><span>Dokumen Permohonan</span></Space>}
                       hoverable
                       variant = "outlined"
                       style = {{ height: '100%'  ,  width: '100%' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)'}}
                       >
                        <List
                          grid={{ gutter: 16, column: 3 }}
                          dataSource={[
                            { title: "Undangan dari Luar Negeri", url: currentPermohonan.undangan, bucket: "undangan-bucket" },
                            { title: "Jadwal Agenda", url: currentPermohonan.agenda, bucket: "agenda-bucket" },
                            { title: "Kerangka Acuan / TOR", url: currentPermohonan.tor, bucket: "tor-bucket" },
                          ]}
                          renderItem={(item) => (
                            <List.Item>
                              <Card hoverable size="small" 
                               onClick={async () => {
                                if (item.url) {
                                  const url = await getPresignedUrl(item.bucket, item.url.split("/").pop());
                                  if (url) window.open(url, "_blank");
                                }
                              }}
                            >
                                <Card.Meta 
                                  avatar={<DownloadOutlined />} 
                                  title={item.title} 
                                  description={item.url ? "Klik untuk mengunduh" : "Tidak ada file"} 
                                />
                              </Card>
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>
                    
                    {/* Dokumen Identitas */}
                    <Col span={24}>
                      <Card
                       title={<Space><FileOutlined /><span>Dokumen Identitas</span></Space>}
                       hoverable
                       variant = "outlined"
                       style = {{ height: '100%'  ,  width: '100%' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)'}}
                       >
                        <List
                          grid={{ gutter: 16, column: 3 }}
                          dataSource={[
                            { title: "File KTP", url: pemohon.filektp, bucket: "ktp-bucket" },
                            { title: "File Kartu Pegawai", url: pemohon.filekarpeg, bucket: "karpeg-bucket" },
                          ]}
                          renderItem={(item) => (
                            <List.Item>
                              <Card hoverable size="small" 
                             onClick={async () => {
                              if (item.url) {
                                const url = await getPresignedUrl(item.bucket, item.url.split("/").pop());
                                if (url) window.open(url, "_blank");
                              }
                            }}>
                                <Card.Meta 
                                  avatar={<DownloadOutlined />} 
                                  title={item.title} 
                                  description={item.url ? "Klik untuk mengunduh" : "Tidak ada file"} 
                                />
                              </Card>
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Space>
              </div>
            </div>
            </>
          );
        };

export default PermohonanDetailPage;
