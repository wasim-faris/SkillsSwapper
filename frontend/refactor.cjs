const fs = require('fs');
const path = require('path');

const replacements = {
  'bg-white': 'bg-[var(--bg-secondary)]',
  'bg-slate-50': 'bg-[var(--bg-primary)]',
  'bg-slate-100': 'bg-[var(--bg-tertiary)]',
  'bg-gray-50': 'bg-[var(--bg-primary)]',
  'bg-gray-100': 'bg-[var(--bg-tertiary)]',
  'bg-gray-900': 'bg-[var(--bg-primary)]',
  'bg-slate-200': 'bg-[var(--border-default)]',
  'bg-gray-200': 'bg-[var(--border-default)]',
  
  'border-slate-100': 'border-[var(--border-default)]',
  'border-slate-200': 'border-[var(--border-hover)]',
  'border-gray-100': 'border-[var(--border-default)]',
  'border-gray-200': 'border-[var(--border-hover)]',
  
  'text-slate-900': 'text-[var(--text-primary)]',
  'text-gray-900': 'text-[var(--text-primary)]',
  'text-slate-800': 'text-[var(--text-primary)]',
  'text-gray-800': 'text-[var(--text-primary)]',
  'text-slate-700': 'text-[var(--text-secondary)]',
  'text-gray-700': 'text-[var(--text-secondary)]',
  'text-slate-600': 'text-[var(--text-muted)]',
  'text-gray-600': 'text-[var(--text-muted)]',
  'text-slate-500': 'text-[var(--text-secondary)]',
  'text-gray-500': 'text-[var(--text-secondary)]',
  'text-slate-400': 'text-[var(--text-placeholder)]',
  'text-gray-400': 'text-[var(--text-placeholder)]',
  'text-slate-200': 'text-[var(--text-muted)]',
  
  '#6C63FF': 'var(--accent-primary)',
  '#FF6584': 'var(--accent-secondary)',
  'bg-indigo-600': 'bg-[var(--accent-primary)]',
  'text-indigo-600': 'text-[var(--accent-primary)]',
  'bg-purple-50': 'bg-[rgba(94,106,210,0.1)]',
  'text-purple-600': 'text-[var(--accent-primary)]',
  'border-purple-100': 'border-[rgba(94,106,210,0.3)]',
  
  'shadow-purple-100': 'shadow-[rgba(94,106,210,0.1)]',
  'shadow-purple-200': 'shadow-[rgba(94,106,210,0.2)]',
  'shadow-pink-100': 'shadow-[rgba(255,101,132,0.1)]',
  
  'bg-[#0F0F0F]': 'bg-[var(--bg-primary)]',
  'bg-[#F5F5F5]': 'bg-[var(--bg-primary)]',
  'bg-[#1A1A1A]': 'bg-[var(--bg-secondary)]',
  'border-[#2A2A2A]': 'border-[var(--border-default)]',
  'bg-[#242424]': 'bg-[var(--bg-tertiary)]',
  'text-[#FFFFFF]': 'text-[var(--text-primary)]',
  'text-[#A0A0A0]': 'text-[var(--text-secondary)]',
  
  'hover:bg-gray-50': 'hover:bg-[var(--bg-hover)]',
  'hover:bg-slate-50': 'hover:bg-[var(--bg-hover)]',
  'hover:bg-slate-100': 'hover:bg-[var(--bg-hover)]',
  'hover:text-gray-900': 'hover:text-[var(--text-primary)]',
  'hover:text-slate-900': 'hover:text-[var(--text-primary)]'
};

function walk(dir) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [key, val] of Object.entries(replacements)) {
        if (content.includes(key)) {
          content = content.split(key).join(val);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

walk(path.join(__dirname, 'src'));
