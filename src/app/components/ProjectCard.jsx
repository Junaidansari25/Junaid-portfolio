import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  // Determine if we need to show the overlay at all
  const hasLinks = gitUrl || previewUrl;

  return (
    <div className="rounded-xl overflow-hidden bg-[#181818]">
      <div
        className="h-52 md:h-72 relative group bg-center bg-cover"
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        {hasLinks && (
          <div className="overlay absolute inset-0 flex items-center justify-center bg-[#181818] bg-opacity-0 group-hover:bg-opacity-80 transition duration-500">
            {gitUrl && (
              <Link
                href={gitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 w-14 mr-2 flex items-center justify-center border-2 rounded-full border-[#ADB7BE] hover:border-white"
              >
                <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] group-hover:text-white" />
              </Link>
            )}
            {previewUrl && (
              <Link
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 w-14 flex items-center justify-center border-2 rounded-full border-[#ADB7BE] hover:border-white"
              >
                <EyeIcon className="h-10 w-10 text-[#ADB7BE] group-hover:text-white" />
              </Link>
            )}
          </div>
        )}
      </div>
      <div className="p-4">
        <h5 className="text-xl font-semibold text-white mb-2">{title}</h5>
        <p className="text-[#ADB7BE] text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
