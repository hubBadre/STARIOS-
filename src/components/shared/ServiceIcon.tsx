import {
  AirVent,
  Wrench,
  Fan,
  Wind,
  Flame,
  Layers,
  Droplets,
  PaintRoller,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';

/** Les icônes sont stockées en base par leur nom : cette table fait le pont. */
const ICONS: Record<string, LucideIcon> = {
  AirVent,
  Wrench,
  Fan,
  Wind,
  Flame,
  Layers,
  Droplets,
  PaintRoller,
  ShoppingBag,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? AirVent;
  return <Icon className={className} aria-hidden="true" />;
}
