function cap(s) {
  return s[0].toUpperCase() + s.slice(1);
}

function rev(s) {
  return s.split('').reverse().join('');
}

function vow(s) {
  const v = s.match(/[aeiou]/gi);
  return v ? v.length : 0;
}

module.exports = { cap, rev, vow };