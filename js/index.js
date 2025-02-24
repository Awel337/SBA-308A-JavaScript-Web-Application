// index.js - Main entry point for the application

import { renderMatches, bindUIEvents } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // On page load, render upcoming matches and bind UI event handlers
  renderMatches();
  bindUIEvents();
});
