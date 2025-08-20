import React from "react";
import { Code, Trophy, Brain, Database, Target } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full-Stack Development",
      description:
        "Expert in React, Node.js, Express, mongDB and Tailwind CSS, building responsive and scalable web applications",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Competitive Programming",
      description:
        "350+ LeetCode & 150+ Codeforces problems solved, mastering algorithmic thinking",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database Architecture",
      description:
        "Worked in both SQL and NoSQL databases, ensuring data integrity and performance",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const stats = [
    { number: "350+", label: "LeetCode Problems" },
    { number: "130+", label: "Codeforces Solutions" },
    { number: "10+", label: "Projects" },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About me
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transforming complex problems into elegant solutions through
            innovative code and creative thinking
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-w-[150px] border border-gray-200">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  The Journey
                </h3>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Hi, I'm a{" "}
                  <span className="font-semibold text-blue-600">
                    full-stack developer
                  </span>{" "}
                  who loves turning ideas into real-world applications. I've
                  solved{" "}
                  <span className="font-semibold">
                    350+ problems on LeetCode
                  </span>{" "}
                  and <span className="font-semibold">150+ on Codeforces</span>,
                  which has sharpened my problem-solving and coding skills.
                </p>

                <p className="text-lg">
                  I work with{" "}
                  <span className="font-semibold text-purple-600">
                    C++, Python, JavaScript, and C#
                  </span>{" "}
                  along with frameworks like React and Node.js. From building
                  clean UIs to developing reliable backend systems, I enjoy
                  creating software that's fast, scalable, and easy to use.
                </p>

                <p className="text-lg">
                  I'm currently a{" "}
                  <span className="font-semibold text-green-600">
                    Computer Science student at UET Lahore
                  </span>
                  . Based in Lahore, Pakistan, I'm always curious about new
                  technologies and passionate about building projects that make
                  a difference.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">
                  Always learning, always building, always innovating
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{item.icon}</div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
