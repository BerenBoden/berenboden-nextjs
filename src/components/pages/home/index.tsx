import React from "react";
import HeroSection from "./HeroSection";
import Showcase from "./Showcase";
import { Resources } from "@/types";

export default function Home({ data }: Resources) {
  return (
    <>
      <HeroSection />
      <div className="my-12">
        <Showcase data={data.projects.data} title={"projects"} />
      </div>
      <div className="my-12">
        <Showcase data={data.certifications.data} title={"certifications"} />
      </div>
      <div className="my-12">
        <Showcase data={data.articles.data} title={"articles"} />
      </div>
    </>
  );
}
