// File: ui/src/services/apiService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    repoUrl: string;
    liveUrl: string;
}

export const getProjects = async (): Promise<Project[]> => {
    const response = await apiClient.get('/projects');
    return response.data;
};