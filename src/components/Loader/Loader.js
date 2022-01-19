import { ReactComponent as LoaderIcon } from '../../assets/loader.svg';
import './Loader.scss';
import { useEffect, useState } from 'react';

export const Loader = ({ delay = 100 }) => {
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    shouldRender && <LoaderIcon className="Loader" />
  );
};
