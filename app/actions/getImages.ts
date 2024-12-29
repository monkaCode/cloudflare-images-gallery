'use server';

export type CfImage = {
    id: string,
    filename: string,
    uploaded: string,
    requireSignedURLs: boolean,
    variants: string[]
}

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