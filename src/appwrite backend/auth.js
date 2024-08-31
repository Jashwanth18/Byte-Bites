import { Client, Account, ID } from "appwrite";
import config from "../config/config";

class AuthService {
  client;
  account;
  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteApiEndpoint)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ emailId, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        emailId,
        password,
        name
      );
      if (user) {
        this.login(emailId, password);
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ emailId, password }) {
    try {
      return await this.account.createEmailPasswordSession(emailId, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();
export default authService;
