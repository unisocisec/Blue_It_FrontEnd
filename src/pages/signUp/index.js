import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MaterialLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useMyContext } from "../../providers/MyContext";
import { pathRoutes } from "../../providers/Routes.jsx";
import Copyright from '../../components/copyright';
import GraphicsImages from '../../images/graphicsImages.svg';
import { requestRegisterUsers } from "../../services/api/signUp";


export default function SignUp() {
  const context = useMyContext();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      context.addNotification('error', 'Senhas diferentes');
      document.getElementById('confirmPassword').focus();
    } else {
      try {
        const userData = {
          fullname: `${firstName} ${lastName}`,
          username: userName, password, email,
          role: 'Administrator',
        };
        await requestRegisterUsers(context, userData);
        navigate(pathRoutes.LOGIN)
      } catch (error) { }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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

        <Typography component="h1" variant="h5">
          Crie uma Conta I BLUE IT!
        </Typography>

        <Typography component="h6" variant="h6">
          Preencha os campos abaixo para criar a sua nova conta.
        </Typography>

        <Box
          component="form"
          sx={{ mt: 3 }}
          onSubmit={handleSubmit}
        >

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                autoFocus
                label="Nome"
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Sobrenome"
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Nome de usuário"
                type="text"
                id="userName"
                name="userName"
                autoComplete="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Senha"
                type="password"
                id="password"
                name="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirmar senha"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Criar Conta
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <MaterialLink to={pathRoutes.LOGIN} variant="body2" component={Link}>
                Já possui uma Conta I BLUE IT? Clique aqui!
              </MaterialLink>
            </Grid>
          </Grid>

        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};