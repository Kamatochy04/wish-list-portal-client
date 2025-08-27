import { useGetCurrentUserQuery } from '@/features/user/api/user.api';
import { useEffect } from 'react';

// eslint-disable-next-line no-undef
const GlobalUserLoader: React.FC = () => {
  const { data } = useGetCurrentUserQuery();

  useEffect(() => {
    console.log(data);
  });

  return null;
};

export default GlobalUserLoader;
