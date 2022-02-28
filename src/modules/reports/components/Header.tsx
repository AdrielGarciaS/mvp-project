import { useEffect, useState } from 'react';
import { HStack, VStack, Text, Button } from '@chakra-ui/react';

import DatePicker from 'components/DatePicker';
import { PopoverList } from 'components/PopoverList';

interface Props {
  gateways: Gateway[];
  projects: Project[];
}

export const Header = (props: Props) => {
  const { gateways, projects } = props;

  const [gatewaysFilter, setGatewaysFilter] = useState<ListItem[]>([]);
  const [projectsFilter, setProjectsFilter] = useState<ListItem[]>([]);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

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

  const handleChangeFromDate = (date: Date | null) => {
    setFromDate(date);
  };

  const handleChangeToDate = (date: Date | null) => {
    setToDate(date);
  };

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

      <HStack spacing="1rem">
        <PopoverList items={projectsFilter} />

        <PopoverList items={gatewaysFilter} />

        <DatePicker
          selectedDate={fromDate}
          onChange={handleChangeFromDate}
          buttonText="From date"
        />

        <DatePicker
          selectedDate={toDate}
          onChange={handleChangeToDate}
          buttonText="To date"
        />

        <Button colorScheme="blue" size="sm">
          Generate report
        </Button>
      </HStack>
    </HStack>
  );
};
