import { footerSocialConfig } from "@/utils/footer.config";
import { Grid, Link } from "@mui/material";

export const FooterSocial = () => {
  return (
    <Grid container className="gap-3">
      {footerSocialConfig.map(({ Icon, iconHref }, index) => (
        <Grid item key={index}>
          <Link
            href={iconHref}
            target="_blank"
            rel="noreferrer"
            className="text-inherit hover:text-secondary"
          >
            <Icon className="text-xl" />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
