import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';
import './OrganisationDesRecherches.css';
import {Box, Button, Container} from '@material-ui/core';
import {useRecherches} from '../api/recherches.hooks';
import {Erreur} from '../components/Erreur';
import {FenetreDeSaisieDeRecherche} from './FenetreDeSaisieDeRecherche';
import {useIndividus} from '../api/arbres.hooks';
import {ListeDesRecherches} from './ListeDesRecherches';
import {Add} from '@material-ui/icons';
import {useAuth0} from '@auth0/auth0-react';

export const OrganisationDesRecherches = () => {
  const {isAuthenticated} = useAuth0();
  const {recherchesEnCoursDeChargement, recherchesEnErreur, recherches} = useRecherches(isAuthenticated);
  const {individusEnCoursDeChargement, individusEnErreur, individus} = useIndividus(isAuthenticated);

  const [fenetreDeSaisieOuverte, setFenetreDeSaisieOuverte] = useState(false);

  return <>
    <Container maxWidth="lg" className="OrganisationDesRecherches">
      <Typography variant="h4" className="OrganisationDesRecherchesTitre">Organisation des recherches</Typography>
      <Box display="flex" justifyContent="flex-end">
        <Button
          startIcon={<Add/>}
          variant="contained"
          color="primary"
          onClick={() => setFenetreDeSaisieOuverte(true)}>Ajouter</Button>
      </Box>
      <ListeDesRecherches
        enCoursDeChargement={recherchesEnCoursDeChargement || individusEnCoursDeChargement}
        recherches={recherches?.recherches} />
    </Container>
    <FenetreDeSaisieDeRecherche
      ouverte={fenetreDeSaisieOuverte}
      fermer={() => setFenetreDeSaisieOuverte(false)}
      individus={individus}
    />
    {recherchesEnErreur && <Erreur message={recherchesEnErreur}/>}
    {individusEnErreur && <Erreur message={individusEnErreur}/>}
  </>;
}
