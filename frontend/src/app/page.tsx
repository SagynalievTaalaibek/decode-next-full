'use client';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, IconButton } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { DecodeEncode } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axiosApi from '@/axiosApi';

export default function Home() {
  const [state, setState] = useState<DecodeEncode>({
    encoded: '',
    decoded: '',
    password: ''
  });

  const mutation = useMutation({
    mutationFn: async ({value, buttonId}: { value: DecodeEncode, buttonId: string }) => {
      let message;
      let link: string = '';

      if (buttonId === 'encode') {
        link = '/encode';

        message = {
          password: value.password,
          message: value.encoded,
        };
      }

      if (buttonId === 'decode') {
        link = '/decode';

        message = {
          password: value.password,
          message: value.decoded,
        };
      }

      const response = await axiosApi.post(link, message);
      const data = response.data;
      if (buttonId === 'encode') {
        setState(prevState => ({
          ...prevState,
          decoded: data.encoded,
          encoded: '',
        }))
      }

      if (buttonId === 'decode') {
        setState(prevState => ({
          ...prevState,
          encoded: data.decoded,
          decoded: '',
        }))
      }
    }
  });


  const submitFormHandler = async (buttonId: string, event: React.FormEvent) => {
    event.preventDefault();
    await mutation.mutateAsync({value: state, buttonId});
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '25ch'},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="encoded"
          name="encoded"
          label="Encode message"
          multiline
          rows={4}
          value={state.encoded}
          onChange={(event) => inputChangeHandler(event)}
        />
      </div>
      <Grid container>
        <Grid item>
          <TextField
            error={state.password.length === 0}
            id="password" label="Password"
            type="text"
            name="password"
            value={state.password}
            onChange={(event) => inputChangeHandler(event)}
          />
        </Grid>
        <Grid item sx={{p: 1}}>
          <IconButton
            size={'large'}
            type="submit"
            id="encode"
            onClick={(event) => submitFormHandler('encode', event)}
          >
            <ArrowDownwardIcon/>
          </IconButton>
          <IconButton
            size={'large'}
            type="submit"
            id="decode"
            onClick={(event) => submitFormHandler('decode', event)}
          >
            <ArrowUpwardIcon/>
          </IconButton>
        </Grid>
      </Grid>
      <div>
        <TextField
          id="decoded"
          name="decoded"
          label="Decoded message"
          multiline
          rows={4}
          value={state.decoded}
          onChange={(event) => inputChangeHandler(event)}
        />
      </div>
    </Box>
  );
}
