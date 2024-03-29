const dotenv = require("dotenv");

let ENV_FILE_NAME = ".env";

// switch (process.env.NODE_ENV) {
//   case "production":
//     ENV_FILE_NAME = ".env.production";
//     break;
//   case "staging":
//     ENV_FILE_NAME = ".env.staging";
//     break;
//   case "test":
//     ENV_FILE_NAME = ".env.test";
//     break;
//   case "development":
//   default:
//     ENV_FILE_NAME = ".env";
//     break;
// }

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
  console.log(process.env)
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "/vercel\\.app$/";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "/vercel\\.app$/";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
{    resolve: `medusa-file-cloudinary`,
    options: {
        cloud_name: process.env.YOUR_CLOUD_NAME,
        api_key: process.env.YOUR_API_KEY,
        api_secret: process.env.YOUR_API_SECRET,
        secure: true,
root_folder: "products"
    },
},
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  /*{
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
      backend_url: process.env.MEDUSA_BACKEND_URL,
    },
  },*/
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  database_url: DATABASE_URL,
  store_cors:  STORE_CORS,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
