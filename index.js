// Data is provided by diablo2.io API

const querystring = require('querystring');
const moment = require('moment');
const { get } = require('axios');

const PROGRESSION = {
  1: 'Terror gazes upon Sanctuary.',
  2: 'Terror approaches Sanctuary.',
  3: 'Terror begins to form within Sanctuary.',
  4: 'Terror spreads across Sanctuary.',
  5: 'Terror is about to be unleashed upon Sanctuary.',
  6: 'Terror has invaded Sanctuary.'
};

const REGIONS = {
  1: 'America',
  2: 'Europe ',
  3: 'Asia   '
};

const MODES = {
  1: 'Hardcore',
  2: 'Softcore'
};
const SELECTED_MODE = 1;

const LEAGUES = {
  1: 'The Ladder',
  2: 'Non-Ladder'
};
const SELECTED_LEAGUE = 2;

const D2IO_URL = 'https://diablo2.io/dclone_api.php?' + querystring.stringify({
  hc: SELECTED_LEAGUE,
  ladder: SELECTED_MODE,
  sk: 'r',
  sd: 'a'
});

const UPDATE_TIMESTAMP = 60000;

const store = {};
let step = 0;

const bell = () => console.log('\u0007');
let lastUpdate = Date.now();
let latestData = [];
let loading = false;
const getD2CloneData = () => {
  step++;
  loading = true;
  lastUpdate = Date.now();
  get(D2IO_URL)
    .then(({ data, status }) => {
      latestData = data;
      data.forEach(({ progress, region, hc, ladder }) => {
        const id = `${region + hc + ladder}`;
        if (!store[id]) {
          store[id] = progress;
        }

        if (store[id] !== progress) {
          store[id] = progress;
          bell();
        }
      });
    })
    .catch((err) => console.error(err.message))
    .finally(() => {
      loading = false
    });
  setTimeout(getD2CloneData, UPDATE_TIMESTAMP);
};
setTimeout(getD2CloneData, 0);

setInterval(() => {
  console.clear();
  console.log(`${step === 1 ? '1 request' : `${step} requests`} to DClone tracker`);
  console.log('Next request in', moment(lastUpdate + UPDATE_TIMESTAMP - Date.now()).format('ss'), 'seconds');
  if (loading) {
    console.log('Fetching latest data...');
  }
  latestData.forEach(({ progress, region, hc, ladder, timestamped }) => console.log([
    `${progress}/${Object.keys(PROGRESSION).length}`,
    REGIONS[region],
    MODES[hc],
    LEAGUES[ladder],
    moment(timestamped * 1000).fromNow(),
    PROGRESSION[progress]
  ].join(' - ')));
}, 1000);



