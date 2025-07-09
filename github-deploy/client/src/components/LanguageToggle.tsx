import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export const LanguageToggle = ({ className = "" }: { className?: string }) => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={`fixed top-4 right-4 z-50 bg-black/20 text-white border-white/30 hover:bg-white/10 transition-all duration-300 ${className}`}
    >
      {language === 'en' ? 'AR' : 'EN'}
    </Button>
  );
};