const getHome = (req, res) => {
  res.json({
    message: 'Hello from Smart Fridge server',
    time: new Date().toISOString(),
  });
};

module.exports = { getHome };
