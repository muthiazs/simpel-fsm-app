"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, Space, Row, Col, Typography, List, Badge, message , Button } from "antd";
import { UserOutlined, GlobalOutlined, FileOutlined, DownloadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Menu from "../../../../../components/Menu";
import Link from "antd/es/typography/Link";
import GenerateDocument from '../../../../../components/document';
import DocumentList from "../../../../../components/listDokumen";
import BackButton from "../../../../../components/BackButton";

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
    surat: string;
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
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken || !id) {
      message.error("Token atau ID permohonan tidak ditemukan!");
      return;
    }

    const fetchPermohonanDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/permohonan/${id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        console.log("data yang diterima : ", response.data);

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
  dalamproses: { text: 'Dalam Proses', status: 'warning' },
  selesai: { text: 'Selesai', status: 'success' }
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
                    {currentPermohonan.status === "dalamproses" && (
                      <div style={{ 
                        backgroundColor: '#fffbe6', 
                        border: '1px solid #ffe58f', 
                        padding: '12px', 
                        borderRadius: '4px', 
                        marginBottom: '16px',
                        width: '100%'
                      }}>
                        <Text strong style={{ color: '#faad14' }}>
                          ⚠️ Pemberitahuan :  
                        </Text>
                        <Text>
                          Pemohon diharapkan untuk melakukan tanda tangan dokumen permohonan PDLN di bagian kerjasama gedung AP lantai 2, dan diharapkan untuk membawa materai 10.000 sebanyak 1 buah.
                        </Text>
                        <Text>
                         Apabila ada yang perlu ditanyakan bisa menghubungi 085875096508(Muthia)
                        </Text>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <Space align="center" size="middle" style={{ display: 'flex', alignItems: 'center' }}>
                      {/* Gunakan button untuk navigasi kembali */}
                      <BackButton path="/pemohon/permohonan" />

      
                      <Title level={3} style={{ margin: 0 }}>Detail Permohonan</Title>
                      <Badge status={statusInfo.status} text={statusInfo.text} />
                    </Space>
                    <Space>
                    {currentPermohonan.status === "dalamproses" && (
                        <div className="flex flex-wrap justify-end mb-4">
                          <GenerateDocument permohonanId={id} />
                        </div>
                      )}
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
                  <DocumentList
                          title="Dokumen Permohonan"
                          dataSource={[
                            { title: "Undangan dari Luar Negeri", url: currentPermohonan.undangan, bucket: "undangan-bucket" },
                            { title: "Jadwal Agenda", url: currentPermohonan.agenda, bucket: "agenda-bucket" },
                            { title: "Kerangka Acuan / TOR", url: currentPermohonan.tor, bucket: "tor-bucket" },
                          ]}
                          grid={{ gutter: 16, column: 3 }}
                        />
                    </Col>

                                
                    {/* Dokumen Identitas */}
                    <Col span={24}>
                    <DocumentList
                          title="Dokumen Identitas"
                          dataSource={[
                            { title: "File KTP", url: pemohon.filektp, bucket: "ktp-bucket" },
                            { title: "File Kartu Pegawai", url: pemohon.filekarpeg, bucket: "karpeg-bucket" },
                          ]}
                          grid={{ gutter: 16, column: 3 }}
                        />
                    </Col>
                    {/* Dokumen Identitas */}
                    <Col span={24}>
                    <DocumentList
                          title="File Dokumen Final"
                          dataSource={[
                            { title: "File Dokumen yang sudah di tanda tangan", url: currentPermohonan.surat, bucket: "surat-bucket" },
                            { title: "File Laporan", url: currentPermohonan.laporan, bucket: "laporan-bucket" },
                          ]}
                          grid={{ gutter: 16, column: 3 }}
                        />
                    </Col>
                        </Row>
                </Space>
              </div>
            </div>
    </>
  );
};

export default PermohonanDetailPage;