import { siteConfig } from './siteConfig';

type BrandLogoProps = {
  href?: string;
  className?: string;
  compact?: boolean;
};

export function BrandLogo({ href = '#top', className = '', compact = false }: BrandLogoProps) {
  return (
    <a
      className={`brand brand-logo${className ? ` ${className}` : ''}${compact ? ' brand-logo--compact' : ''}`}
      href={href}
      aria-label={siteConfig.logoAlt}
    >
      <img
        className="brand-logo-image"
        src={siteConfig.logoSrc}
        alt=""
        fetchPriority={compact ? undefined : 'high'}
        width={compact ? 120 : 140}
        height={compact ? 34 : 40}
        decoding="async"
      />
    </a>
  );
}
