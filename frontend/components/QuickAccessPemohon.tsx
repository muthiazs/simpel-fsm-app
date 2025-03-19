import { Card, Button, Space, Row, Col, Typography } from "antd";
import { FileAddOutlined, HistoryOutlined, RightOutlined } from "@ant-design/icons";

const { Title } = Typography;

const QuickAccessPemohon = () => {
  return (
    <Col span={24}>
      <Row gutter={[24, 24]} justify="space-between">
        {/* Kartu Ajukan Permohonan */}
        <Col xs={24} sm={12}>
          <Card
            hoverable
            style={{ height: "100%", width: "100%", boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.1)" }}
          >
            <Space direction="vertical" size="middle" align="center" style={{ width: "100%" }}>
              <FileAddOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
              <Title level={4} style={{ margin: 0 }}>Ajukan Permohonan Baru</Title>
              <Button type="primary" icon={<RightOutlined />} href="/pemohon/pengajuan">
                Ajukan Sekarang
              </Button>
            </Space>
          </Card>
        </Col>

        {/* Kartu Riwayat Pengajuan */}
        <Col xs={24} sm={12}>
          <Card
            hoverable
            style={{ height: "100%", width: "100%", boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.1)" }}
          >
            <Space direction="vertical" size="middle" align="center" style={{ width: "100%" }}>
              <HistoryOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
              <Title level={4} style={{ margin: 0 }}>Riwayat Pengajuan</Title>
              <Button type="primary" icon={<RightOutlined />} href="/pemohon/permohonan">
                Lihat Riwayat
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

export default QuickAccessPemohon;
