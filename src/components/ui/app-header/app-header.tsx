import { FC } from 'react';
import styles from './app-header.module.css';
import { LinkStylesProps, TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

const linkStyles = ({ isActive }: LinkStylesProps) =>
  `${styles.link} ${isActive ? styles.link_active : ''}`;

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to='/' className={linkStyles}>
          <BurgerIcon type={'primary'} />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </NavLink>
        <NavLink to='/feed' className={linkStyles}>
          <ListIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </NavLink>
      </div>
      <Link to='/'>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
      </Link>
      <div className={styles.link_position_last}>
        <NavLink to='/profile' className={linkStyles}>
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </div>
    </nav>
  </header>
);
