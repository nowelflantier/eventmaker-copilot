'use server'

export async function fetchEventsFromServer(token) {
    const res = await fetch(`https://app.eventmaker.io/api/v1/events.json?per_page=20&auth_token=${token}`);
    const events = await res.json();
    return events
  }

export async function fetchEventsDetailsFromServer({token, eventId}) {
    const res = await fetch(`https://app.eventmaker.io/api/v1/events/${eventId}.json?auth_token=${token}`);
    const eventsDetails = await res.json();
    return eventsDetails
}