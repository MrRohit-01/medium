
import { BlogType } from '../hooks/useBlogs';

import { atom, selectorFamily } from 'recoil';

export const blogsState = atom<BlogType[]>({
  key: 'blogsState',
  default: [],
});

export const blogByIdSelector = selectorFamily<BlogType | null, string>({
  key: 'blogByIdSelector',
  get: (id) => ({ get }) => {
    const blogs = get(blogsState);
    return blogs.find((blog) => blog.id === id) || null
  },
});
