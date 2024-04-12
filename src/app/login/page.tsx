"use client";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Login as LoginIcon } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Copyright from "@/components/Copyright";
import {PageNames} from "@/domain/contracts/PageNames";
import {NotificationError} from "@/domain/contracts/errors/NotificationError";
import {useState} from "react";
import {loginApi} from "@/api/loginApi";
import {LoginCredential} from "@/domain/contracts/LoginCredential";
import {useRouter} from "next/navigation";
import {ApplicationErrorCodes} from "@/domain/contracts/errors/ApplicationErrorCodes";
import {Alert} from "@mui/material";
import {AuthenticationHandler} from "@/domain/login/AuthenticationHandler";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const notificationError = new NotificationError();

    const credential = new LoginCredential(
      data.get('email') as string,
      data.get('password') as string
    );

    setLoading(true);
    const token = await loginApi(credential, notificationError, router);

    if (notificationError.hasAnyError()) {
      setLoading(false);

      const error = notificationError.getFirstErrorCode();

      switch (error) {
        case ApplicationErrorCodes.invalidCredential:
          setErrorMessage("Email ou senha inválidos.");
          break;
        case ApplicationErrorCodes.failToCreateToken:
          setErrorMessage("Falha ao tentar criar um token.");
          break;
        default:
          setErrorMessage("Alguma coisa inesperada aconteceu.")
      }

      return;
    }

    new AuthenticationHandler().setToken(token);

    router.push(PageNames.home);
    setLoading(false);
  };

  const clearError = () => {
    setErrorMessage('');
  }

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Entrar
            </Typography>
            <Box component="form" onSubmit={handleSubmit} onSelect={clearError} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
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
                disabled={loading || errorMessage !== ''}
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={PageNames.signUp} variant="body2">
                    {"Não tem uma conta? Cadastre-se"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}
