import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Products } from "./collections/Products";
import { Users } from "./collections/Users";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Users, Products, Media, Pages],
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: { connectionString: process.env.PAYLOAD_DATABASE_URL || "" },
  }),
  plugins: [
    s3Storage({
      clientUploads: true,
      collections: {
        media: {},
      },
      bucket: process.env.S3_BUCKET || "",
      acl: "public-read",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "",
        endpoint: process.env.S3_ENDPOINT || "",
        forcePathStyle: true,
      },
    }),
  ],
  sharp,
});
