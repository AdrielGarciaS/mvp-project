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
  fromDate?: string;
  toDate?: string;
}
