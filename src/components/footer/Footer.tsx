import { Grid, Container, Typography } from "@mui/material";
import { FooterSocial } from ".";
import Link from "next/link";

export const Footer = () => {
  return (
    <Container className="relative block">
      <Grid
        container
        className="flex-col items-center justify-between gap-1 py-1 md:flex-row"
      >
        <Grid item xs={12} md="auto">
          <Link href={"/"}>
            <Typography className="hover:text-secondary">
              &copy; {new Date().getFullYear()} Adiul Alam Adil
            </Typography>
          </Link>
        </Grid>

        <Grid item xs={12} md="auto">
          <Link href={"http://adiulalamadil.me"}>
            <Typography className="hover:text-secondary">
              www.adiulalamadil.me
            </Typography>
          </Link>
        </Grid>

        <Grid item xs={12} md="auto">
          <FooterSocial />
        </Grid>
      </Grid>
    </Container>
  );
};
