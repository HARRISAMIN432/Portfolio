import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["C++", "Python", "JavaScript", "TypeScript", "C#"]
    },
    {
      title: "Frontend",
      skills: ["React", "HTML", "CSS", "Tailwind CSS", "Redux"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "REST API"]
    },
    {
      title: "Databases",
      skills: ["MongoDB", "SQL"]
    },
    {
      title: "Tools & Others",
      skills: ["Git", "Problem Solving", "AI/ML Basics"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A categorized view of my technical toolkit for full-stack development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-lg p-6 shadow-md"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4 text-center">
                {category.title}
              </h3>
              <ul className="space-y-2 text-gray-300 text-center">
                {category.skills.map((skill, idx) => (
                  <li key={idx} className="bg-gray-700 py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white transition">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
