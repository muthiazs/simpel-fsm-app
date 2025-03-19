import { Card, Button, Space, Row, Col, Typography } from "antd";
import { FileDoneOutlined, FileTextOutlined, UserOutlined, RightOutlined } from "@ant-design/icons";

const { Title } = Typography;

const QuickAccessAdmin = () => {
  return (
    <Col span={24}>
      <Row gutter={[24, 24]} justify="space-between">
        {/* Kartu Permohonan PDLN */}
        <Col xs={24} sm={8}>
          <Card
            hoverable
            style={{ height: "100%", width: "100%", boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.1)" }}
          >
            <Space direction="vertical" size="middle" align="center" style={{ width: "100%" }}>
              <FileDoneOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
              <Title level={4} style={{ margin: 0 }}>Permohonan PDLN</Title>
              <Button type="primary" icon={<RightOutlined />} href="/admin/permohonan">
                Kelola Permohonan
              </Button>
            </Space>
          </Card>
        </Col>

        {/* Kartu Laporan */}
        <Col xs={24} sm={8}>
          <Card
            hoverable
            style={{ height: "100%", width: "100%", boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.1)" }}
          >
            <Space direction="vertical" size="middle" align="center" style={{ width: "100%" }}>
              <FileTextOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
              <Title level={4} style={{ margin: 0 }}>Laporan</Title>
              <Button type="primary" icon={<RightOutlined />} href="/admin/laporan">
                Lihat Laporan
              </Button>
            </Space>
          </Card>
        </Col>

        {/* Kartu Kelola Pengguna */}
        <Col xs={24} sm={8}>
          <Card
            hoverable
            style={{ height: "100%", width: "100%", boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.1)" }}
          >
            <Space direction="vertical" size="middle" align="center" style={{ width: "100%" }}>
              <UserOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
              <Title level={4} style={{ margin: 0 }}>Kelola Pengguna</Title>
              <Button type="primary" icon={<RightOutlined />} href="/admin/users">
                Kelola Sekarang
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

export default QuickAccessAdmin;
