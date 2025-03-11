import * as Minio from "minio";

const MinioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "minioadmin", 
  secretKey: "minioadmin",
});

export default MinioClient; 