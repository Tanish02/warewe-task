const dns = require("dns").promises;

async function getRecords(domain) {
  try {
    const records = await dns.resolveMx(domain);
    return records.map((r) => r.exchange);
  } catch (error) {
    return [];
  }
}
module.exports = getRecords;
