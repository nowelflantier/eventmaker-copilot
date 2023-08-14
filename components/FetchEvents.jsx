'use server'

export async function fetchDataFromServer(token) {
    const res = await fetch(`https://app.eventmaker.io/api/v1/events.json?per_page=20&auth_token=${token}`);
    const events = await res.json();
    console.log(events);
    return events
  }