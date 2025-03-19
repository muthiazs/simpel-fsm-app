import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: "center", padding: "16px 50px", backgroundColor: "#f0f2f5" }}>
      <Text type="secondary">© {new Date().getFullYear()} Sistem PDLN | All Rights Reserved</Text>
    </Footer>
  );
};

export default AppFooter;
