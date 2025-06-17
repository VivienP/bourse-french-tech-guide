
import React from 'react';
import { Award, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Bourse French Tech</span>
            </div>
            <p className="text-gray-300 mb-4">
              Le guide complet de la Bourse French Tech.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#definition" className="hover:text-primary transition-colors duration-200">Qu'est-ce que la BFT ?</a>
              </li>
              <li>
                <a href="#criteres" className="hover:text-primary transition-colors duration-200">Critères d'éligibilté</a>
              </li>
              <li>
                <a href="#processus" className="hover:text-primary transition-colors duration-200">Processus de candidature</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary transition-colors duration-200">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="flex items-center">
              <a 
                href="https://taap.it/M96y4a" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 <a href="https://www.finexov.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">Finexov</a>. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
