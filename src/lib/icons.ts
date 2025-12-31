import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  MessageSquare: LucideIcons.MessageSquare,
  Calculator: LucideIcons.Calculator,
  Box: LucideIcons.Box,
  Grid3x3: LucideIcons.Grid3x3,
  Zap: LucideIcons.Zap,
  Brain: LucideIcons.Brain,
  Cog: LucideIcons.Cog,
  Lightbulb: LucideIcons.Lightbulb,
  ListOrdered: LucideIcons.ListOrdered,
  Users: LucideIcons.Users,
  Search: LucideIcons.Search,
  Scale: LucideIcons.Scale,
  Circle: LucideIcons.Circle,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || LucideIcons.Circle;
}
