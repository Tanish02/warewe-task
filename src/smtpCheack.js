const { SMTPClient } = require("smtp-client");

async function checkMail(mxHost, email) {
  const client = new SMTPClient({
    host: mxHost,
    port: 25,
    timeout: 5000,
  });

  try {
    await client.connect();

    await client.greet({ hostname: "localhost" });

    await client.mail({ from: "tanish@gmail.com" });

    const rcpt = await client.rcpt({ to: email });

    await client.quit();

    return rcpt;
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = checkMail;
