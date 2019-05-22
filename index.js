const iconv = require('iconv-lite');

function decode(data) {
  let lines = data.split('\n');
  let version = parseInt(lines[0], 16);
  let records = lines.slice(1).map(decodeLine).filter(Boolean);
  return { version, records };
}

function decodeLine(line) {
  if (line.length < 172) {
    return null;
  }

  let id = decodeString(line.slice(0, 12));
  let pilot = decodeString(line.slice(12, 54));
  let airfield = decodeString(line.slice(54, 96));
  let plane_type = decodeString(line.slice(96, 138));
  let registration = decodeString(line.slice(138, 152));
  let callsign = decodeString(line.slice(152, 158));
  let frequency = decodeString(line.slice(158, 172));

  return { id, pilot, airfield, plane_type, registration, callsign, frequency };
}

function decodeString(str) {
  let numBytes = str.length / 2;

  let buffer = Buffer.alloc(numBytes);
  for (let i = 0; i < numBytes; i++) {
    let byte = parseInt(str.slice(i * 2, i * 2 + 2), 16);
    buffer.writeUInt8(byte, i)
  }

  let result = iconv.decode(buffer, 'latin1');
  result = result.trim();
  return result || null;
}

function encode({ version, records }) {
  return [
    version.toString(16).padStart(6, '0'),
    ...records.map(encodeRecord)
  ].join('\n') + '\n';
}

function encodeRecord(record) {
  return [
    encodeString(record.id, 6),
    encodeString(record.pilot, 21),
    encodeString(record.airfield, 21),
    encodeString(record.plane_type, 21),
    encodeString(record.registration, 7),
    encodeString(record.callsign, 3),
    encodeString(record.frequency, 7),
  ].join('');
}

function encodeString(str, length) {
  let buffer = iconv.encode((str || '').padEnd(length, ' '), 'latin1');
  return Array.from(buffer.values()).map(it => it.toString(16)).join('');
}

module.exports = { decode, encode };
