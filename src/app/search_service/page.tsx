"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Alert, IconButton, InputAdornment} from "@mui/material";
import MenuWrapper from "@/components/MenuWrapper";
import SearchIcon from '@mui/icons-material/Search';
import {NotificationError} from "@/domain/contracts/errors/NotificationError";
import {ApplicationErrorCodes} from "@/domain/contracts/errors/ApplicationErrorCodes";
import Container from "@mui/material/Container";
import {searchServiceApi} from "@/api/searchServiceApi";
import {SearchService} from "@/domain/contracts/SearchService";
import {Service} from "@/domain/contracts/Service";
import ServiceBox from "@/app/search_service/serviceBox";

export default function SearchServiceScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const searchService = new SearchService(
      data.get("service") as string,
    );

    const notificationError = new NotificationError();

    setLoading(true);
    const servicesResponse = await searchServiceApi(searchService, notificationError, router);

    if (notificationError.hasAnyError()) {
      setLoading(false);

      const error = notificationError.getFirstErrorCode();

      switch (error) {
        case ApplicationErrorCodes.notMappedError:
          setErrorMessage("Alguma coisa inesperada aconteceu.")
          break;
        default:
          setErrorMessage("Alguma coisa inesperada aconteceu.")
      }

      return;
    }

    setServices(servicesResponse);
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
            height: '90vh'
          }}
        >
          <Box component="form" onSubmit={handleSubmit} onSelect={clearError} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="service"
                  fullWidth
                  id="service"
                  label="Qual serviço você procura?"
                  autoFocus
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                  }}
                />
              </Grid>
            </Grid>
            {
              errorMessage &&
              <Alert sx={ {mt: 2} } severity="error">
                {errorMessage}
              </Alert>
            }
          </Box>
          {services.map(item => <ServiceBox key={item.id} service={item} />)}
        </Box>
      </Container>
    </MenuWrapper>
  );
}
