'use client';
import { CfImage, getImages } from "@/app/actions/getImages";
import {ImageCard} from "@/components/image";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

export default function ImageList() {
    const [images, setImages] = useState<CfImage[]>([]);
    const [loading, setLoading] = useState(true);

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

    return (
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
                images?.map((image: CfImage) => (
                    <ImageCard
                        key={image.id}
                        url={image.variants[0]}
                        alt={image.id}
                        name={image.filename}
                        variants={image.variants}
                    />
                ))
            )}
        </div>
    );

}
