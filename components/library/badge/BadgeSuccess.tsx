import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/locales/client";

interface BadgeProps {
  label: string;
  className?: string;
}

export const BadgeSuccess: React.FC<BadgeProps> = ({ label, className = "" }) => {
  const t = useI18n();

  return <Badge className={`text-xs ${className} bg-green-500 hover:bg-green-500`}>{t(label)}</Badge>;
};
