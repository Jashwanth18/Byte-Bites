const config = {
  appwriteApiEndpoint: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID),
  tmceApiKey: String(import.meta.env.TMCE_API_KEY),
};

export default config;
