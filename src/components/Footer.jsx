const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-[#050816]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center opacity-60">
        <div className="text-sm text-slate-400 font-mono">
          &copy; {new Date().getFullYear()} MUHAMMAD HARRIS AMIN
        </div>

        <div className="flex space-x-8 mt-6 md:mt-0">
          <a
            href="https://github.com/HARRISAMIN432"
            className="text-white hover:text-blue-500"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/harris-amin-32a90a2a7/"
            className="text-white hover:text-blue-500"
          >
            LINKEDIN
          </a>
          <a
            href="mailto:harrisaminjutt@gmail.com"
            className="text-white hover:text-blue-500"
          >
            EMAIL
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
