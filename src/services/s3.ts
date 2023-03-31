import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const REACT_APP_AWS_ACCESS_KEY_ID =
  process.env.REACT_APP_AWS_ACCESS_KEY_ID || "";
const REACT_APP_AWS_SECRET_ACCESS_KEY =
  process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || "";
const REACT_APP_AWS_REGION = process.env.REACT_APP_AWS_REGION || "";
const REACT_APP_S3_BUCKET_WELLET = process.env.REACT_APP_S3_BUCKET_WELLET || "";

// Replace REGION with the appropriate AWS Region, such as 'us-east-1'.
const region = REACT_APP_AWS_REGION;
const s3client = new S3Client({
  region,
  credentials: {
    accessKeyId: REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

export const listS3Files = async ({ Prefix }: { Prefix?: string }) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: REACT_APP_S3_BUCKET_WELLET,
      Prefix,
      Delimiter: "/",
    });
    const listObjects = await s3client.send(command);
    return listObjects;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
