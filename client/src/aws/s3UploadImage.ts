// S3Upload.ts

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

interface UploadParams {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
}

export const uploadFileToS3 = async (
  file: File,
  params: UploadParams,
  onSuccess: (url: string) => void,
  onError: (error: any) => void
) => {
  const { region, accessKeyId, secretAccessKey, bucket } = params;
  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const uploadParams = {
    Bucket: bucket,
    Key: `avatars/${file.name}`,
    Body: file,
    ContentType: file.type,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    const data = await s3Client.send(command);

    if (data.$metadata.httpStatusCode === 200) {
      const url = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
      onSuccess(url);
    } else {
      onError("Failed to upload file");
    }
  } catch (error) {
    onError(error);
  }
};
