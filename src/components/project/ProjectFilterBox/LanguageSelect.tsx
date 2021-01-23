import { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { SearchableSelect, Option } from '@/components/core/SearchableSelect';
import { Language } from '@/types/project';

export const LanguageSelect: FC<{
  onSelect: (lang: Language | '') => void;
}> = ({ onSelect }) => {
  const options: Option[] = [
    {
      label: '日本語',
      value: '日本語',
    },
    {
      label: '英語',
      value: '英語',
    },
  ];

  const handleOptionSelect = (value: Option['value']) => {
    if (value === '日本語' || value === '英語') {
      onSelect(value);
    } else {
      onSelect('');
    }
  };

  return (
    <Box>
      <Text color="gray.600">言語</Text>
      <Box mt="2">
        <SearchableSelect
          searchPlaceholder="言語"
          options={options}
          onSelectOption={handleOptionSelect}
        />
      </Box>
    </Box>
  );
};
