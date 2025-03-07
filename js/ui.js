

import { getUpcomingMatches, searchPlayers, getHeadToHeadFixtures, teamNameToId } from './api.js';


export async function renderMatches() {
  const matchList = document.getElementById('match-list');
  matchList.innerHTML = '<p>Loading upcoming matches...</p>';
  
  const matches = await getUpcomingMatches();
  if (!matches.length) {
    matchList.innerHTML = '<p>No upcoming matches available.</p>';
    return;
  }
  
  matchList.innerHTML = '';
  matches.forEach(match => {
    const matchEl = document.createElement('div');
    matchEl.classList.add('match');
    
    const fixtureDate = match.fixture.date ? new Date(match.fixture.date).toLocaleString() : 'N/A';
    const homeTeam = match.teams.home.name || 'Home';
    const awayTeam = match.teams.away.name || 'Away';
    const fullTimeScore = match.score.fulltime;
    const scoreText = (fullTimeScore.home !== null && fullTimeScore.away !== null)
      ? `${fullTimeScore.home} - ${fullTimeScore.away}`
      : 'TBD';
    
    matchEl.innerHTML = `
      <strong>${homeTeam} vs ${awayTeam}</strong>
      <br>
      Date: ${fixtureDate}
      <br>
      Score: ${scoreText}
    `;
    matchList.appendChild(matchEl);
  });
}


export async function renderPlayers(teamName) {
  const playerList = document.getElementById('player-list');
  playerList.innerHTML = '<p>Loading players...</p>';
  
  const playersData = await searchPlayers(teamName);
  if (!playersData.length) {
    playerList.innerHTML = '<p>No players found for that team.</p>';
    return;
  }
  
  playerList.innerHTML = '';
  
  playersData.slice(0, 10).forEach(playerObj => {
    const player = playerObj.player;
    const playerEl = document.createElement('div');
    playerEl.classList.add('player');
    playerEl.innerHTML = `
      <strong>${player.name}</strong>
      <span>Position: ${player.position || 'N/A'}</span>
    `;
    playerList.appendChild(playerEl);
  });
}


export async function renderHeadToHead(team1Name, team2Name) {
  const headToHeadContainer = document.getElementById('headtohead-list');
  headToHeadContainer.innerHTML = '<p>Loading head-to-head fixtures...</p>';
  
  
  const team1Id = teamNameToId[team1Name];
  const team2Id = teamNameToId[team2Name];
  
  if (!team1Id || !team2Id) {
    headToHeadContainer.innerHTML = '<p>One or both team names are invalid. Please check your input.</p>';
    return;
  }
  
  const fixtures = await getHeadToHeadFixtures(team1Id, team2Id);
  if (!fixtures.length) {
    headToHeadContainer.innerHTML = '<p>No head-to-head data available for these teams.</p>';
    return;
  }
  
 
  fixtures.sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));
  
  
  const limitedFixtures = fixtures.slice(0, 5);
  
  headToHeadContainer.innerHTML = '';
  limitedFixtures.forEach(fixture => {
    const fixtureEl = document.createElement('div');
    fixtureEl.classList.add('head-to-head-fixture');
    
    const fixtureDate = fixture.fixture.date ? new Date(fixture.fixture.date).toLocaleString() : 'N/A';
    const homeTeam = fixture.teams.home.name || 'Home';
    const awayTeam = fixture.teams.away.name || 'Away';
    const fullTimeScore = fixture.score.fulltime;
    const scoreText = (fullTimeScore.home !== null && fullTimeScore.away !== null)
      ? `${fullTimeScore.home} - ${fullTimeScore.away}`
      : 'TBD';
    
    fixtureEl.innerHTML = `
      <strong>${homeTeam} vs ${awayTeam}</strong>
      <br>
      Date: ${fixtureDate}
      <br>
      Score: ${scoreText}
    `;
    headToHeadContainer.appendChild(fixtureEl);
  });
}


export function bindUIEvents() {
  
  const searchBtn = document.getElementById('search-btn');
  searchBtn.addEventListener('click', () => {
    const teamName = document.getElementById('search-input').value.trim();
    if (teamName) {
      renderPlayers(teamName);
    }
  });
  
  
  const headToHeadBtn = document.getElementById('headtohead-btn');
  headToHeadBtn.addEventListener('click', () => {
    const team1Name = document.getElementById('team1-input').value.trim();
    const team2Name = document.getElementById('team2-input').value.trim();
    if (team1Name && team2Name) {
      renderHeadToHead(team1Name, team2Name);
    }
  });
}
