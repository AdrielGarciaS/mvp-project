import { useEffect, useState } from 'react';
import {
  Button,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

interface Props {
  onChange?(value: string): void;
  items: ListItem[];
  isLoading?: boolean;
}

export const PopoverList = (props: Props) => {
  const { onChange, items, isLoading } = props;

  const [selected, setSelected] = useState<ListItem>(items?.[0]);

  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();

  const handleSelect = (item: ListItem) => () => {
    onChange?.(item.value);
    setSelected(item);
    onClose();
  };

  useEffect(() => {
    if (!items?.length) return;

    handleSelect(items[0])();
  }, [items?.length]);

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          colorScheme="teal"
          isLoading={isLoading}
          rightIcon={<TriangleDownIcon />}
          size="sm"
          onClick={onToggle}
          minW="8rem"
          justifyContent={!isLoading ? 'space-between' : 'center'}
        >
          {selected?.label}
        </Button>
      </PopoverTrigger>
      <PopoverContent bg="teal" color="white" w="auto">
        <PopoverArrow bg="teal" />
        <PopoverBody p={0}>
          <List as={VStack} alignItems="flex-start">
            {items?.map(item => (
              <ListItem
                key={item.value}
                as={Button}
                colorScheme="teal"
                size="sm"
                variant="unstyled"
                w="full"
                textAlign="left"
                px="1rem"
                _hover={{ bg: 'teal.300' }}
                minW="10rem"
                borderRadius={0}
                onClick={handleSelect(item)}
              >
                {item.label}
              </ListItem>
            ))}
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
