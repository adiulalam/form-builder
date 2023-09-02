import type { SvgIconComponent } from "@mui/icons-material";
import {
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

export type FooterSocialConfigType = {
  Icon: SvgIconComponent;
  iconHref: string;
}[];

export const footerSocialConfig: FooterSocialConfigType = [
  {
    Icon: TwitterIcon,
    iconHref: "https://twitter.com/AlamAdiul",
  },
  {
    Icon: LinkedInIcon,
    iconHref: "https://www.linkedin.com/in/adiul-alam-adil-717b5a172/",
  },
  {
    Icon: FacebookIcon,
    iconHref: "https://www.facebook.com/adiulalam",
  },
  {
    Icon: EmailIcon,
    iconHref: "mailto:adiulalam@gmail.com",
  },
];
