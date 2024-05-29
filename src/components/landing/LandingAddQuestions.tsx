import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  ArrowDropDownCircle as ArrowDropDownCircleIcon,
  CheckBox as CheckBoxIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  Keyboard as KeyboardIcon,
} from "@mui/icons-material";
import type { Dispatch } from "react";
import type { PlaygroundAction } from "@/hooks/usePlaygroundReducer";
import { useRef, useState } from "react";
import { Type } from "@prisma/client";
import type { TypeMap } from "../question/QuestionType";

const options: TypeMap = [
  {
    type: Type.DROPDOWN,
    Icon: ArrowDropDownCircleIcon,
  },
  {
    type: Type.CHECKBOX,
    Icon: CheckBoxIcon,
  },
  {
    type: Type.RADIO,
    Icon: RadioButtonCheckedIcon,
  },
  {
    type: Type.INPUT,
    Icon: KeyboardIcon,
  },
];

export const LandingAddQuestions = ({
  dispatch,
}: {
  dispatch: Dispatch<PlaygroundAction>;
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = () => {
    const type = options[selectedIndex]!.type;
    dispatch({ type: "addQuestion", payload: { type } });
  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef}>
        <Button onClick={handleClick}>
          ADD {options[selectedIndex]!.type} Question
        </Button>
        <Button size="small" onClick={handleToggle}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {options.map(({ type, Icon }, index) => (
                    <MenuItem
                      key={index}
                      selected={index === selectedIndex}
                      disabled={index === selectedIndex}
                      onClick={() => handleMenuItemClick(index)}
                    >
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText>SELECT {type} Question</ListItemText>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
