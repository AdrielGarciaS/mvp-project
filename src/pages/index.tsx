import { VStack } from '@chakra-ui/react';
import { Header } from 'modules/reports/components/Header';
import { NoReportData } from 'modules/reports/components/NoReportData';
import { Report } from 'modules/reports/components/Report';
import { useEffect, useState } from 'react';
import { createReports, getGateways, getProjects } from 'repositories/report';
import { formatAmount, formatDate } from 'utils/helpers';

interface ProjectsAndGatewaysMap {
  projects: {
    [id: string]: string;
  };
  gateways: {
    [id: string]: string;
  };
}

interface Filter {
  projectId: string;
  gatewayId: string;
}

export default function Home() {
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [filter, setFilter] = useState<Filter | null>(null);
  const [projectsAndGatewaysMap, setProjectsAndGatewaysMap] = useState(
    {} as ProjectsAndGatewaysMap,
  );

  useEffect(() => {
    const loadPageData = async () => {
      setIsLoading(true);
      const [gatewaysResponse, projectsResponse] = await Promise.allSettled([
        getGateways(),
        getProjects(),
      ]);

      setIsLoading(false);

      const newProjectsAndGatewaysMap: ProjectsAndGatewaysMap = {
        projects: {},
        gateways: {},
      };

      if (gatewaysResponse.status === 'fulfilled') {
        const gatewaysMap = gatewaysResponse.value.reduce((acc, gateway) => {
          if (acc[gateway.gatewayId]) return acc;

          return { ...acc, [gateway.gatewayId]: gateway.name };
        }, {});

        newProjectsAndGatewaysMap.gateways = gatewaysMap;
        setGateways(gatewaysResponse.value);
      }

      if (projectsResponse.status === 'fulfilled') {
        const projectsMap = projectsResponse.value.reduce((acc, project) => {
          if (acc[project.projectId]) return acc;

          return { ...acc, [project.projectId]: project.name };
        }, {});

        newProjectsAndGatewaysMap.projects = projectsMap;
        setProjects(projectsResponse.value);
      }

      setProjectsAndGatewaysMap(newProjectsAndGatewaysMap);
    };

    loadPageData();
  }, []);

  const generateReport = async (params: CreateReportsParams) => {
    const response = await createReports(params);

    const newReports = response.map<ProjectGateway>(report => {
      return {
        ...report,
        projectName: projectsAndGatewaysMap.projects[report.projectId],
        gatewayName: projectsAndGatewaysMap.gateways[report.gatewayId],
        formattedAmount: formatAmount(report.amount),
        formattedDate: formatDate(report.created),
      };
    });

    const reportsGroupedByProjectAndGateway = projects.reduce<ReportItem[]>(
      (acc, curr) => {
        const { projectId, name } = curr;

        const projectGateways = newReports.filter(
          report => report.projectId === projectId,
        );

        if (!projectGateways.length) return acc;

        const totalAmount = projectGateways.reduce((amountAcc, amountCurr) => {
          return amountAcc + amountCurr.amount;
        }, 0);

        const newReportTableItem: ReportItem = {
          projectId,
          projectName: name,
          gateways: projectGateways,
          formattedTotalAmount: formatAmount(totalAmount),
        };

        return [...acc, newReportTableItem];
      },
      [],
    );
    const newFilter: Filter = {
      projectId: params.projectId,
      gatewayId: params.gatewayId,
    };

    setFilter(newFilter);
    setReports(reportsGroupedByProjectAndGateway);
  };

  const getFilterTitle = () => {
    if (!filter) return '';

    const { projectId, gatewayId } = filter;

    const projectName = projectsAndGatewaysMap.projects[projectId];
    const gatewayName = projectsAndGatewaysMap.gateways[gatewayId];

    return `${projectName ?? 'All projects'} | ${
      gatewayName ?? 'All gateways'
    }`;
  };

  const hasData = Boolean(filter) && Boolean(reports.length);
  const hasNoData = Boolean(filter) && !reports.length;

  return (
    <VStack h="full">
      <Header
        projects={projects}
        gateways={gateways}
        isLoadingPopoverData={isLoading}
        onClickGenReport={generateReport}
      />

      {hasData && <Report reports={reports} title={getFilterTitle()} />}

      {hasNoData && <NoReportData />}
    </VStack>
  );
}
