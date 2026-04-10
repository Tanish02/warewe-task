const dns = require("dns").promises;
async function getRecords(domian) {
  try {
    const records = await dns.resolve(domain);
    return records.map((r) => r.exchange);
  } catch (error) {
    return [];
  }
}
module.exports = getRecords;
