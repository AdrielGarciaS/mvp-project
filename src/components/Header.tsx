import { Flex, Stack, Img, Avatar, Text } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Flex w="full" p="1.25rem 2.1875rem">
      <Flex w="100%" align="center" justify="space-between">
        <Stack direction="row" spacing="2.5rem">
          <Img src="/logo.svg" />
          <Img src="/menu.svg" />
        </Stack>

        <Stack direction="row" alignItems="center" spacing="0.687rem">
          <Avatar
            name="John Doe"
            size="md"
            bg="rgba(246, 202, 101, 1)"
            borderRadius="5px"
          />

          <Text color="rgba(0, 91, 150, 1)" fontWeight="700">
            John Doe
          </Text>
        </Stack>
      </Flex>
    </Flex>
  );
};
