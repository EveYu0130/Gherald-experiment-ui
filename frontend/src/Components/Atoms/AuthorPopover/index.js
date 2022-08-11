import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {ReactComponent as GheraldIcon} from "../../../icons/gherald.svg";
import {SvgIcon} from "@mui/material";

export default function AuthorPopover({author, authorPriorChanges, authorPriorBugs}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <SvgIcon component={GheraldIcon} inheritViewBox onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}/>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                    p: 3
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography variant="h6" sx={{ px: 3, pt: 2 }}>{author.name} — {author.email}</Typography>
                <Typography variant="subtitle1" sx={{ px: 3, py: 2 }}>GHERALD author risk: author {author.name} has made {authorPriorBugs} prior bugs among {authorPriorChanges} changes.</Typography>
            </Popover>
        </div>
    );
}
