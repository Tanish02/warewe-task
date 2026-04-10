const levenshtein = require("fast-levenshtein");

const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

// typo detection function simple for now
function getDidYouMean(email) {
  const [user, domain] = email.split("@");
  for (let d of domains) {
    if (domain === d) return null;
    const distance = levenshtein.get(domain, d);
    if (distance <= 2) {
      return `${user}@${d}`;
    }
  }
  return null;
}

module.exports = getDidYouMean;
