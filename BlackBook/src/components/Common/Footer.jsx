import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="px-6 md:px-20 py-16 bg-black border-t border-zinc-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">BlackBookEDU</h3>
          <p className="text-gray-400">© 2025 BlackBookEDU.ai. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;