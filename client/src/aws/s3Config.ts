export const s3Config = {
  bucketName: import.meta.env.VITE_S3_BUCKET,
  region: import.meta.env.VITE_S3_REGION,
  accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
  dirName: "avatars",
};

