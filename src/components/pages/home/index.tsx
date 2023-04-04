import React from "react";
import HeroSection from "./HeroSection";
import Showcase from "./Showcase";
import { posts } from "@/db/dummyData";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Showcase posts={posts} title={"Projects"} />
      <Showcase posts={posts} title={"Certifications"} />
      <Showcase posts={posts} title={"Articles"} />
    </>
  );
}
