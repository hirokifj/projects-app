import { Tag } from '@/types/tag';
import { Language } from '@/types/language';

const projectBaseKey = 'projects/';

export const getProjectsFetcherKey = (options: {
  tag: Tag['id'];
  language: Language | '';
}) => [projectBaseKey, options.tag, options.language];

const projectTagBaseKey = 'tags/';

export const getProjectTagsFetcherKey = () => projectTagBaseKey;
