
// create types for this json called CfImage:
import {ImageCard} from "@/components/image";
import {Card, CardFooter, CardHeader} from "@nextui-org/card";
import {Code} from "@nextui-org/code";

type CfImage = {
    id: string,
    filename: string,
    uploaded: string,
    requireSignedURLs: boolean,
    variants: string[]
}



export default async function ImageList() {

    if (!process.env.CF_API_TOKEN || !process.env.CF_ACCOUNT_ID) {
        return (
            <Card>
                <CardHeader>
                    <b>Missing Cloudflare API Token or Account ID</b>

                </CardHeader>
                <CardFooter>
                    Please set the <Code color={'danger'} className={'pl-1'}>CF_API_TOKEN</Code> & <Code color={'danger'}>CF_ACCOUNT_ID</Code> environment variables
                </CardFooter>
            </Card>
        )

    }


    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CF_API_TOKEN}`},
        next: { revalidate: 60 }
    };

    //let res = await fetch('https://api.cloudflare.com/client/v4/accounts/46560285c6da2e4dbfb619ffea59e297/images/v1', options)
    let res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v1`, options)

    let data = await res.json()


    let images = data.result.images

    let imageList = images.map((image: CfImage) => {
        //console.log(image)
        return (
            <ImageCard key={image.id} url={image.variants[0]} alt={image.id} name={image.filename} variants={image.variants} />
        )
    })


    return (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {imageList}
        </div>
    )

}
