import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class Service {
    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteprojectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwritedatabaseID,
                conf.appwritecollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            throw new Error('Error in creating post: ' + error.message);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwritedatabaseID,
                conf.appwritecollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (error) {
            throw new Error('Error in updating post: ' + error.message);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwritedatabaseID,
                conf.appwritecollectionID,
                slug
            );
        } catch (error) {
            throw new Error('Error in deleting post: ' + error.message);
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwritedatabaseID,
                conf.appwritecollectionID,
                slug
            );
        } catch (error) {
            throw new Error('Error in getting post: ' + error.message);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwritedatabaseID,
                conf.appwritecollectionID,
                queries
            );
        } catch (error) {
            throw new Error('Error in getting posts: ' + error.message);
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwritebuckectID,
                ID.unique(),
                file
            );
        } catch (error) {
            throw new Error('Error in uploading file: ' + error.message);
        }
    }

    async deleteFile(fileID) {
        try {
            return await this.bucket.deleteFile(
                conf.appwritebuckectID,
                fileID
            );
        } catch (error) {
            throw new Error('Error in deleting file: ' + error.message);
        }
    }

    getFilePreview(fileID) {
        return this.bucket.getFilePreview(
            conf.appwritebuckectID,
            fileID
        );
    }
}

const service = new Service();

export default service;
