import { useContext } from "react";
import { LogContext } from "@/store";
import { Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Link from "next/link";
import { CustomCard } from "../shared";
import { LogTitle } from ".";
dayjs.extend(localizedFormat);

export const LogCard = () => {
  const {
    updatedAt,
    form: { id },
  } = useContext(LogContext);
  const href = `/share/${id}`;

  const headerProps = {
    title: <LogTitle />,
    subheader: (
      <Link className="flex flex-row flex-wrap items-center gap-2" href={href}>
        <Typography variant="subtitle1">
          {dayjs(updatedAt).format("LL")}
        </Typography>

        <Divider orientation="vertical" variant="middle" flexItem />
      </Link>
    ),
  };

  return (
    <CustomCard status={"COMPLETED"} href={href} headerProps={headerProps} />
  );
};
