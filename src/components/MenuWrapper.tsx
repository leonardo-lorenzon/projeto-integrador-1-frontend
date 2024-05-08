import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import Copyright from "@/components/Copyright";
import {AppBar, IconButton, Toolbar} from "@mui/material";
import Box from "@mui/material/Box";
import {Menu as MenuIcon, Engineering as EngineeringIcon} from '@mui/icons-material';

export default function MenuHeader(props: { children: React.ReactNode }) {
  return (
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <EngineeringIcon fontSize="large" />
              <Box />
            </Toolbar>
          </AppBar>
        </Box>
        {props.children}
        <Copyright />
      </Box>
  );
}
