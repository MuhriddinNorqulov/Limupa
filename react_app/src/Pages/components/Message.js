import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {useState, useEffect} from "react";


function Message({children, variant}) {



    return (
        <Stack sx={{ width: '100%', marginY: '1rem' }} spacing={2}>
            <Alert severity={variant}>{children}!</Alert>
        </Stack>
    );
}

export default Message