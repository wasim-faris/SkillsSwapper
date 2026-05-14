import { HiXMark } from 'react-icons/hi2';

/**
 * SkillPill — colored pill with optional × delete button.
 * type: "teaching" | "learning"
 */
export default function SkillPill({ name, type = 'teaching', onDelete }) {
  const isTeaching = type === 'teaching';
  
  // Linear specific skill tag styling
  const baseStyle = {
    background: 'rgba(94,106,210,0.1)',
    border: '1px solid rgba(94,106,210,0.3)',
    color: '#5E6AD2',
    borderRadius: '6px',
    fontSize: '12px'
  };

  const badgeStyle = {
    background: '#1A1A1A',
    border: '1px solid #282828',
    color: '#6B6F76',
    borderRadius: '6px',
    fontSize: '12px'
  };

  const appliedStyle = isTeaching ? baseStyle : badgeStyle;

  return (
    <span 
      className="inline-flex items-center gap-1.5 px-3 py-1 font-medium transition-all duration-150 hover:brightness-110"
      style={appliedStyle}
    >
      {isTeaching ? 'Teaching:' : 'Learning:'} {name}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-1 hover:scale-110 transition-transform focus:outline-none"
          aria-label={`Remove ${name}`}
        >
          <HiXMark size={12} />
        </button>
      )}
    </span>
  );
}
