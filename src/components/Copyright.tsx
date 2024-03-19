import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { SpacingProps } from "@mui/system";

export default function Copyright(props: { sx?: SpacingProps }) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <MuiLink color="inherit" href="https://univesp.br/">
        Projeto Integrador I
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
