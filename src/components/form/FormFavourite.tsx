import { IconButton, Tooltip, Zoom } from "@mui/material";
import { api } from "@/utils/api";
import { useContext } from "react";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { FormContext } from "@/store";

export const FormFavourite = () => {
  const { isFavourite, id, questions } = useContext(FormContext);
  const { form } = api.useContext();

  const { mutate } = api.form.updateFormFavourite.useMutation({
    onSuccess: () =>
      questions
        ? form.getPrivateForm.invalidate({ id })
        : form.getForms.invalidate(),
  });

  const onClickHandler = () => {
    mutate({ body: { isFavourite: !isFavourite }, params: { id } });
  };

  return (
    <Tooltip title="Mark as favourite">
      <IconButton onClick={onClickHandler}>
        {isFavourite ? (
          <Zoom in={isFavourite}>
            <FavoriteIcon aria-label="FavoriteIcon" />
          </Zoom>
        ) : (
          <FavoriteBorderIcon aria-label="FavoriteBorderIcon" />
        )}
      </IconButton>
    </Tooltip>
  );
};
