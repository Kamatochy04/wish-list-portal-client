import { useEffect } from 'react';
import AOS from 'aos';

const useAos = () => {
  useEffect(() => {
    AOS.init({});

    return () => {
      AOS.refresh();
    };
  }, []);
};

export default useAos;
