'use client';
import { Navbar } from "@/components/globalnav/navbar";
import ImageList from "@/components/rsc/imagelist";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar title={"Valolytics Images"} icon={"https://imagedelivery.net/WUSOKAY-iA_QQPngCXgUJg/e30fb45b-1f85-4cae-5b52-9c733d0c8f00/w=40"} setSearch={setSearch}/>
      <main className="container mx-auto my-auto max-w-7xl pt-16 px-6 flex-grow mb-5">
        <ImageList search={search} />
      </main>
    </main>
  );
}
