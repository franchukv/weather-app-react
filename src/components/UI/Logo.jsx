import { memo } from 'react';
import logo from '../../assets/images/svg/logo.svg';

const Logo = memo(() => {
  return (
    <div className="logo">
      <img src={logo} alt="" className="logo__icon" />
      <span className="logo__title">TypeWeather</span>
    </div>
  );
});

export default Logo;
