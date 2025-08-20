import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Real Estate Application",
      description: "A comprehensive real estate platform built with modern web technologies. Features property listings, search functionality, user authentication, and responsive design for seamless property browsing experience.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
      technologies: ["React", "Node.js", "MongoDB", "Express.js", "Tailwindcss"],
      githubUrl: "https://github.com/HARRISAMIN432/Real-Estate-App"
    },
    {
      title: "AI Stroke Predictor",
      description: "An AI-powered application that predicts stroke risk using machine learning algorithms. Built with Python and advanced data analysis techniques for healthcare applications.",
      image: "https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg",
      technologies: ["Python", "Machine Learning", "Data Analysis"],
      githubUrl: "https://github.com/HARRISAMIN432/AI-Final-Project"
    },
    {
      title: "Blog Application",
      description: "A full-featured AI powered blogging platform with user authentication, post creation, commenting system, and responsive design. Built with modern web technologies for optimal performance.",
      image: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg",
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "Gemini"],
      githubUrl: "https://github.com/HARRISAMIN432/Blog-App"
    },
    {
      title: "Database Management System",
      description: "A comprehensive database solution showcasing advanced SQL operations, data modeling, and database optimization techniques for efficient data management.",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
      technologies: ["C++", "Database Design", "Data Modeling"],
      githubUrl: "https://github.com/HARRISAMIN432/My-Database"
    },
    {
      title: "Mini Excel",
      description: "A simplified spreadsheet application with basic Excel functionality. Demonstrates understanding of data structures and user interface design.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
      technologies: ["JavaScript", "HTML", "Tailwindcss", "Data Structures"],
      githubUrl: "https://github.com/TayabAmir/Mini_Excel"
    },
    {
        title: "Solitaire Game",
        description: "A classic Solitaire card game implemented in C++. Features drag-and-drop functionality, scoring system, and responsive design for an engaging user experience.",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bluestacks.com%2Fapps%2Fcard%2Fsolitaire-classic-cardgames-on-pc.html&psig=AOvVaw0_wblBlBXzxK7CHIAW48zn&ust=1755764623178000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMj45Yn7mI8DFQAAAAAdAAAAABAE",
        technologies: ["C++", "Game Development", "Data Structures", "SFML"],
        githubUrl: "https://gitlab.com/2023-cs-160/csc200m24pid160"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A showcase of my recent work, featuring web applications and software solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
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