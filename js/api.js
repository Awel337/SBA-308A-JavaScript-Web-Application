

import axios from 'https://esm.sh/axios';


const RAPIDAPI_HEADERS = {
  'x-rapidapi-key': '4d296056f1mshc877506418da8c5p138eadjsnb4d6c8f18bf5',
  'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
};

// Fetch upcoming matches for the English Premier League (league id 39) for season 2023 (next 10 matches)
export async function getUpcomingMatches() {
  try {
    const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
      params: { league: '39', season: '2023', next: '10' },
      headers: RAPIDAPI_HEADERS
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    return [];
  }
}

// Mapping from common team names to team IDs (you can expand this as needed)
export const teamNameToId = {
  "Arsenal": 42,
  "Manchester United": 33,
  "Chelsea": 49,
  "Liverpool": 40,
  "Manchester City": 50,
  "Newcastle": 34,      
  "Everton": 36         
};


export async function searchPlayers(teamName) {
  const teamId = teamNameToId[teamName];
  if (!teamId) {
    console.error('Team not found in mapping:', teamName);
    return [];
  }
  try {
    const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/players', {
      params: { team: teamId, season: '2023' },
      headers: RAPIDAPI_HEADERS
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
}


export async function getHeadToHeadFixtures(team1Id, team2Id) {
  try {
    const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/fixtures/headtohead', {
      params: { h2h: `${team1Id}-${team2Id}` },
      headers: RAPIDAPI_HEADERS
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching head-to-head fixtures:', error);
    return [];
  }
}