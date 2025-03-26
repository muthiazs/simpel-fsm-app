import React from "react";
import { Spin } from "antd"; // Import Spin dari Ant Design

const Loading: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      {/* Gunakan komponen Spin dari Ant Design */}
      <Spin size="large" />
    </div>
  );
};

export default Loading;