import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AVAILABLE_LANGUAGES, type Language } from "@/lib/i18n";
import { ChevronDown, Globe } from "lucide-react";

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLang = AVAILABLE_LANGUAGES.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2 bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 transition-all duration-300"
        >
          <Globe className="w-4 h-4" />
          <span className="text-xl">{currentLang?.flag}</span>
          <span className="hidden sm:inline">{currentLang?.name}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-black/80 backdrop-blur-xl border-white/20 text-white min-w-[200px]"
      >
        {AVAILABLE_LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => {
              onLanguageChange(language.code);
              setIsOpen(false);
            }}
            className={`flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors ${
              currentLanguage === language.code ? 'bg-white/5' : ''
            }`}
          >
            <span className="text-2xl">{language.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{language.name}</span>
              <span className="text-xs text-gray-400">{language.code.toUpperCase()}</span>
            </div>
            {currentLanguage === language.code && (
              <span className="ml-auto text-green-400">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}