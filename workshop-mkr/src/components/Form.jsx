import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

export const Form = ({ handleOnChange, value }) => {
    return (
        <form  onSubmit={e => handleOnChange(e)}>
            <Button variant="contained" type="submit">Search</Button>
            <TextField name="pokemon"  value={value} label="Pokemon" variant="outlined" />
        </form>
    )
}
