import React from 'react';
import { Code, Trophy, Brain, Database } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full-Stack Development",
      description: "React, Node.js, express, and modern web technologies"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Competitive Programming",
      description: "350+ LeetCode & 150+ Codeforces problems solved"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database Management",
      description: "Proficient in SQL and NoSQL databases and data modeling"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            I'm a passionate developer who loves turning ideas into reality through clean code and problem-solving.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
  <div className="space-y-6">
    <p className="text-lg text-gray-700">
      I’m a dedicated full-stack developer with a strong foundation in problem-solving and software design. 
      Having solved 350+ problems on LeetCode and 150+ on Codeforces, I’ve sharpened my ability to write efficient, 
      optimized code and approach challenges with a competitive programming mindset.
    </p>
    <p className="text-lg text-gray-700">
      My technical expertise covers multiple languages, including C++, Python, JavaScript, and C#, alongside 
      frameworks like React, Node.js, and modern databases. I enjoy turning complex ideas into practical solutions— 
      from building AI-driven applications to developing scalable, production-ready full-stack systems.
    </p>
    <p className="text-lg text-gray-700">
      Based in Lahore, Pakistan, I’m continuously learning, exploring new technologies, and working on projects 
      that push my creativity and technical skills. I thrive in environments where I can innovate, collaborate, 
      and contribute to meaningful software solutions.
    </p>
  </div>


          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;