import type { ReactNode } from "react";
import {
  EditNote as EditNoteIcon,
  FormatAlignJustify as FormatAlignJustifyIcon,
} from "@mui/icons-material";
import { CardHeader, Card } from "@mui/material";
import Link from "next/link";
import type { Status } from "@prisma/client";

type CardType = {
  status: Status;
  footerActions?: (JSX.Element & ReactNode) | null;
  href: string;
  headerProps: {
    action?: JSX.Element & ReactNode;
    title: JSX.Element & ReactNode;
    subheader: JSX.Element & ReactNode;
  };
};

export const CustomCard = ({
  footerActions = null,
  href,
  status,
  headerProps,
}: CardType) => {
  return (
    <Card
      className="flex w-full flex-col sm:max-w-sm shadow-md hover:shadow-lg"
      variant="outlined"
    >
      <CardHeader {...headerProps} />

      <Link className="w-1/1 flex self-center" href={href}>
        {status === "DRAFT" && <EditNoteIcon className="text-[12rem]" />}
        {status === "COMPLETED" && (
          <FormatAlignJustifyIcon className="text-[12rem]" />
        )}
      </Link>

      {footerActions && footerActions}
    </Card>
  );
};
