import { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';
import SearchableSelect, { Option } from '@/components/core/SearchableSelect';
import { Tag } from '@/types/tag';

const TagSelect: FC<{
  tags: Tag[];
  onSelect: (targetId: Tag['id']) => void;
}> = ({ tags, onSelect }) => {
  const options: Option[] = tags.map((tag) => ({
    label: tag.label,
    value: tag.id,
  }));

  const handleOptionSelect = (value: Option['value']) => {
    onSelect(value);
  };

  return (
    <Box>
      <Text color="gray.600">テーマ</Text>
      <Box mt="2">
        <SearchableSelect
          searchPlaceholder="テーマ"
          options={options}
          onSelectOption={handleOptionSelect}
        />
      </Box>
    </Box>
  );
};

export default TagSelect;
