import { Client, Storage, ID, Databases, Query } from "appwrite";
import config from "../config/config";

class Service {
  client;
  database;
  storage;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteApiEndpoint)
      .setProject(config.appwriteProjectId);

    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createArticle({ title, slug, content, image, status, userId }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updateArticle(slug, { title, content, image, status }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteArticle(slug) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getArticle(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getArticles(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const service = new Service();
export default service;
