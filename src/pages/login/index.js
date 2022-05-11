import React, { useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMyContext } from "../../providers/MyContext";
import { postAuthentication } from "../../service/authentication";

import Copyright from '../../components/Copyright';
import GraphicsImages from '../../images/graphicsImages.svg';

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3f51b5",
    },
  }
})

const LoginPage = () => {
  const context = useMyContext();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await postAuthentication(context, user, password);
      console.log(result)
    } catch (error) {  }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ mb: 2 }}>
            <img
              style={{ width: '100%' }}
              src={GraphicsImages}
              alt='GraphicsImages'
            />
          </Box>

          <Typography component="h1" variant="h5" color="primary" >
            Bem-vindo ao I BLUE IT Analytics!
          </Typography>

          <Box
            sx={{ marginTop: 5 }}
            component="form"
            onSubmit={(e) => handleSubmit(e)}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Usuário"
              type='user'
              name="user"
              id='user'
              autoComplete="user"
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha"
              type='password'
              name="password"
              id='password'
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Criar Conta I BLUE IT!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} theme={theme} />
      </Container>
    </ThemeProvider >
  );
}

export default LoginPage;