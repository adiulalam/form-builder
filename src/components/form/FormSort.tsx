import { type MenuProps } from "@mui/material/Menu";
import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Sort as SortIcon,
  TextRotateUp as TextRotateUpIcon,
  TextRotationDown as TextRotationDownIcon,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Typography,
} from "@mui/material";
import { useFormSort } from "@/store/useFormSort";
import { useRouter } from "next/router";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        // marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const sortItems: { name: string; value: string }[] = [
  { name: "Name", value: "title" },
  { name: "Status", value: "status" },
  { name: "Updated At", value: "updatedAt" },
  { name: "Favourite", value: "isFavourite" },
];

export const FormSort = () => {
  const { setOrder, setSort } = useFormSort();
  const { pathname, query, replace, push } = useRouter();
  const { sort, order } = query as { sort: string; order: "asc" | "desc" };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const sortMatched = sortItems.some((item) => item.value === sort);
    const orderMatched = order === "asc" || order === "desc";

    if (sortMatched && orderMatched) {
      setSort(sort);
      setOrder(order);
    } else {
      void replace({ pathname, query: "sort=title&order=desc" }, undefined, {
        shallow: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, order]);

  const onClickHandler = ({
    sort,
    order,
  }: {
    sort: string;
    order: "asc" | "desc";
  }) => {
    void push(
      {
        pathname,
        query: `sort=${sort}&order=${order}`,
      },
      undefined,
      {
        shallow: true,
      },
    );
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        disableElevation
        onClick={(e) => setAnchorEl(e.currentTarget)}
        size="large"
      >
        <Typography className="mr-2 hidden sm:block">SORT</Typography>
        <SortIcon />
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {sortItems.map((item, index) => (
          <MenuItem disableRipple key={index} selected={item.value === sort}>
            <Box
              className="flex flex-grow"
              onClick={() => onClickHandler({ sort: item.value, order })}
            >
              {item.name}
            </Box>
            {item.value === sort && (
              <IconButton
                onClick={() =>
                  onClickHandler({
                    sort,
                    order: order === "asc" ? "desc" : "asc",
                  })
                }
              >
                {order === "asc" ? (
                  <TextRotateUpIcon className="mr-0" />
                ) : (
                  <TextRotationDownIcon className="mr-0" />
                )}
              </IconButton>
            )}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};
