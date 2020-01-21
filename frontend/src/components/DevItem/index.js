import React from 'react';
import api from '../../services/api';
import GitHubIcon from '@material-ui/icons/GitHub';
import EditIcon from '@material-ui/icons/Edit';
// import { withStyles } from "@material-ui/core/styles";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import { Paper, Typography, Grid, Card, CardHeader, CardContent, Avatar, List, ListItem, ListItemText, IconButton } from "@material-ui/core";

import AlertDelete from '../Alert/Delete';

import './styles.css';

function DevItem( { dev, handleDeleteDev, ...props } ) {
  // console.log(props);
  const AlertData = {
    title: `Tem certeza que deseja excluir o Dev ${dev.name === 'undefiened' || dev.name === null ? dev.github_username : dev.name}?`,
    type: "warning",
    text: "Não será possível reverter essa ação!",
    footer: ""
  };

  async function deleteDev() {
    // console.log(`> id dev to del: ${dev._id}`);
    const response = await api.delete(`/devs/${dev._id}`);
    handleDeleteDev(response.data.dev);
    // console.log(response);
  };

  // async function deleteDev(e) {
  //   e.preventDefault();

  //   await console.log(dev);
  // }

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <div className="buttons">
        <a href={`https://github.com/${dev.github_username}/`} rel="noopener noreferrer" target="_blank" title="Perfil GitHiub" alt="Perfil GitHiub"><GitHubIcon className="icon">Perfil GitHub</GitHubIcon></a>
        <a href={`https://github.com/${dev.github_username}/`} rel="noopener noreferrer" target="_blank" title="Editar" alt="Editar"><EditIcon className="icon">Editar</EditIcon></a>
        <a href="./#"><AlertDelete className="icon" {...AlertData} onClick={deleteDev}>Deletar</AlertDelete></a>
      </div>
    </li>
  );
}

export default DevItem;
