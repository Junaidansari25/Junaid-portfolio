"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: " Portfolio Website",
    description: "I built my portfolio site with Next.js and Tailwind CSS, creating a fast, and mobile-responsive platform to showcase my projects.",
    image: "/images/projects/1.png",
    tag: ["All"],
    // gitUrl: "/",
    // previewUrl: "/",
  },
  {
    id: 2,
    title: "IND.Travel website",
    description: "this website is design for tour and Travel service in India this website is developed just to show my skill in web development the copyright of all images and videos belong to their respective owners.",
    image: "/images/projects/2.png",
    tag: ["All"],
    gitUrl: "https://github.com/Junaidansari25/Travel" ,
    previewUrl: "https://vermillion-malasada-571b20.netlify.app/",
  },
  {
    id: 3,
    title: "Leads Dashboard",
    description: "Dashboard: it collects incoming leads, displays them in a sortable table, and lets managers assign each lead to team members with a single click",
    image: "/images/projects/3.png",
    tag: ["All"],
    // gitUrl: "/",
    // previewUrl: "/",
  },
  {
    id: 4,
    title: "iEducation website",
    description: "This website is design for online education service this website is developed just to show my skill in web development the copyright of all Logo and images belong to their respective owners.",
    image: "/images/projects/4.png",
    tag: ["All"],
    gitUrl: "https://6592d1e38522cbcc3e701370--vocal-cajeta-a7e2a5.netlify.app/",
    previewUrl: "https://github.com/Junaidansari25/Ieducation",
  },
  {
    id: 5,
    title: "Auto Text Removal & Translation",
    description: "AI tool on a laptop that removes Chinese text from an image and replaces it with English translation, displayed side-by-side in a clean UI format.",
    image: "/images/projects/5.png",
    tag: ["All"],
    // gitUrl: "/",
    // previewUrl: "/",
  },
  {
    id: 6,
    title: "Fabric Defect Detection",
    description: "Fabric Defect detection is a model that tells which type defect is there in the fabric.",
    image: "/images/projects/6.png",
    tag: ["All"],
    // gitUrl: "/",
    // previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        {/* <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        /> */}
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
