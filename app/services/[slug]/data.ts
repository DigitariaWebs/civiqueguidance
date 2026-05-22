export type Etape = { n: string; title: string; desc: string };

export type ServiceDetail = {
  title: string;
  intro: string;
  pourQui: string[];
  ceQueNousFaisons: string[];
  ceQueNousNeFaisonsPas: string[];
  transparenceText: string;
  documents: string[];
  etapes: Etape[];
};

const TRANSPARENCE_BASE =
  "DémarchesCivique ne modifie pas vos documents et n'écrit jamais à votre place.";

export const services: Record<string, ServiceDetail> = {
  "demandeurs-asile": {
    title: "Demandeurs d'asile",
    intro:
      "Un accompagnement humain et structuré pour vous aider à comprendre, organiser et préparer chaque étape de votre demande d'asile auprès de l'OFPRA et de la CNDA.",
    pourQui: [
      "Personnes fuyant des persécutions dans leur pays d'origine",
      "Demandeurs d'asile en cours de procédure OFPRA",
      "Personnes en attente d'entretien OFPRA ou CNDA",
    ],
    ceQueNousFaisons: [
      "Explication de la procédure OFPRA étape par étape",
      "Aide à l'organisation du récit de manière chronologique",
      "Vérification de la présence des documents nécessaires",
      "Préparation aux questions de l'entretien OFPRA",
    ],
    ceQueNousNeFaisonsPas: [
      "Écrire votre récit à votre place",
      "Modifier ou inventer des éléments de votre histoire",
      "Garantir l'obtention du statut de réfugié",
      "Donner des conseils juridiques",
    ],
    transparenceText: `${TRANSPARENCE_BASE} Nous vous accompagnons dans la compréhension et l'organisation de vos démarches, mais vous restez l'auteur de votre récit.`,
    documents: [
      "Attestation de demande d'asile",
      "Convocation OFPRA (si reçue)",
      "Pièce d'identité ou passeport",
      "Documents prouvant vos persécutions",
    ],
    etapes: [
      { n: "1", title: "Premier rendez-vous", desc: "Analyse de votre situation." },
      { n: "2", title: "Organisation", desc: "Aide à structurer votre histoire." },
      { n: "3", title: "Vérification", desc: "Contrôle de votre dossier." },
      { n: "4", title: "Préparation", desc: "Simulation d'entretien." },
    ],
  },

  etudiants: {
    title: "Étudiants (France & Canada)",
    intro:
      "Accompagnement à toutes les étapes de votre projet d'études : orientation, inscription, visa et installation en France ou au Canada.",
    pourQui: [
      "Étudiants souhaitant étudier en France ou au Canada",
      "Étudiants en France devant renouveler leur titre de séjour",
      "Étudiants changeant de statut (passage en salarié)",
    ],
    ceQueNousFaisons: [
      "Aide au choix de l'établissement et du programme",
      "Accompagnement pour l'inscription via Campus France ou Parcoursup",
      "Préparation du dossier de demande de visa étudiant",
      "Aide pour la demande de titre de séjour étudiant",
    ],
    ceQueNousNeFaisonsPas: [
      "Passer les examens ou tests de langue à votre place",
      "Garantir l'admission dans un établissement",
      "Garantir l'obtention du visa",
      "Falsifier des relevés de notes ou diplômes",
    ],
    transparenceText: `${TRANSPARENCE_BASE} Nous vous accompagnons dans vos démarches administratives.`,
    documents: [
      "Passeport valide",
      "Diplômes et relevés de notes",
      "Lettre d'admission (si déjà obtenue)",
      "Justificatifs de ressources financières",
    ],
    etapes: [
      { n: "1", title: "Orientation", desc: "Choix du programme et de l'école." },
      { n: "2", title: "Inscription", desc: "Aide aux démarches d'admission." },
      { n: "3", title: "Visa", desc: "Préparation du dossier consulaire." },
      { n: "4", title: "Installation", desc: "Démarches à l'arrivée (titre de séjour)." },
    ],
  },

  "titre-de-sejour": {
    title: "Titre de séjour",
    intro:
      "Accompagnement complet pour vos demandes et renouvellements de titre de séjour, en sécurisant chaque pièce du dossier.",
    pourQui: [
      "Première demande de titre de séjour",
      "Renouvellement de titre de séjour pluriannuel ou carte de résident",
      "Changement de statut",
    ],
    ceQueNousFaisons: [
      "Vérification de votre éligibilité",
      "Liste personnalisée des documents nécessaires",
      "Aide à la prise de rendez-vous en préfecture",
      "Aide à la préparation à l'examen du test civique",
      "Vérification de la complétude du dossier",
    ],
    ceQueNousNeFaisonsPas: [
      "Garantir la délivrance du titre par la préfecture",
      "Créer de faux justificatifs de domicile ou de travail",
      "Vous représenter physiquement à la préfecture",
    ],
    transparenceText: TRANSPARENCE_BASE,
    documents: [
      "Passeport valide",
      "Visa long séjour (si applicable)",
      "Justificatif de domicile",
      "Photos d'identité",
    ],
    etapes: [
      { n: "1", title: "Analyse", desc: "Vérification de votre situation." },
      { n: "2", title: "Constitution", desc: "Rassemblement des pièces." },
      { n: "3", title: "Rendez-vous", desc: "Prise de rendez-vous en préfecture." },
      { n: "4", title: "Suivi", desc: "Accompagnement jusqu'à la remise." },
    ],
  },

  naturalisation: {
    title: "Naturalisation française",
    intro:
      "Audit de votre dossier de naturalisation et préparation à l'entretien et aux tests de langue/civique.",
    pourQui: [
      "Résidents en France depuis au moins 5 ans",
      "Conjoints de Français (2 ans de mariage)",
      "Réfugiés et apatrides",
    ],
    ceQueNousFaisons: [
      "Vérification de votre éligibilité",
      "Constitution complète du dossier",
      "Préparation à l'entretien de naturalisation",
      "Aide pour le test de français (niveau B2)",
      "Aide à la préparation à l'examen du test civique",
    ],
    ceQueNousNeFaisonsPas: [
      "Garantir l'obtention de la nationalité",
      "Passer le test de langue à votre place",
      "Falsifier des documents d'état civil",
    ],
    transparenceText: TRANSPARENCE_BASE,
    documents: [
      "Acte de naissance avec filiation",
      "Justificatifs de résidence en France (5 dernières années)",
      "Avis d'imposition (3 dernières années)",
      "Diplôme de français (DELF B1 ou équivalent)",
    ],
    etapes: [
      { n: "1", title: "Éligibilité", desc: "Vérification des conditions." },
      { n: "2", title: "Dossier", desc: "Rassemblement des pièces." },
      { n: "3", title: "Préparation", desc: "Simulation de l'entretien." },
      { n: "4", title: "Dépôt", desc: "Soumission et suivi." },
    ],
  },

  "regroupement-familial": {
    title: "Regroupement familial",
    intro:
      "Aide à la préparation du dossier OFII pour faire venir votre conjoint et vos enfants mineurs en France.",
    pourQui: [
      "Étrangers résidant en France depuis au moins 18 mois",
      "Souhaitant faire venir conjoint et/ou enfants mineurs",
      "Disposant de ressources stables et suffisantes",
    ],
    ceQueNousFaisons: [
      "Vérification des conditions de ressources et de logement",
      "Constitution du dossier OFII",
      "Aide pour les documents à fournir",
      "Suivi de la procédure",
    ],
    ceQueNousNeFaisonsPas: [
      "Garantir l'accord de la préfecture ou de l'OFII",
      "Falsifier des fiches de paie ou des baux de location",
      "Intervenir dans les décisions consulaires",
    ],
    transparenceText: TRANSPARENCE_BASE,
    documents: [
      "Titre de séjour en cours de validité",
      "Justificatifs de ressources (12 derniers mois)",
      "Bail ou titre de propriété",
      "Actes de naissance et de mariage",
    ],
    etapes: [
      { n: "1", title: "Vérification", desc: "Contrôle des conditions requises." },
      { n: "2", title: "Dossier", desc: "Constitution du dossier OFII." },
      { n: "3", title: "Dépôt", desc: "Envoi et suivi de la demande." },
      { n: "4", title: "Arrivée", desc: "Démarches consulaires et accueil." },
    ],
  },

  regularisation: {
    title: "Régularisation administrative",
    intro:
      "Étude de votre parcours et identification du motif de régularisation le mieux adapté à votre situation.",
    pourQui: [
      "Personnes en situation irrégulière souhaitant se régulariser",
      "Régularisation par le travail",
      "Régularisation pour vie privée et familiale",
    ],
    ceQueNousFaisons: [
      "Analyse de votre situation personnelle",
      "Identification du motif de régularisation le plus adapté",
      "Constitution du dossier de régularisation",
      "Vérification de tous les justificatifs",
    ],
    ceQueNousNeFaisonsPas: [
      "Garantir la régularisation par la préfecture",
      "Créer de fausses preuves de présence en France",
      "Vous représenter légalement en cas de refus",
    ],
    transparenceText: TRANSPARENCE_BASE,
    documents: [
      "Passeport ou document d'identité",
      "Justificatifs de présence en France",
      "Justificatifs de domicile",
      "Documents spécifiques selon le motif",
    ],
    etapes: [
      { n: "1", title: "Analyse", desc: "Étude de votre parcours." },
      { n: "2", title: "Stratégie", desc: "Choix du motif de régularisation." },
      { n: "3", title: "Dossier", desc: "Rassemblement des preuves." },
      { n: "4", title: "Dépôt", desc: "Soumission à la préfecture." },
    ],
  },
};
