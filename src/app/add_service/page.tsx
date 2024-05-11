"use client";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ConstructionIcon from '@mui/icons-material/Construction';
import Typography from '@mui/material/Typography';
import {PageNames} from "@/domain/contracts/PageNames";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Alert} from "@mui/material";
import MenuWrapper from "@/components/MenuWrapper";
import {NotificationError} from "@/domain/contracts/errors/NotificationError";
import {ApplicationErrorCodes} from "@/domain/contracts/errors/ApplicationErrorCodes";
import {ServiceAdd} from "@/domain/contracts/ServiceAdd";
import Container from "@mui/material/Container";
import {addServiceApi} from "@/api/addServiceApi";

export default function AddService() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const service = new ServiceAdd(
      "135335d6-9ec0-41d7-b66e-26904d807f45", // TODO pass the correct accountId
      data.get('type') as string,
      data.get('description') as string,
      data.get('city') as string,
      data.get('state') as string,
      data.get('country') as string
    )

    const notificationError = new NotificationError();

    setLoading(true);
    await addServiceApi(service, notificationError, router);

    if (notificationError.hasAnyError()) {
      setLoading(false);

      const error = notificationError.getFirstErrorCode();

      switch (error) {
        case ApplicationErrorCodes.failToAddService:
          setErrorMessage('Falha ao inserir o novo serviço.');
          break;
        case ApplicationErrorCodes.notMappedError:
          setErrorMessage("Alguma coisa inesperada aconteceu.")
          break;
        default:
          setErrorMessage("Alguma coisa inesperada aconteceu.")
      }

      return;
    }

    router.push(PageNames.home);
    setLoading(false);
  };

  const clearError = () => {
    setErrorMessage('');
  }

  return (
    <MenuWrapper>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <ConstructionIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Adicionar serviço
          </Typography>
          <Box component="form" onSubmit={handleSubmit} onSelect={clearError} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="type"
                  required
                  fullWidth
                  id="type"
                  label="Tipo de serviço"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={3}
                  id="description"
                  label="Descrição"
                  name="description"
                />
              </Grid>
              <Grid item xs={12} sx={{mt: 2}}>
                <Typography component="h2" variant="h6">
                  Onde o serviço será oferecido?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="country"
                  label="País"
                  id="country"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  label="Estado"
                  id="state"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="Cidade"
                  name="city"
                  type="city"
                />
              </Grid>
            </Grid>
            {
              errorMessage &&
              <Alert sx={ {mt: 2} } severity="error">
                {errorMessage}
              </Alert>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || errorMessage !== ''}
            >
              Adicionar
            </Button>
          </Box>
        </Box>
      </Container>
    </MenuWrapper>
  );
}
