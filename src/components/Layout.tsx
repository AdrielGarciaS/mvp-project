import { Box, Divider, Flex, HStack, VStack } from '@chakra-ui/react';

import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout = (props: Props) => {
  const { children } = props;

  return (
    <Flex maxWidth="1440px">
      <VStack w="full">
        <Header />

        <Divider />

        <HStack
          align="flex-start"
          justify="space-between"
          w="full"
          p="2.5625rem 0"
        >
          <Sidebar />

          <Box w="full">{children}</Box>
        </HStack>
      </VStack>
    </Flex>
  );
};
