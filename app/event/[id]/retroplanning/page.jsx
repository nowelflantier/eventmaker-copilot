import React from "react";
import RetroplanningView from "@components/Retroplanning";

const RetroplanningPage = () => {
  let planningData = [
    {
    id: 123,
    name: "Exposant",
    emails: [
    {
    date: "2023-01-01 09:00:00",
    subject: "Appel à candidature pour les exposants",
    objectif: "Inviter les exposants à participer à l'événement"
    },
    {
    date: "2023-06-01 09:00:00",
    subject: "Confirmation de participation",
    objectif: "Demander la confirmation de participation aux exposants sélectionnés"
    },
    {
    date: "2023-09-01 09:00:00",
    subject: "Informations pratiques",
    objectif: "Fournir aux exposants toutes les informations pratiques nécessaires pour leur participation"
    },
    {
    date: "2023-10-15 09:00:00",
    subject: "Derniers détails logistiques",
    objectif: "Communiquer les derniers détails logistiques et les consignes aux exposants"
    },
    {
    date: "2023-11-01 09:00:00",
    subject: "Rappel de l'événement",
    objectif: "Rappeler aux exposants la date et l'heure de l'événement"
    }
    ]
    },
    {
    id: 456,
    name: "Visiteur",
    emails: [
    {
    date: "2023-08-15 09:00:00",
    subject: "Sauvegardez la date",
    objectif: "Sauvegarder la date de l'événement dans l'agenda des visiteurs"
    },
    {
    date: "2023-10-01 09:00:00",
    subject: "Programme complet de l'événement",
    objectif: "Présenter le programme complet de l'événement aux visiteurs"
    },
    {
    date: "2023-11-01 09:00:00",
    subject: "Plan d'accès et informations pratiques",
    objectif: "Fournir aux visiteurs le plan d'accès et toutes les informations pratiques pour se rendre sur le lieu de l'événement"
    },
    {
    date: "2023-11-05 09:00:00",
    subject: "Offres spéciales et réductions",
    objectif: "Promouvoir les offres spéciales et les réductions disponibles lors de l'événement"
    },
    {
    date: "2023-11-10 09:00:00",
    subject: "Bienvenue à l'événement",
    objectif: "Souhaiter la bienvenue aux visiteurs et leur rappeler les dates et les horaires de l'événement"
    }
    ]
    },
    {
    id: 789,
    name: "Newsletter",
    emails: [
    {
    date: "2023-02-01 09:00:00",
    subject: "Sneak Peek de l'événement",
    objectif: "Donner aux abonnés un aperçu de ce qu'ils peuvent attendre de l'événement"
    },
    {
    date: "2023-06-01 09:00:00",
    subject: "Offres exclusives pour les abonnés",
    objectif: "Offrir des offres exclusives et des réductions aux abonnés de la newsletter"
    },
    {
    date: "2023-09-01 09:00:00",
    subject: "Programme complet de l'événement",
    objectif: "Présenter le programme complet de l'événement aux abonnés"
    },
    {
    date: "2023-11-01 09:00:00",
    subject: "Préparation de l'événement",
    objectif: "Donner aux abonnés des conseils de préparation pour l'événement"
    },
    {
    date: "2023-11-10 09:00:00",
    subject: "Dernières informations avant l'événement",
    objectif: "Fournir aux abonnés les dernières informations et les rappels avant le début de l'événement"
    }
    ]
    },
    {
    id: "XYZ",
    name: "VIP",
    emails: [
    {
    date: "2022-11-15 09:00:00",
    subject: "Invitation VIP",
    objectif: "Inviter les VIP à participer à l'événement"
    },
    {
    date: "2023-04-01 09:00:00",
    subject: "Programme exclusif pour les VIP",
    objectif: "Présenter le programme exclusif pour les VIP"
    },
    {
    date: "2023-09-01 09:00:00",
    subject: "Confirmation de présence",
    objectif: "Demander la confirmation de la présence des VIP"
    },
    {
    date: "2023-10-15 09:00:00",
    subject: "Détails logistiques",
    objectif: "Fournir aux VIP tous les détails logistiques nécessaires pour leur participation"
    },
    {
    date: "2023-11-05 09:00:00",
    subject: "Rappel de l'événement",
    objectif: "Rappeler aux VIP la date et l'heure de l'événement"
    }
    ]
    },
    {
    id: "ABC",
    name: "Speakers",
    emails: [
    {
    date: "2022-11-15 09:00:00",
    subject: "Appel à candidature",
    objectif: "Lancer un appel à candidature pour les orateurs"
    },
    {
    date: "2023-02-01 09:00:00",
    subject: "Confirmation de participation",
    objectif: "Demander la confirmation de participation aux orateurs sélectionnés"
    },
    {
    date: "2023-08-01 09:00:00",
    subject: "Informations pratiques",
    objectif: "Fournir aux orateurs toutes les informations pratiques nécessaires pour leur intervention"
    },
    {
    date: "2023-10-01 09:00:00",
    subject: "Finalisation de l'intervention",
    objectif: "Demander aux orateurs de finaliser leur intervention et de fournir leurs supports de présentation"
    },
    {
    date: "2023-11-01 09:00:00",
    subject: "Dernières instructions",
    objectif: "Transmettre aux orateurs les dernières instructions et les détails pour leur intervention"
    }
    ]
    }
    ]
  return (
    // Dans le composant EventDetailledView
    <RetroplanningView planningData={planningData} />
  );
};

export default RetroplanningPage;
