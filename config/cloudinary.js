const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "sportlect",
  api_key: "425141846755178",
  api_secret: "8kfumdVivVFRXboHxaKZ25lNJZY",
});

module.exports = { cloudinary };
