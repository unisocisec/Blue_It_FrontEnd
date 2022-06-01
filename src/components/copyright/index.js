import React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="#11192A" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://unisocisec.cf/" target="_blank">
        ㄩ几丨丂ㄖ匚丨丂乇匚
      </Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;