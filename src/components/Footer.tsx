
import React from 'react';
import { Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <Award className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Bourse French Tech</span>
            </div>
            <p className="text-secondary-foreground/80">
              Le guide complet de la Bourse French Tech.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
            <ul className="space-y-3 text-secondary-foreground/80">
              <li><a href="#definition" className="hover:text-primary transition-colors duration-200">Qu'est-ce que la BFT ?</a></li>
              <li><a href="#criteres" className="hover:text-primary transition-colors duration-200">Critères d'éligibilté</a></li>
              <li><a href="#processus" className="hover:text-primary transition-colors duration-200">Processus de candidature</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors duration-200">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Éligibilité</h4>
            <Link
              to="/chat"
              className="inline-flex items-center text-secondary-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Évaluer mon projet gratuitement →
            </Link>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-center text-secondary-foreground/60">
          <p>
            &copy; 2026 <a href="https://www.finexov.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">Finexov</a>. 
            Tous droits réservés. | 
            <a href="/mentions-legales" className="hover:text-primary transition-colors duration-200 ml-1">Mentions légales</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
