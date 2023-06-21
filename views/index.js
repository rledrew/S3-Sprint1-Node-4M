////////////////////////////////////////////////
// framework
const page = async (res) => {
  const name = "Landing Page";
  const head = `<head>${global.STYLE}<title>${name}</title></head>`;
  const header = `<header><h1>${name}</h1>${global.NAV}</header>`;
  try {
    await res.writeHead(res.statusCode, { "Content-Type": "text/html" });
    await res.end(`${head}<body>${header}</body>`);
  } catch (error) {
    res.statusCode = 500;
    console.error(error.message);
    throw error;
  }
};

////////////////////////////////////////////////
// exports
module.exports = { page };
