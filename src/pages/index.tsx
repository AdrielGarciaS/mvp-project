import { Divider, Stack } from '@chakra-ui/react';
import { Header } from 'components/Header';

export default function Home() {
  return (
    <Stack direction="column" w="full">
      <Header />

      <Divider />
    </Stack>
  );
}
