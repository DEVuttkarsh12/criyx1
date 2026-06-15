import { Link } from 'react-router-dom';
import brandLogo from '../../file.jpeg';
import StaggeredMenu from './StaggeredMenu';
import { navItems, productNavItems } from '../data/siteContent';

const menuItems = [
  ...navItems.map((item) => ({
    label: item.label,
    ariaLabel: `Open ${item.label} page`,
    link: item.to,
  })),
  {
    label: 'Contact',
    ariaLabel: 'Open contact page',
    link: '/contact',
  },
];

const productItems = productNavItems.map((item) => ({
  label: item.label,
  ariaLabel: `Open ${item.label} page`,
  link: item.to,
}));

export default function SiteHeader() {
  return (
    <header className="siteHeader siteHeader--menu">
      <Link className="brand" to="/" aria-label="Criyx home">
        <img className="brand__image" src={brandLogo} alt="" />
      </Link>
      <div className="siteHeader__menuDock">
        <StaggeredMenu
          accentColor="#a75425"
          changeMenuColorOnOpen={true}
          colors={['rgba(167, 84, 37, 0.92)', 'rgba(36, 20, 15, 0.96)']}
          displayItemNumbering={true}
          items={menuItems}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#ffffff"
          secondaryItems={productItems}
          secondaryTitle="Our Products"
        />
      </div>
    </header>
  );
}
