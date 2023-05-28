import Head from "next/head";
import Index from "@/components/pages/home";

export default function Home() {
  return (
    <>
      <Head>
        <title>Beren Boden - IT & Security</title>
        <meta
          name="IT & Security"
          content="Beren Boden - IT & Security"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Index />
    </>
  );
}
