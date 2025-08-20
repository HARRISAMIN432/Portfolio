import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "harrisaminjutt@gmail.com",
      link: "mailto:harrisaminjutt@gmail.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+92 311 9870369",
      link: "tel:+923119870369",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Lahore, Punjab, Pakistan",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Ready to start your next project? I'd love to hear from you. Let's
            create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-300 text-lg mb-8">
                I'm passionate about solving complex problems and building
                innovative solutions. With my strong background in competitive
                programming and full-stack development, I'm always excited to
                take on new challenges and collaborate on interesting projects.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.link ? "_blank" : undefined}
                  rel={info.link ? "noopener noreferrer" : undefined}
                  className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="text-blue-400">{info.icon}</div>
                  <div>
                    <p className="text-gray-400 text-sm">{info.title}</p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-white mb-6">
              Send a Message
            </h3>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=harrisaminjutt@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition">
                Contact Me
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
