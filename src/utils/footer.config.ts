import type { SvgIconComponent } from "@mui/icons-material";
import {
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";

export type FooterSocialConfigType = {
  Icon: SvgIconComponent;
  iconHref: string;
}[];

export const footerSocialConfig: FooterSocialConfigType = [
  {
    Icon: GitHubIcon,
    iconHref: "https://github.com/adiulalam",
  },
  {
    Icon: LinkedInIcon,
    iconHref: "https://www.linkedin.com/in/adiul-alam-adil-717b5a172/",
  },
  {
    Icon: TwitterIcon,
    iconHref: "https://twitter.com/AlamAdiul",
  },
  {
    Icon: EmailIcon,
    iconHref: "mailto:adiulalam@gmail.com",
  },
];
