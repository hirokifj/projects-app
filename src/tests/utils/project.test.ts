import { getProjectJoinedTag } from '@/utils/project';
import { FbProject, Tag } from '@/types/project';

describe('getProjectJoinedTag function', () => {
  test('should return formatted project.', () => {
    const tags: Tag[] = [
      { id: 'tagid1', label: 'タグ1' },
      { id: 'tagid2', label: 'タグ2' },
      { id: 'tagid3', label: 'タグ3' },
      { id: 'tagid4', label: 'タグ4' },
    ];
    const project: FbProject = {
      id: '1111',
      title: 'project1',
      description: 'test project1',
      commentsCount: 2,
      likesCount: 2,
      language: '日本語',
      tagIds: ['tagid1', 'tagid3'],
      url: 'testurl',
      imgPath: 'testimgpaht',
    };

    expect(getProjectJoinedTag(project, tags)).toEqual({
      id: '1111',
      title: 'project1',
      description: 'test project1',
      commentsCount: 2,
      likesCount: 2,
      language: '日本語',
      tags: [
        { id: 'tagid1', label: 'タグ1' },
        { id: 'tagid3', label: 'タグ3' },
      ],
      url: 'testurl',
      imgPath: 'testimgpaht',
    });
  });

  test('should not include tag does not exist in tag list.', () => {
    const tags: Tag[] = [
      { id: 'tagid1', label: 'タグ1' },
      { id: 'tagid2', label: 'タグ2' },
      { id: 'tagid3', label: 'タグ3' },
      { id: 'tagid4', label: 'タグ4' },
    ];
    const project: FbProject = {
      id: '1111',
      title: 'project1',
      description: 'test project1',
      commentsCount: 2,
      likesCount: 2,
      language: '日本語',
      tagIds: ['tagid111'],
      url: 'testurl',
      imgPath: 'testimgpaht',
    };

    expect(getProjectJoinedTag(project, tags)).toEqual({
      id: '1111',
      title: 'project1',
      description: 'test project1',
      commentsCount: 2,
      likesCount: 2,
      language: '日本語',
      tags: [],
      url: 'testurl',
      imgPath: 'testimgpaht',
    });
  });
});
