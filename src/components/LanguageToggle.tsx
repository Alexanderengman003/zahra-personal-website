import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-accent rounded-md p-1">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="h-7 px-2 text-xs font-medium"
      >
        EN
      </Button>
      <Button
        variant={language === "sv" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("sv")}
        className="h-7 px-2 text-xs font-medium"
      >
        SV
      </Button>
    </div>
  );
}