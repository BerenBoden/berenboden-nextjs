import Head from "next/head";
import Index from "@/components/pages/home";

export default function Home() {
  return (
    <>
      <Head>
        <title>Beren Boden - Full Stack Developer</title>
        <meta
          name="Full Stack Developer"
          content="Beren Boden - Full Stack Developer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Index />
    </>
  );
}
