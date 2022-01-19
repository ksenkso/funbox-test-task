import './Input.scss';
import PropTypes from 'prop-types';
import { useClassNames } from '../../hooks/useClassNames/useClassNames.js';

export const Input = ({ classNames = [], ...props }) => {
  const className = useClassNames(['Input', ...classNames]);

  return (
    <input
      className={className}
      {...props}
    />
  );
};

Input.propTypes = {
  classNames: PropTypes.arrayOf(PropTypes.string),
}
