'use client';
import { CfImage, getImages } from "@/app/actions/imageActions";
import {ImageCard} from "@/components/image";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

export default function ImageList({search}: {search: string}) {
    const [images, setImages] = useState<CfImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const fetchedImages = await getImages();
                setImages(fetchedImages);
            } catch (error) {
                console.error("Failed to fetch images:", error);
            }
            setLoading(false);
        };

        fetchImages();
    }, []);

    return (<>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {loading ? (
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <ColorRing
                        visible={true}
                        height={50}
                        width={50}
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={["#ff3e55", "#944eb4", "#405cff", "#944eb4", "#ff3e55"]}
                    />
                    <span style={{ color: 'white' }}>Loading</span>
              </div>
            ) : (
                images?.map((image) => { return {...image, name: image.meta?.name ?? image.filename.split('.')[0].replace('_', ' ')} }).filter((img) => {
                    return img.name.toLowerCase().includes(search.toLowerCase())
                }).slice((page-1)*50, page*50).map((image: CfImage) => (
                    <ImageCard key={image.id} image={image} />
                ))
            )}
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "end", width: '100%', alignContent: 'center', position: 'fixed', bottom: 10, right: 10 }}>
            <button
                onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <button
                onClick={() => setPage((prevPage) => prevPage + 1)}
                disabled={images.length < 50}
                className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    </>);
}
