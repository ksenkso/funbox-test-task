import './Button.scss';
import { useClassNames } from '../../hooks/useClassNames/useClassNames.js';
import PropTypes from 'prop-types';

export const Button = ({ children, classNames = [], ...props }) => {
  const className = useClassNames(['input', ...classNames]);

  return (
    <button
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  classNames: PropTypes.arrayOf(PropTypes.string),
}
