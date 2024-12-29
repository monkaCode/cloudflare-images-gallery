'use client';
import {Image} from "@nextui-org/image";
import {Card, CardBody, CardFooter} from "@nextui-org/card";
import {toast} from "sonner";
import {useCopyToClipboard} from "@/components/hooks/use-clipboard";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { CfImage, deleteImage } from "@/app/actions/imageActions";
import { UserData } from "@/app/actions/getUserData";
import { useContext } from "react";
import { UserContext } from "@/app/providers/UserProvider";

type Variant = {
    name: string,
    url: string,
}

export function ImageCard({ image }: { image: CfImage}) {
	const user: UserData | undefined = useContext(UserContext);
    const [_, copyToClipboard] = useCopyToClipboard();
    const options: Variant[]  = [{ name: "Copy ID", url: image.id }];
    if (user?.correspondent === 'monka') {
        options.push({ name: "Delete", url: "delete" });
    }

    const handleDelete = async () => {
        try {
            const response = await deleteImage(image.id);
            if (response) {
                toast.success('Image deleted successfully');
            } else {
                toast.error('Failed to delete image');
            }
        } catch (error) {
            console.error('Failed to delete image:', error);
        }
    }

    let dropdownItems = options.map((option, index) => {
        return (
            <DropdownItem 
                key={index} 
                onPress={() => {
                    if (option.url === 'delte') {
                        handleDelete();
                    } else {
                        copyToClipboard(option.url).then(success => {
                            if (success) {
                                toast.success("URL copied to clipboard");
                            } else {
                                toast.error("Failed to copy variant URL to clipboard");
                            }
                        });
                    }
                }}
            >
                {option.name}
            </DropdownItem>
        );
    });

    return (
        <Dropdown>
            <DropdownTrigger>
                <Card shadow={'lg'} isPressable isHoverable isBlurred>
                    <CardBody className="overflow-visible p-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={image.name}
                            className="w-full object-cover h-[140px]"
                            src={image.variants[0]}
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>{image.name}</b>
                    </CardFooter>
                </Card>
            </DropdownTrigger>
            <DropdownMenu aria-label="Variants" items={options}>
                {dropdownItems}
            </DropdownMenu>
        </Dropdown>
    )
}
