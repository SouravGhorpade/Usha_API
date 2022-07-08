exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  exports.VegBoard = (req, res) => {
    res.status(200).send("Veg Content.");
  };
  exports.Non_VegBoard = (req, res) => {
    res.status(200).send("Non_Veg Content.");
  };
  exports.PremixBoard = (req, res) => {
    res.status(200).send("Premix Content.");
  };
  exports.ChutenyBoard = (req, res) => {
    res.status(200).send("Chuteny Content.");
  };