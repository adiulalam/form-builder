import { useContext, useState } from "react";
import { FormContext } from "@/store";
import { Divider, Typography, CardActions } from "@mui/material";
import { FormFavourite, FormTitle, FormShare, FormCardMenu } from ".";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Link from "next/link";
import { CustomCard } from "../shared";
dayjs.extend(localizedFormat);

export const FormCard = () => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const { id, status, updatedAt } = useContext(FormContext);
  const href = `/form/${id}`;

  const footerActions = (
    <CardActions disableSpacing className="flex flex-row justify-end">
      <FormFavourite />

      <FormShare />
    </CardActions>
  );

  const headerProps = {
    action: (
      <FormCardMenu isReadOnly={isReadOnly} setIsReadOnly={setIsReadOnly} />
    ),
    title: <FormTitle isReadOnly={isReadOnly} setIsReadOnly={setIsReadOnly} />,
    subheader: (
      <Link
        className="flex flex-row flex-wrap items-center gap-2"
        href={`/form/${id}`}
      >
        <Typography variant="subtitle1">
          {dayjs(updatedAt).format("LL")}
        </Typography>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Typography variant="subtitle2">{status}</Typography>
      </Link>
    ),
  };

  return (
    <CustomCard
      status={status}
      href={href}
      footerActions={footerActions}
      headerProps={headerProps}
    />
  );
};
