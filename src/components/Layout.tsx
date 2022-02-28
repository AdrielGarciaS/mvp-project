import { Box, Divider, Flex, HStack, Link, VStack } from '@chakra-ui/react';

import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout = (props: Props) => {
  const { children } = props;

  return (
    <Flex maxWidth="1440px" h="100vh">
      <VStack w="full" h="full">
        <Header />

        <Divider />

        <HStack
          align="flex-start"
          justify="space-between"
          w="full"
          h="full"
          p="2.5625rem 0"
        >
          <Sidebar />

          <Box w="full" h="full" pr="2.5625rem">
            {children}
          </Box>
        </HStack>

        <Box
          pl="6.25rem"
          pb="1.25rem"
          alignSelf="flex-start"
          color="rgba(0, 91, 150, 1)"
          fontWeight="700"
        >
          <Link href="/">Terms&Conditions</Link> |{' '}
          <Link href="/">Privacy policy</Link>
        </Box>
      </VStack>
    </Flex>
  );
};
