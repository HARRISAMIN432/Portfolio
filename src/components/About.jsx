import React, { useState, useEffect } from "react";
import {
  Code,
  Trophy,
  Brain,
  Database,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const highlights = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full-Stack Development",
      description:
        "Expert in React, Node.js, Express, mongDB and Tailwind CSS, building responsive and scalable web applications",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Competitive Programming",
      description:
        "350+ LeetCode & 150+ Codeforces problems solved, mastering algorithmic thinking",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database Architecture",
      description:
        "Worked in both SQL and NoSQL databases, ensuring data integrity and performance",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
  ];

  const stats = [
    { number: "350+", label: "LeetCode Problems" },
    { number: "150+", label: "Codeforces Solutions" },
    { number: "10+", label: "Projects" },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] -z-10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-20 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent mb-6">
            About me{" "}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transforming complex problems into elegant solutions through
            innovative code and creative thinking
          </p>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-6 mb-20 transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-w-[150px]">
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
          <div
            className={`space-y-8 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
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
                  Hi, I’m a{" "}
                  <span className="font-semibold text-blue-600">
                    full-stack developer
                  </span>{" "}
                  who loves turning ideas into real-world applications. I’ve
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
                  creating software that’s fast, scalable, and easy to use.
                </p>

                <p className="text-lg">
                  I’m currently a{" "}
                  <span className="font-semibold text-green-600">
                    Computer Science student at UET Lahore
                  </span>
                  . Based in Lahore, Pakistan, I’m always curious about new
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

          <div
            className={`space-y-6 transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {highlights.map((item, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-300 ${
                  activeHighlight === index ? "scale-105" : "hover:scale-105"
                }`}
                onMouseEnter={() => setActiveHighlight(index)}
                onMouseLeave={() => setActiveHighlight(null)}
              >
                <div
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 ${item.bgColor}/20`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{item.icon}</div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <Zap className="w-4 h-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${
                        item.color
                      } transform transition-all duration-1000 ${
                        activeHighlight === index ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`text-center mt-20 transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        ></div>
      </div>
    </section>
  );
};

export default About;
