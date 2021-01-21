import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useProjectTags } from '@/hooks/project/useProjectTags';
import { fetchProjects } from '@/api/projects';
import { Tag } from '@/types/tag';
import { Language } from '@/types/language';
import { getProjectJoinedTag } from '@/utils/project';
import { getProjectsFetcherKey } from './fetcherKey';

export const useProjects = () => {
  const { tags: tagsData, error: tagsError } = useProjectTags();
  const [selectedTagId, setSelectedTagId] = useState<Tag['id']>('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | ''>('');

  const {
    data: projectsData,
    error: projectsError,
  } = useQuery(
    getProjectsFetcherKey({ tag: selectedTagId, language: selectedLanguage }),
    () => fetchProjects({ tag: selectedTagId, language: selectedLanguage }),
  );

  const projects = useMemo(() => {
    if (projectsData && tagsData) {
      return projectsData.map((project) =>
        getProjectJoinedTag(project, tagsData),
      );
    }
    return undefined;
  }, [projectsData, tagsData]);

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
