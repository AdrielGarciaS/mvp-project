import { Img, Text, VStack } from '@chakra-ui/react';

export const NoReportData = () => {
  return (
    <VStack justify="center" align="center" h="60vh" w="full">
      <VStack maxW="30rem">
        <Text fontWeight="700" fontSize="1.5rem" color="rgba(1, 31, 75, 1)">
          No reports
        </Text>
        <Text
          fontWeight="700"
          color="rgba(126, 130, 153, 1)"
          textAlign="center"
        >
          Currently you have no data for the reports to be generated. Once you
          start generating traffic through the Balance application the reports
          will be shown.
        </Text>
      </VStack>

      <Img src="/no-report-data.svg" />
    </VStack>
  );
};
