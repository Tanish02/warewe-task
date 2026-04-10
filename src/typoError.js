const levenshtein = require("fast-levenshtein");
const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
function getDidYouMean(email) {
  if (!email.includes("@")) return null;
  const [user, domain] = email.split("@");
  for (let d of domains) {
    const distance = levenshtein.get(domain, d);
    if (distance <= 2) {
      return `${user}@${d}`;
    }
  }
  return null;
}
module.exports = getDidYouMean;
