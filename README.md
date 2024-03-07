# Cloudflare Images Gallery
This is a simple gallery of images using Cloudflare Images and Next.js React Server Components.

## Features
- [x] Copy `imagedelivery` URL to clipboard
- [x] Variant Support
- [x] Mobile Responsive


> [!IMPORTANT]
> You need to have a Cloudflare account with a paid Images subscription to use this project.

## How to use
1. Fork this repository
2. Go to Cloudflare Pages or Vercel and deploy the repository, use the Next.js Framework Preset
3. Add the `CF_API_TOKEN`(from the "Read and Write Cloudflare Images and Stream" [token template](https://dash.cloudflare.com/?to=/profile/api-tokens)) and `CF_ACCOUNT_ID` (Found on [this page](https://dash.cloudflare.com/?to=/:account/images/images)) to your environment variables
4. Deploy!

> [!TIP]
> If you are getting a compatibility error on Cloudflare Pages, go into the project settings tab -> Functions -> Configure Production Compatibility flags and add `nodejs_compat`, then redeploy

## Tech Stack
- [Next.js](https://nextjs.org/)
- [NextUI](https://nextui.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadn/ui](https://ui.shadcn.com/)
- [Sonnar](https://sonner.emilkowal.ski)
- [next-themes](https://github.com/pacocoursey/next-themes)

