"use client";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppRegistration from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from "@/components/Copyright";
import {PageNames} from "@/domain/contracts/PageNames";
import {UserRegister} from "@/domain/contracts/UserRegister";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {registerUserApi} from "@/api/registerUserApi";
import {Alert} from "@mui/material";
import {NotificationError} from "@/domain/contracts/errors/NotificationError";
import {ApplicationErrorCodes} from "@/domain/contracts/errors/ApplicationErrorCodes";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userRegister = new UserRegister(
      data.get('name') as string,
      data.get('surname') as string,
      data.get('email') as string,
      data.get('password') as string
    )

    const notificationError = new NotificationError();

    setLoading(true);
    await registerUserApi(userRegister, notificationError, router);

    if (notificationError.hasAnyError()) {
      setLoading(false);

      const error = notificationError.getFirstErrorCode();

      switch (error) {
        case ApplicationErrorCodes.userEmailExists:
          setErrorMessage('Email já registrado.');
          break;
        case ApplicationErrorCodes.failToCreateUserWithCredentials:
          setErrorMessage('Falha ao tentar criar usuário.');
          break;
        case ApplicationErrorCodes.notMappedError:
          setErrorMessage("Alguma coisa inesperada aconteceu.")
          break;
        default:
          setErrorMessage("Alguma coisa inesperada aconteceu.")
      }

      return;
    }

    router.push(PageNames.login);
    setLoading(false);
  };

  const clearError = () => {
    setErrorMessage('');
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AppRegistration />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastre-se
          </Typography>
          <Box component="form" onSubmit={handleSubmit} onSelect={clearError} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="surname"
                  label="Sobrenome"
                  name="surname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={PageNames.login} variant="body2">
                  Já tem uma conta? Entrar
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}
