import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useParams , useRouter } from "next/navigation";

const BackButton = ({ path = "/admin/permohonan" }) => {
  const router = useRouter();

  return (
    <Button 
      type="text" 
      icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />} 
      onClick={() => router.push(path)}
    />
  );
};

export default BackButton;
