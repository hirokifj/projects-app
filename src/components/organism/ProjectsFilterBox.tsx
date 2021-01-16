import { FC } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import TagSelect from '@/components/organism/TagSelect';
import LanguageSelect from '@/components/organism/LanguageSelect';
import { Tag } from '@/types/tag';
import { Language } from '@/types/language';

const ProjectsFilterBox: FC<{
  tags: Tag[];
  onSelectTag: (tagId: Tag['id']) => void;
  onSelectLanguage: (language: Language | '') => void;
}> = ({ tags, onSelectTag, onSelectLanguage }) => (
  <Box
    width="100%"
    background="white"
    borderRadius={8}
    backgroundColor="white"
    px={4}
    py={4}
  >
    <Stack spacing="4">
      <TagSelect tags={tags} onSelect={onSelectTag} />
      <LanguageSelect onSelect={onSelectLanguage} />
    </Stack>
  </Box>
);

export default ProjectsFilterBox;
