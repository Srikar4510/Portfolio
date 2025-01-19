import React from "react";
import Vihari from "../assets/Vihari.png";
import CodeIt from "../assets/Code It.png";
import ImageSearch from '../assets/ImageSearch.png'
import AnimalsApp from '../assets/AnimalsApp.png'
import DailyTools from "../assets/DailyTools.png";
import Learnify from '../assets/Learnify.png'
import BookListApplication from '../assets/BookListApplication.png'
import Footer from "./Footer";
import Background from "./Background";

const ProjectCard = ({
  title,
  description,
  techStack,
  repoLink,
  liveLink,
  image,
}) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white m-4 transform transition duration-500 hover:scale-105 hover:shadow-xl  hover:shadow-gray-500/50">
      <img
        className="w-full h-50 object-cover rounded-t-lg"
        src={image}
        alt={title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-400 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <a
          href={repoLink}
          rel="noreferrer"
          target="_blank"
          className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          <i className="fab fa-github mr-2"></i>View Repo
        </a>
        <a
          href={liveLink}
          rel="noreferrer"
          target="_blank"
          className="flex items-center bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          <i className="fas fa-arrow-right mr-2"></i>Live Demo
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <Background>
      <div className="py-12 mt-8">
        <h2 className="text-white text-4xl sm:text-5xl text-center font-extrabold mt-2 pt-4 pb-4">
          My Projects
        </h2>
        <div className="flex flex-wrap justify-center">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              repoLink={project.repoLink}
              liveLink={project.liveLink}
              image={project.image}
            />
          ))}
        </div>
      </div>
      <Footer />
    </Background>
  );
};

const projects = [
  {
    title: "Vihari - Travel and Tour Platform",
    description:
      "Developed a travel and tour platform with secure authentication for users to book buses and tours, while providing agents tools for managing buses, tours, and tour places. Admins can oversee users and agents, approve/reject requests, and communicate via email notifications. Role-based access control and modern state management ensure seamless operations.",
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    repoLink: "https://github.com/Srikar4510/VIHARI-MERN",
    liveLink: "https://viharifinal-client.vercel.app/",
    image: Vihari,
  },
  {
    title: "CodeIt - Search Engine for Coding Problems",
    description:
      "Developed a high-performance search engine to help users find coding problems from platforms like LeetCode, Codeforces, and InterviewBit. Integrated advanced NLP techniques, BM25 ranking, and custom scoring metrics to optimize search relevance and accuracy. Designed a user-friendly interface for efficient query processing and result display.",
    techStack: ["Express.js", "Node.js", "EJS", "NLP", "Information Retrieval", "Selenium"],
    repoLink: "https://github.com/Srikar4510/Codeit",
    liveLink: "https://codeit-ygfq.onrender.com/",
    image: CodeIt,
  },
  {
    title: "Learnify",
    description:
      "Learnify is Node.js web application using EJS template engine features OAuth 2.0 authentication for secure Google sign-ins. It includes Creator and Student roles, enabling Creators to upload and post videos while Students can view them also supports infinite threaded comments and utilizes AWS S3 and CDN for efficient media storage and delivery.",
    techStack: ["Node.js", "EJS","MongoDB"],
    repoLink: "https://github.com/Srikar4510/Learnify",
    liveLink: "https://learnify-n5gh.onrender.com/",
    image: Learnify,
  },
  
  {
    title: "Daily Tools",
    description:
      "Developed a web application providing daily utilities, including a Twitter video downloader. Implemented RESTful APIs for seamless data retrieval and ensured a responsive design for optimal user experience across devices.",
    techStack: ["Node.js", "Express.js", "React.js", "REST API", "CSS", "HTML"],
    repoLink: "https://github.com/Srikar4510/daily-tools",
    liveLink: "https://daily-tools-vrv1.onrender.com/api/twitter/download",
    image: DailyTools,
  },
  
  {
    title: "BookList Application",
    description:
      "Developed a simple BookList application using React.js, enabling users to add, edit, and delete books from a list. Implemented a JSON server to simulate a backend API for persistent storage, providing a seamless experience for managing book records.",
    techStack: ["React.js", "JSON Server", "JavaScript", "HTML", "CSS"],
    repoLink: "https://github.com/Srikar4510/BookListApplication",
    liveLink: "https://stackblitz.com/edit/vitejs-vite-ciugny",
    image: BookListApplication,
  },
  {
    title: "ImageSearch Web Application",
    description:
      "Developed a responsive web application that allows users to search for images using the Unsplash API. Implemented with React.js and Axios, the application provides a clean and minimalistic user interface for seamless image exploration.",
    techStack: ["React.js", "Axios", "Unsplash API", "HTML", "CSS"],
    repoLink: "https://github.com/Srikar4510/ImageSearch",
    liveLink: "https://stackblitz.com/edit/vitejs-vite-zem7by",
    image: ImageSearch,
  },
  
  {
    title: "AnimalsApp",
    description:
      "Developed a React application that displays random animals with interactive heart icons. Users can add new animals, and clicking on an animal increases the size of its heart icon, indicating affection. This project demonstrates state management and event handling in React.",
    techStack: ["React.js", "JavaScript", "HTML", "CSS"],
    repoLink: "https://github.com/Srikar4510/AnimalsApp",
    liveLink: "https://stackblitz.com/edit/vitejs-vite-6mjwvz",
    image: AnimalsApp,
  }
  
];

export default Projects;
