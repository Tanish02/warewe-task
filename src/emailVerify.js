const validateEmail = require("./validator");
const getMXRecords = require("./dnsLookup");
const checkMailbox = require("./smtpCheck");
const getDidYouMean = require("./typoError");

async function verifyEmail(email) {
  const start = Date.now();

  if (!validateEmail(email)) {
    return {
      email,
      result: "invalid",
      resultcode: 6,
      subresult: "invalid_format",
    };
  }

  const domain = email.split("@")[1];

  const suggestion = getDidYouMean(email);

  try {
    const mxRecords = await getRecords(domain);

    if (mxRecords.length === 0) {
      return {
        email,
        result: "invalid",
        resultcode: 6,
        subresult: "no_mx_records",
      };
    }

    const smtpResponse = await checkMail(mxRecords[0], email);

    return {
      email,
      result: "valid",
      resultcode: 1,
      subresult: suggestion ? "typo_detected" : "mailbox_exists",
      domain,
      mxRecords,
      executionTime: (Date.now() - start) / 1000,
      error: null,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      email,
      result: "unknown",
      resultcode: 3,
      subresult: "connection_error",
      error: error.message,
    };
  }
}

module.exports = verifyEmail;
