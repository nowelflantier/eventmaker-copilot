import React from 'react'
import RetroplanningView from '@components/Retroplanning'

const RetroplanningPage = () => {
    let planningData = [
        {
            category_id: "123",
            emails: [
                {
                    date: "01/01/2023 09:00",
                    subject: "Invitation à participer en tant qu'exposant",
                    objectif: "Contacter les exposants potentiels pour les inviter à participer à l'événement",
                },
                {
                    date: "01/05/2023 09:00",
                    subject: "Confirmation de participation",
                    objectif: "Envoyer un rappel aux exposants pour confirmer leur participation",
                },
                {
                    date: "01/10/2023 09:00",
                    subject: "Dernier rappel avant l'événement",
                    objectif: "Envoyer un dernier rappel aux exposants pour leur rappeler les détails de l'événement",
                }
            ]
        },
        {
            category_id: "456",
            emails: [
                {
                    date: "01/09/2023 09:00",
                    subject: "Invitation à l'événement",
                    objectif: "Envoyer une invitation aux visiteurs pour participer à l'événement",
                },
                {
                    date: "01/11/2023 09:00",
                    subject: "Présentation des activités",
                    objectif: "Informer les visiteurs sur les différentes activités proposées lors de l'événement",
                }
            ]
        },
        {
            category_id: "789",
            emails: [
                {
                    date: "01/06/2023 09:00",
                    subject: "Inscription à la newsletter",
                    objectif: "Encourager les visiteurs à s'inscrire à la newsletter pour recevoir les dernières informations sur l'événement",
                },
                {
                    date: "01/12/2023 09:00",
                    subject: "Dernières nouvelles de l'événement",
                    objectif: "Envoyer les dernières actualités et informations aux abonnés de la newsletter",
                }
            ]
        },
        {
            category_id: "XYZ",
            emails: [
                {
                    date: "01/01/2023 09:00",
                    subject: "Invitation VIP",
                    objectif: "Inviter les VIP à assister à l'événement",
                },
                {
                    date: "01/10/2023 09:00",
                    subject: "Confirmation de présence",
                    objectif: "Demander aux VIP de confirmer leur présence à l'événement",
                }
            ]
        },
        {
            category_id: "ABC",
            emails: [
                {
                    date: "01/01/2023 09:00",
                    subject: "Appel à conférenciers",
                    objectif: "Rechercher et inviter des conférenciers pour intervenir lors de l'événement",
                },
                {
                    date: "01/06/2023 09:00",
                    subject: "Confirmation des intervenants",
                    objectif: "Confirmer la participation des conférenciers sélectionnés",
                }
            ]
        }
        ]
  return (
    // Dans le composant EventDetailledView
<RetroplanningView planningData={planningData} />

  )
}

export default RetroplanningPage