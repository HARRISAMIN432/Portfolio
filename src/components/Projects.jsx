import React from "react";
import {
  ExternalLink,
  Github,
  Home,
  Brain,
  Code2,
  Database,
  FileSpreadsheet,
  Gamepad2,
  Shield,
  Pizza,
} from "lucide-react";

const Projects = () => {
  const getProjectIcon = (title) => {
    const icons = {
      "Real Estate Application": Home,
      "AI Stroke Predictor": Brain,
      "Blog Application": Code2,
      "Database Management System": Database,
      "Mini Excel": FileSpreadsheet,
      "Solitaire Game": Gamepad2,
      "Firewall Application": Shield,
      "Pizza ordering application": Pizza,
    };
    const IconComponent = icons[title] || Code2;
    return <IconComponent className="w-6 h-6" />;
  };

  const projects = [
    {
      title: "Real Estate Application",
      description:
        "A comprehensive real estate platform built with modern web technologies. Features property listings, search functionality, user authentication, and responsive design for seamless property browsing experience.",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express.js",
        "Tailwindcss",
      ],
      githubUrl: "https://github.com/HARRISAMIN432/Real-Estate-App",
    },
    {
      title: "AI Stroke Predictor",
      description:
        "An AI-powered application that predicts stroke risk using machine learning algorithms. Built with Python and advanced data analysis techniques for healthcare applications.",
      technologies: ["Python", "Machine Learning", "Data Analysis"],
      githubUrl: "https://github.com/HARRISAMIN432/AI-Final-Project",
    },
    {
      title: "Blog Application",
      description:
        "A full-featured AI powered blogging platform with user authentication, post creation, commenting system, and responsive design. Built with modern web technologies for optimal performance.",
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "Gemini"],
      githubUrl: "https://github.com/HARRISAMIN432/Blog-App",
    },
    {
      title: "Database Management System",
      description:
        "A comprehensive database solution showcasing advanced SQL operations, data modeling, and database optimization techniques for efficient data management.",
      technologies: ["C++", "Database Design", "Data Modeling"],
      githubUrl: "https://github.com/HARRISAMIN432/My-Database",
    },
    {
      title: "Mini Excel",
      description:
        "A simplified spreadsheet application with basic Excel functionality. Demonstrates understanding of data structures and user interface design.",
      technologies: ["JavaScript", "HTML", "Tailwindcss", "Data Structures"],
      githubUrl: "https://github.com/TayabAmir/Mini_Excel",
    },
    {
      title: "Solitaire Game",
      description:
        "A classic Solitaire card game implemented in C++. Features drag-and-drop functionality, scoring system, and responsive design for an engaging user experience.",
      technologies: ["C++", "Game Development", "Data Structures", "SFML"],
      githubUrl: "https://gitlab.com/2023-cs-160/csc200m24pid160",
    },
    {
      title: "Firewall Application",
      description:
        "A network security application that monitors and controls incoming and outgoing network traffic based on predetermined security rules. Built with python",
      technologies: ["Python", "Network Security", "Firewall"],
      githubUrl: "https://github.com/kaleemfaryad/InformationSecurity",
    },
    {
      title: "Pizza ordering application",
      description:
        "A frontend application for ordering pizzas online. Built frontend with React",
      technologies: ["React", "tailwindcss"],
      githubUrl: "https://github.com/HARRISAMIN432/Food-Ordering-App",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A showcase of my recent work, featuring web applications and
            software solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-600">
                    {getProjectIcon(project.title)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/HARRISAMIN432"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <span>View All Projects on GitHub</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
