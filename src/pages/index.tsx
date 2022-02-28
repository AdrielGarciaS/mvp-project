import { Header } from 'modules/reports/components/Header';
import { useEffect, useState } from 'react';
import { createReports, getGateways, getProjects } from 'repositories/report';

export default function Home() {
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadPageData = async () => {
      const [gatewaysResponse, projectsResponse] = await Promise.allSettled([
        getGateways(),
        getProjects(),
      ]);

      if (gatewaysResponse.status === 'fulfilled') {
        setGateways(gatewaysResponse.value.data);
      }

      if (projectsResponse.status === 'fulfilled') {
        setProjects(projectsResponse.value.data);
      }
    };

    loadPageData();
  }, []);

  const generateReport = async (params: CreateReportsParams) => {
    const data = await createReports(params);

    console.log(data);
  };

  return (
    <Header
      projects={projects}
      gateways={gateways}
      onClickGenReport={generateReport}
    />
  );
}
