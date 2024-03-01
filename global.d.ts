import { MongoClient } from "mongodb";

// declare global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       NODE_ENV: 'development' | 'production';
//     }
//   }
// }

// export {};

declare global {
  namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient>;
    }
  }
}

export {};
