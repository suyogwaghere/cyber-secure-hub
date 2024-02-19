// const traceroute = require('traceroute');
const Traceroute = require("nodejs-traceroute");
const url = require("url");
const middleware = require("./_common/middleware");

const handler = async (urlString, context) => {
  // Parse the URL and get the hostname
  const urlObject = url.parse(urlString);
  const host = urlObject.hostname;

  if (!host) {
    throw new Error("Invalid URL provided");
  }

  // Traceroute with callback
  const result = await new Promise((resolve, reject) => {
    const tracer = new Traceroute();
    tracer
      .on("pid", (pid) => {
        // console.log(`pid: ${pid}`);
      })
      .on("destination", (destination) => {
        // console.log(`destination: ${destination}`);
      })
      .on("hop", (hop) => {
        // console.log(`hop: ${JSON.stringify(hop)}`);
        resolve(hop);
      })
      .on("close", (code) => {
        // console.log(`close: code ${code}`);
      })
      .on("error", (error) => {
        // Handle errors
        reject(error || new Error("No hops found"));
      });

    tracer.trace(host);
  });

  return {
    message: "Traceroute completed!",
    result,
  };
};
// traceroute.trace(host, (err, hops) => {
//   if (err || !hops) {
//     reject(err || new Error('No hops found'));
//   } else {
//     resolve(hops);
//   }
// });

module.exports = middleware(handler);
module.exports.handler = middleware(handler);
