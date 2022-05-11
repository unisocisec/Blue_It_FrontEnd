import React, { useState } from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


const Copyright = (props) => {
  return (
    <Typography theme={props.theme} variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://unisocisec.cf/">
        ㄩ几丨丂ㄖ匚丨丂乇匚
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;