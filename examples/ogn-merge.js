/**
 * This example merges the data from the OGN Device Database with the
 * FlarmNet database. The OGN DDB has priority, but will use the pilot name
 * from FlarmNet if the callsign is matching.
 */

const fs = require('fs');
const FlarmNet = require('..');

// from https://www.flarmnet.org/static/files/wfn/data.fln
let flarmNet = FlarmNet.decode(fs.readFileSync(`${__dirname}/data.fln`, 'utf8')).records;

// from http://ddb.glidernet.org/download/?j=1&t=1
let ddb = JSON.parse(fs.readFileSync(`${__dirname}/ogn-ddb.json`, 'utf8')).devices;

let merged = ddb.map(it => ({
  id: it.device_id,
  pilot: null,
  airfield: null,
  plane_type: it.aircraft_model,
  registration: it.registration,
  callsign: it.cn,
  frequency: null,
}));

flarmNet.forEach(record => {
  let existingRecord = merged.find(it => it.id === record.id);
  if (!existingRecord) {
    merged.push(record);
  } else if (existingRecord.callsign === record.callsign) {
    existingRecord.pilot = record.pilot;
    existingRecord.airfield = record.airfield;
    existingRecord.frequency = record.frequency;

    if (!existingRecord.registration) {
      existingRecord.registration = record.registration;
    }

    if (!existingRecord.plane_type) {
      existingRecord.plane_type = record.plane_type;
    }
  }
});

console.log(FlarmNet.encode({ version: 1, records: merged }));
