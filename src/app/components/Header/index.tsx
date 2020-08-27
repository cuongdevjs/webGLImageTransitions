/**
 *
 * Header
 *
 */
import React, { memo } from 'react';
import { HeaderWrapper } from './styled';
import {
  Toolbar,
  IconButton,
  Typography,
  Badge,
  AppBar,
  makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx';

interface Props {
  onToggleSideMenu: () => void;
}

// const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  // appBarShift: {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  menuButton: {
    marginRight: 36,
  },
  // menuButtonHidden: {
  //   display: 'none',
  // },
  title: {
    flexGrow: 1,
  },
}));

export const Header = memo(({ onToggleSideMenu }: Props) => {
  const classes = useStyles();
  return (
    <HeaderWrapper>
      <AppBar
        position="absolute"
        className={clsx(
          classes.appBar,
          // isOpenSideMenu && classes.appBarShift,
        )}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onToggleSideMenu}
            className={clsx(
              classes.menuButton,
              // isOpenSideMenu && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </HeaderWrapper>
  );
});
