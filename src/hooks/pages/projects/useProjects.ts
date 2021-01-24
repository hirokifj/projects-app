import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useTags } from '@/hooks/shared/project/useTags';
import { fetchProjects } from '@/api/projects';
import { Tag, Language } from '@/types/project';
import { getProjectsFetcherKey } from '@/hooks/shared/project/fetcherKey';

export const useProjects = () => {
  const { tags: tagsData, error: tagsError } = useTags();
  const [selectedTagId, setSelectedTagId] = useState<Tag['id']>('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | ''>('');

  const {
    data: projects,
    error: projectsError,
  } = useQuery(
    getProjectsFetcherKey({ tag: selectedTagId, language: selectedLanguage }),
    () => fetchProjects({ tag: selectedTagId, language: selectedLanguage }),
  );

  const error = useMemo<unknown>(() => projectsError || tagsError, [
    projectsError,
    tagsError,
  ]);

  return {
    projects,
    tags: tagsData,
    error,
    setSelectedTagId,
    setSelectedLanguage,
  } as const;
};
