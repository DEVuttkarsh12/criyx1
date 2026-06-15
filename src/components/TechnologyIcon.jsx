import { siN8n } from 'simple-icons';
import {
  SiClaude,
  SiFlutter,
  SiLangchain,
  SiMake,
  SiOpenai,
  SiReact,
  SiTwilio,
} from 'react-icons/si';

function N8nIcon() {
  return (
    <svg
      className="heroLogoChip__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d={siN8n.path} />
    </svg>
  );
}

const technologyIcons = {
  claude: SiClaude,
  flutter: SiFlutter,
  langchain: SiLangchain,
  make: SiMake,
  n8n: N8nIcon,
  openai: SiOpenai,
  react: SiReact,
  twilio: SiTwilio,
};

function normalizeIconKey(iconKey) {
  return typeof iconKey === 'string' ? iconKey.trim().toLowerCase() : '';
}

export default function TechnologyIcon({ iconKey, label, mark }) {
  const Icon = technologyIcons[normalizeIconKey(iconKey)];

  if (!Icon) {
    return <span className="heroLogoChip__fallback">{mark || label.slice(0, 1)}</span>;
  }

  return <Icon className="heroLogoChip__icon" aria-hidden="true" focusable="false" />;
}
