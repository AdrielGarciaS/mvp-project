import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface Props {
  reports: ReportItem[];
  title: string;
}

export const Report = (props: Props) => {
  const { reports, title } = props;

  return (
    <Box
      bg=" rgba(241, 250, 254, 1)"
      borderRadius="10px"
      w="full"
      p="1.125rem 1.5rem"
    >
      <Text fontWeight="700" fontSize="1rem">
        {title}
      </Text>

      <Accordion allowMultiple mt="2.125rem">
        {reports.map(report => (
          <AccordionItem
            key={report.projectId}
            border="none"
            w="full"
            mt="0.5rem"
          >
            <AccordionButton
              borderRadius="10px"
              p="1.625rem 1.5rem"
              bg="white"
              w="full"
            >
              <HStack justify="space-between" w="full">
                <Text fontWeight="700" fontSize="1rem">
                  {report.projectName}
                </Text>

                <Text fontWeight="700">
                  TOTAL: {report.formattedTotalAmount}
                </Text>
              </HStack>
            </AccordionButton>

            <AccordionPanel>
              <Table size="sm">
                <Thead bg="white">
                  <Tr>
                    <Th>Date</Th>
                    <Th>Gateway</Th>
                    <Th>Transaction ID</Th>
                    <Th>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {report.gateways.map((gateway, index) => (
                    <Tr
                      key={gateway.paymentId}
                      bg={index % 2 !== 0 ? 'white' : ''}
                    >
                      <Td>{gateway.formattedDate}</Td>
                      <Td>{gateway.gatewayName}</Td>
                      <Td>{gateway.paymentId}</Td>
                      <Td>{gateway.formattedAmount}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};
