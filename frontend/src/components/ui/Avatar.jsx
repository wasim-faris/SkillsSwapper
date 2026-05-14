/**
 * Avatar — initials circle.
 * Extracts first letter of first_name + last_name.
 */
export default function Avatar({ firstName = '', lastName = '', size = 'md', className = '' }) {
  const initials = [firstName[0], lastName[0]]
    .filter(Boolean)
    .join('')
    .toUpperCase() || '?';

  const sizes = {
    xs: 'w-7 h-7 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };

  return (
    <div
      className={[
        'inline-flex items-center justify-center rounded-full font-medium select-none shrink-0 transition-transform duration-200',
        sizes[size] || sizes.md,
        className,
      ].join(' ')}
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        border: '2px solid var(--border-default)',
        color: 'var(--text-primary)'
      }}
      aria-label={`${firstName} ${lastName}`}
    >
      {initials}
    </div>
  );
}
