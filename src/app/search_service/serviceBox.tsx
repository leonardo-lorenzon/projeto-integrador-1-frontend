import Box from "@mui/material/Box";
import * as React from "react";
import {Service} from "@/domain/contracts/Service";
import Typography from "@mui/material/Typography";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function ServiceBox(props: { service: Service }) {
  const service = props.service;

  const serviceType = service.type.toLowerCase();

  return (
    <Box sx={{
      mt: 2,
      border: 1,
      borderRadius: 1
    }}>
      <Box sx={{
        my: 1,
        ml: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Box>
          <Typography variant="h5" color="primary">
            {serviceType.toLowerCase().charAt(0).toUpperCase() + serviceType.slice(1)}
          </Typography>
          <Typography variant="body2">
            {service.description}
          </Typography>
          <Typography variant="body1">
            {service.city} - {service.state}
          </Typography>
        </Box>

        <ChevronRightIcon fontSize="large" />
      </Box>

    </Box>
  )
}
