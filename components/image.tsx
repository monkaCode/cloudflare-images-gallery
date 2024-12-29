'use client';
import {Image} from "@nextui-org/image";
import {Card, CardBody, CardFooter} from "@nextui-org/card";
import {toast} from "sonner";
import {useCopyToClipboard} from "@/components/hooks/use-clipboard";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from "@nextui-org/dropdown";

export function ImageCard({ url, alt, name, variants }: { url: string, alt: string, name: string, variants: string[]}) {

    const [copiedText, copyToClipboard] = useCopyToClipboard();
    let updatedVariants = [
        { name: "Copy ID", url: variants[0].split('/')[4] },
        { name: "dynamic", url: variants[0].replace('/public', '') },
        ...variants,
    ];

    let variantItems = updatedVariants.map((variant, index) => {
        const isDynamic = typeof variant === "object";
        const variantLabel = isDynamic ? variant.name : String(variant).split('/').pop();
        const variantUrl = isDynamic ? variant.url : variant;
    
        return (
            <DropdownItem 
                key={index} 
                onPress={() => copyToClipboard(variantUrl).then(success => {
                    if (success) {
                        toast.success("URL copied to clipboard");
                    } else {
                        toast.error("Failed to copy variant URL to clipboard");
                    }
                })}
            >
                {variantLabel}
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
                            alt={alt}
                            className="w-full object-cover h-[140px]"
                            src={url}
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>{name}</b>
                    </CardFooter>
                </Card>
            </DropdownTrigger>
            <DropdownMenu aria-label="Variants" items={variants}>
                {...variantItems}
            </DropdownMenu>
        </Dropdown>

    )
}
