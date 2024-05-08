import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import MenuWrapper from "@/components/MenuWrapper";

export default function Home() {
  return (
    <MenuWrapper>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh'
          }}
        >
          <Button
            variant="contained"
            size="large"
          >
            Quero contratar um serviço
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Quero ofereçer um serviço
          </Button>
        </Box>
      </Container>
    </MenuWrapper>
  );
}
