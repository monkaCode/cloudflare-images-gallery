'use server';
import dotenv from 'dotenv';

export type CfImage = {
    id: string,
    name?: string,
    filename: string,
    uploaded: string,
    requireSignedURLs: boolean,
    variants: string[],
    meta?: any,
}

dotenv.config();

export async function getImages(): Promise<CfImage[]> {
    try {
        const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v1`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.CF_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        });
        
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
    
        const data = await res.json();
        return data.result.images;
    } catch (error) {
        console.error('Failed to fetch images:', error);
        return [];
    }
}

export async function uploadImage(url: string, name: string): Promise<CfImage | undefined> {
    try {
        const formData = new FormData();
        formData.append('url', url);
        formData.append('metadata', JSON.stringify({ name }));
        formData.append('requireSignedURLs', 'false');
        const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v1`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.CF_API_TOKEN}`,
            },
            body: formData,
        });
        
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
    
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch images:', error);
    }
}

export async function deleteImage(id: string): Promise<CfImage[]> {
    try {
        const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v1/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${process.env.CF_API_TOKEN}`,
            },
        });
        
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
    
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch images:', error);
        return [];
    }
}