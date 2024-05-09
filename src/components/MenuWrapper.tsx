import * as React from 'react';
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
              >
                <MenuIcon />
              </IconButton>
              <EngineeringIcon fontSize="large" />
              <Box sx={{ pr: 4 }} />
            </Toolbar>
          </AppBar>
        </Box>
        {props.children}
        <Copyright />
      </Box>
  );
}
