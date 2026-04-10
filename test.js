const verifyEmail = require("./src/emailVerify");
(async () => {
  const result = await verifyEmail("tanishtest@gmail.com");
  console.log(result);
})();
