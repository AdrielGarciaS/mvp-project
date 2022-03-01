import { useEffect, useState } from 'react';
import { HStack, VStack, Text, Button } from '@chakra-ui/react';

import DatePicker from 'components/DatePicker';
import { PopoverList } from 'components/PopoverList';
import { parseDateToApi } from 'utils/helpers';

interface Props {
  gateways: Gateway[];
  projects: Project[];
  onClickGenReport(params: CreateReportsParams): Promise<void>;
  isLoadingPopoverData: boolean;
}

export const Header = (props: Props) => {
  const { gateways, projects, onClickGenReport, isLoadingPopoverData } = props;

  const [gatewaysFilter, setGatewaysFilter] = useState<ListItem[]>([]);
  const [projectsFilter, setProjectsFilter] = useState<ListItem[]>([]);

  const [gatewayId, setGatewayId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newGatewaysFilter = gateways.map(gateway => ({
      label: gateway.name,
      value: gateway.gatewayId,
    }));

    const allGateways: ListItem = {
      label: 'All gateways',
      value: '',
    };

    setGatewaysFilter([allGateways, ...newGatewaysFilter]);
  }, [gateways]);

  useEffect(() => {
    const newProjectsFilter = projects.map(project => ({
      label: project.name,
      value: project.projectId,
    }));

    const allProjects: ListItem = {
      label: 'All projects',
      value: '',
    };

    setProjectsFilter([allProjects, ...newProjectsFilter]);
  }, [projects]);

  const handleChangeFromDate = (date: Date | null) => {
    setFromDate(date);
  };

  const handleChangeToDate = (date: Date | null) => {
    setToDate(date);
  };

  const handleSelectProject = (id: string) => {
    setProjectId(id);
  };

  const handleSelectGateway = (id: string) => {
    setGatewayId(id);
  };

  const handleGenerateReport = async () => {
    const reportParams: CreateReportsParams = {
      gatewayId: gatewayId || undefined,
      projectId: projectId || undefined,
      from: fromDate ? parseDateToApi(fromDate) : undefined,
      to: toDate ? parseDateToApi(toDate) : undefined,
    };

    setIsLoading(true);
    await onClickGenReport(reportParams);
    setIsLoading(false);
  };

  return (
    <HStack align="flex-start" w="full" justify="space-between">
      <VStack align="flex-start">
        <Text fontSize="1.5rem" fontWeight="700" color="rgba(1, 31, 75, 1)">
          Reports
        </Text>
        <Text fontSize="1rem" fontWeight="700" color="rgba(126, 130, 153, 1)">
          Easily generate a report of your transactions
        </Text>
      </VStack>

      <HStack spacing="1rem">
        <PopoverList
          items={projectsFilter}
          onChange={handleSelectProject}
          isLoading={isLoadingPopoverData}
        />

        <PopoverList
          items={gatewaysFilter}
          onChange={handleSelectGateway}
          isLoading={isLoadingPopoverData}
        />

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

        <Button
          isLoading={isLoading}
          disabled={isLoadingPopoverData}
          colorScheme="blue"
          size="sm"
          onClick={handleGenerateReport}
        >
          Generate report
        </Button>
      </HStack>
    </HStack>
  );
};
