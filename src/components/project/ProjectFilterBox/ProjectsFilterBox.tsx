import { FC } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { TagSelect } from '@/components/project/ProjectFilterBox/TagSelect';
import { LanguageSelect } from '@/components/project/ProjectFilterBox/LanguageSelect';
import { Tag } from '@/types/tag';
import { Language } from '@/types/language';

export const ProjectsFilterBox: FC<{
  tags: Tag[];
  onSelectTag: (tagId: Tag['id']) => void;
  onSelectLanguage: (language: Language | '') => void;
}> = ({ tags, onSelectTag, onSelectLanguage }) => (
  <Box width="100%" borderRadius={8} backgroundColor="white" px={4} py={4}>
    <Stack spacing="4">
      <TagSelect tags={tags} onSelect={onSelectTag} />
      <LanguageSelect onSelect={onSelectLanguage} />
    </Stack>
  </Box>
);
