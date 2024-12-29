"use client";
import { Navbar as NextUINavbar, NavbarContent, NavbarBrand } from "@nextui-org/navbar";
import NextLink from "next/link";
import { ThemeSwitch } from "./theme-switch";
import { useContext, useState } from "react";
import { uploadImage } from "@/app/actions/imageActions";
import { ColorRing } from "react-loader-spinner";
import { UserData } from "@/app/actions/getUserData";
import { UserContext } from "@/app/providers/UserProvider";
import { Input, ModalBody } from "@nextui-org/react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { toast } from "sonner";

export const Navbar = ({title, icon, link, setSearch}: {title: string; icon?: React.ReactNode | string; link?: string; setSearch: (search: string) => void;}) => {
	const user: UserData | undefined = useContext(UserContext);
    const [imageUrl, setImageUrl] = useState<string>('');
	const [imageName, setImageName] = useState<string>('');
    const [uploadStatus, setUploadStatus] = useState<string>('');
	const [uploading, setUploading] = useState<boolean>(false);
	const {isOpen, onOpen, onOpenChange} = useDisclosure();

	const handleUpload = async () => {
		try {
			setUploading(true);
			const image = await uploadImage(imageUrl, imageName);
			if (image) {
				setUploading(false);
				toast.success('Image uploaded successfully');
			} else {
				setUploading(false);
				toast.error('Failed to upload image');
			}
		} catch (error) {
			console.error('Failed to upload image:', error);
			setUploadStatus('Failed to upload image');
		}
	}

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href={link ?? '/'}>
						{icon && (typeof icon === 'string' ? (<img src={icon} alt={`${title} logo`} />) : (icon))}
						<p className="font-bold text-inherit">{title}</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="end">
				{(user?.correspondent || process.env.NODE_ENV === 'development') && <>
					<Button onPress={onOpen} variant="bordered" style={{padding: 0, margin: 0}}><FaPlus /></Button>
					<Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">Add new Image</ModalHeader>
									<ModalBody>
										<Input label="Image Name" variant="bordered" onChange={(e) => setImageName(e.target.value)} />
										<Input label="URL" variant="bordered" onChange={(e) => setImageUrl(e.target.value)} />
									</ModalBody>
									<ModalFooter>
										<Button color="danger" variant="flat" onPress={onClose}>
											Close
										</Button>
										<Button color="primary" onPress={() => {
											handleUpload();
											onClose();
										}}>
											Add
										</Button>
										{uploading && <ColorRing
											visible={true}
											height={25}
											width={25}
											ariaLabel="color-ring-loading"
											wrapperStyle={{}}
											wrapperClass="color-ring-wrapper"
											colors={["#ff3e55", "#944eb4", "#405cff", "#944eb4", "#ff3e55"]}
										/>}
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</>}
				<Input label="Search" type="text" variant="bordered" className="max-w-xs" startContent={<FaSearch color="#999" />} onChange={(e) => setSearch(e.target.value)} />
				<ThemeSwitch />
			</NavbarContent>
		</NextUINavbar>
	);
};
