import { HStack, VStack, Text } from '@chakra-ui/react';
import { PopoverList } from 'components/PopoverList';
import { useEffect, useState } from 'react';

interface Props {
  gateways: Gateway[];
  projects: Project[];
}

export const Header = (props: Props) => {
  const { gateways, projects } = props;

  const [gatewaysFilter, setGatewaysFilter] = useState<ListItem[]>([]);
  const [projectsFilter, setProjectsFilter] = useState<ListItem[]>([]);

  useEffect(() => {
    const newGatewaysFilter = gateways.map(gateway => ({
      label: gateway.name,
      value: gateway.gatewayId,
    }));

    setGatewaysFilter(newGatewaysFilter);
  }, [gateways]);

  useEffect(() => {
    const newProjectsFilter = projects.map(project => ({
      label: project.name,
      value: project.projectId,
    }));

    setProjectsFilter(newProjectsFilter);
  }, [projects]);

  return (
    <HStack>
      <VStack align="flex-start" justify="space-between" w="full">
        <Text fontSize="1.5rem" fontWeight="700" color="rgba(1, 31, 75, 1)">
          Reports
        </Text>
        <Text fontSize="1rem" fontWeight="700" color="rgba(126, 130, 153, 1)">
          Easily generate a report of your transactions
        </Text>
      </VStack>

      <HStack spacing="1.5rem">
        <PopoverList items={projectsFilter} />

        <PopoverList items={gatewaysFilter} />
      </HStack>
    </HStack>
  );
};
