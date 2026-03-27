import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router-dom";

const LinkBehavior = forwardRef<HTMLAnchorElement, LinkProps>(
    (props, ref) => <Link ref={ref} {...props} />
);

export default LinkBehavior;
