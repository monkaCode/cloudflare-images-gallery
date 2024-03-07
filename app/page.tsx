import Image from "next/image";
import ImageList from "@/components/rsc/imagelist";

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
            <ImageList />
    </main>
  );
}
