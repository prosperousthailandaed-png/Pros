type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const DESKTOP: NavItem[] = [
  {
    href: '/products',
    label: 'สินค้า',
    children: [
      { href: '/products/aed-112', label: 'AED 112' },
      { href: '/products/aed-220', label: 'AED 220' },
    ],
  },
  { href: '/about', label: 'เกี่ยวกับเรา' },
];