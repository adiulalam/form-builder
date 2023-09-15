import { IconButton, Tooltip, Zoom } from "@mui/material";
import { api } from "@/utils/api";
import { useContext } from "react";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { FormContext } from "@/store/FormProvider";

export const FormFavourite = () => {
  const { isFavourite, id } = useContext(FormContext);
  const { form } = api.useContext();

  const { mutate } = api.form.updateFormFavourite.useMutation({
    onSuccess: () => form.getForms.invalidate(),
  });

  const onClickHandler = () => {
    mutate({ body: { isFavourite: !isFavourite }, params: { id } });
  };

  return (
    <Tooltip title="Mark as favourite">
      <IconButton onClick={onClickHandler}>
        {isFavourite ? (
          <Zoom in={isFavourite}>
            <FavoriteIcon />
          </Zoom>
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};
