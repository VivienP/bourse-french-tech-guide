
import React, { useState } from 'react';
import { Award, ChevronDown, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';

interface NavGroup {
  label: string;
  items: { id: string; label: string }[];
}

interface NavDirect {
  id: string;
  label: string;
}

type NavEntry = NavGroup | NavDirect;

const isGroup = (entry: NavEntry): entry is NavGroup => 'items' in entry;

const navEntries: NavEntry[] = [
  {
    label: 'Comprendre',
    items: [
      { id: 'definition', label: 'Définition' },
      { id: 'criteres', label: "Critères d'éligibilité" },
      { id: 'exemples', label: 'Exemples' },
    ],
  },
  {
    label: 'Financer',
    items: [
      { id: 'depenses', label: 'Dépenses éligibles' },
      { id: 'financement', label: 'Financement & calcul' },
      { id: 'avantages', label: 'Avantages' },
    ],
  },
  {
    label: 'Préparer',
    items: [
      { id: 'processus', label: 'Processus de candidature' },
      { id: 'evaluation', label: 'Évaluation' },
      { id: 'conseils', label: 'Conseils pratiques' },
    ],
  },
  { id: 'faq', label: 'FAQ' },
];

const allSectionIds = navEntries.flatMap((e) =>
  isGroup(e) ? e.items.map((i) => i.id) : [e.id]
);

function isGroupActive(group: NavGroup, activeSection: string) {
  return group.items.some((i) => i.id === activeSection);
}

interface NavigationBarProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  minimal?: boolean;
}

const NavigationBar = ({ activeSection, scrollToSection, minimal = false }: NavigationBarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-md border-b border-border shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <Award className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground whitespace-nowrap hidden sm:inline">
              Bourse French Tech
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navEntries.map((entry) =>
              isGroup(entry) ? (
                <DropdownMenu key={entry.label}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 inline-flex items-center gap-1 ${
                        isGroupActive(entry, activeSection)
                          ? 'text-primary-foreground bg-primary shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      {entry.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[200px]">
                    {entry.items.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className={`cursor-pointer ${
                          activeSection === item.id ? 'bg-accent font-semibold' : ''
                        }`}
                      >
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  key={entry.id}
                  onClick={() => handleNav(entry.id)}
                  className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === entry.id
                      ? 'text-primary-foreground bg-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {entry.label}
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                      <Award className="h-4 w-4 text-primary-foreground" />
                    </div>
                    Bourse French Tech
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-1">
                  {navEntries.map((entry) =>
                    isGroup(entry) ? (
                      <Collapsible key={entry.label} defaultOpen={isGroupActive(entry, activeSection)}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-foreground rounded-lg hover:bg-accent transition-colors">
                          {entry.label}
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="ml-3 border-l border-border pl-3 flex flex-col gap-0.5">
                            {entry.items.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => handleNav(item.id)}
                                className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                                  activeSection === item.id
                                    ? 'text-primary font-medium bg-primary/10'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <button
                        key={entry.id}
                        onClick={() => handleNav(entry.id)}
                        className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                          activeSection === entry.id
                            ? 'text-primary font-medium bg-primary/10'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        {entry.label}
                      </button>
                    )
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <Button
              onClick={() => scrollToSection('cta')}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-200 shadow-sm"
            >
              Réserver un créneau
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
