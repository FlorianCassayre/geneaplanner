import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {Container} from "@material-ui/core";
import './ApportDeCorrections.css';
import {CorrectionsEnCoursDeChargement} from "./CorrectionsEnCoursDeChargement";
import {AucuneCorrection} from "./AucuneCorrection";
import {FenetreDeSaisie} from "./FenetreDeSaisie";
import {useCorrections} from "../api/corrections.hooks";
import {useIndividus} from "../api/arbres.hooks";
import {Erreur} from "../components/Erreur";
import {ListeDesCorrections} from "./ListeDesCorrections";

export const ApportDeCorrections = () => {
    const [fenetreDeSaisieOuverte, setFenetreDeSaisieOuverte] = useState(false);

    const {correctionsEnCoursDeChargement, correctionsEnErreur, corrections} = useCorrections();
    const {individusEnCoursDeChargement, individusEnErreur, individus} = useIndividus();

    return (
        <>
            <Container maxWidth="md">
                <Typography variant="h4" className="ApportDeCorrectionsTitre">Apporter des corrections</Typography>
                {(correctionsEnCoursDeChargement || individusEnCoursDeChargement) && <CorrectionsEnCoursDeChargement/>}
                {corrections?.length > 0 && !correctionsEnCoursDeChargement && <ListeDesCorrections corrections={corrections} setFenetreDeSaisieOuverte={setFenetreDeSaisieOuverte} />}
                {corrections?.length === 0 && !correctionsEnCoursDeChargement && <AucuneCorrection setFenetreDeSaisieOuverte={setFenetreDeSaisieOuverte} />}
            </Container>
            <FenetreDeSaisie
                ouverte={fenetreDeSaisieOuverte}
                fermer={() => setFenetreDeSaisieOuverte(false)}
                individus={individus}
            />
            {correctionsEnErreur && <Erreur message={correctionsEnErreur}/>}
            {individusEnErreur && <Erreur message={individusEnErreur}/>}
        </>
    );
}
