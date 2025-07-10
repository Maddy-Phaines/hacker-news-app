// src/components/AppTooltip.jsx
import Tooltip from "@mui/material/Tooltip";

const AppTooltip = ({
  title,
  children,
  placement = "bottom",
  arrow = true,
  ...rest
}) => {
  return (
    <Tooltip title={title} placement={placement} arrow={arrow} {...rest}>
      {children}
    </Tooltip>
  );
};

export default AppTooltip;
