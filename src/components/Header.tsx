import { Flex, Stack, Img, Avatar, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

// import { getUsers } from 'repositories/auth';

interface UserData extends User {
  fullName: string;
}

export const Header = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get('/api/users');

      const userData = response.data[0];

      const newUserData: UserData = {
        ...userData,
        fullName: `${userData.firstName} ${userData.lastName}`,
      };

      setUser(newUserData);
    };

    getUserData();
  }, []);

  return (
    <Flex w="full" p="1.25rem 2.1875rem">
      <Flex w="100%" align="center" justify="space-between">
        <Stack direction="row" spacing="2.5rem">
          <Img src="/logo.svg" />
          <Img src="/menu.svg" />
        </Stack>

        <Stack direction="row" alignItems="center" spacing="0.687rem">
          <Avatar
            name={user?.fullName}
            size="md"
            bg="rgba(246, 202, 101, 1)"
            borderRadius="5px"
          />

          <Text color="rgba(0, 91, 150, 1)" fontWeight="700">
            {user?.fullName}
          </Text>
        </Stack>
      </Flex>
    </Flex>
  );
};
