import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteprojectID);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            }
            throw new Error('Failed to create account');
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }
  
    
    
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw new Error('Failed to get current user');
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw new Error('Failed to logout');
        }
    }
}

const authService = new AuthService();

export default authService;
