interface User {
  firstName: string;
  lastName: string;
}

interface Gateway {
  gatewayId: string;
  name: string;
}

interface Project {
  projectId: string;
  name: string;
}

interface ListItem {
  label: string;
  value: string;
}

interface CreateReportsParams {
  gatewayId?: string;
  projectId?: string;
  from?: string;
  to?: string;
}

interface Report {
  projectId: string;
  amount: number;
  paymentId: string;
  gatewayId: string;
  created: string;
}

interface ProjectGateway extends Report {
  projectName: string;
  gatewayName: string;
  formattedAmount: string;
  formattedDate: string;
}

interface ReportItem {
  projectId: string;
  projectName: string;
  gateways: ProjectGateway[];
  formattedTotalAmount: string;
}
