import { IconButton, Img, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const menuItems = [
  { name: 'Dashboard', iconSrc: './dashboard.svg', path: '/dashboard' },
  { name: 'Settings', iconSrc: './settings.svg', path: '/settings' },
  { name: 'Computer', iconSrc: './computer.svg', path: '/computer' },
  { name: 'Reports', iconSrc: './chart.svg', path: '/' },
  { name: 'Sign out', iconSrc: './poweroff.svg', path: '/signout' },
] as const;

export const Sidebar = () => {
  const { pathname } = useRouter();

  return (
    <VStack px="2.1875rem" spacing="1.5rem">
      {menuItems.map(({ name, iconSrc, path }) => (
        <IconButton
          aria-label={`${name}-button`}
          bg="transparent"
          variant={pathname === path ? 'outline' : 'ghost'}
        >
          <Img src={iconSrc} />
        </IconButton>
      ))}
    </VStack>
  );
};
