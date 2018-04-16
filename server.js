const express = require('express');
const app = express();

function createDomain(input) {
  const domains = require('./src/assets/domains.json');
  const matches = domains.filter((domain) => input.indexOf(domain.tld) !== -1);

  return matches.map((toReplace) => {
    const prefix = input.indexOf(toReplace.tld) === 0 && 'xxx' || '';
    return {
      tld: input.replace(toReplace.tld, `${prefix}.${toReplace.tld}/`),
      country: toReplace.country,
    };
  });
}

// Add localhost:4200 to CORS whitelist
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  next();
});

app.get('/', (req, res, next) => res.json([]));

app.get('/:input', (req, res, next) => {
  const input = req.params.input;
  res.json(createDomain(input));
});

app.listen(3000, () => console.log('DomainHack app listening on port 3000!'));
