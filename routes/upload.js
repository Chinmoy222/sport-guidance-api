var express = require("express");
var router = express.Router();
var connection = require("./../config/mySql");
var router = express.Router();
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("./../config/cloudinary");
let streamifier = require("streamifier");

// import {  } from "module";

let multer = require("multer");
let fs = require("fs-extra");

router.post("/profilePic", async (req, res) => {
  // console.log(req.files, req.body);

  const id = req.body.id;
  const profilePic = req.files.profilePic.data;
  console.log(req.files.profilePic.data);

  try {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "profile_pictures/user/",
      },
      function (error, result) {
        res.send({ err: error, result: result });
      }
    );

    streamifier.createReadStream(profilePic).pipe(cld_upload_stream);

    // const uploadResponse = await cloudinary.uploader.upload(profilePic, {
    //   resource_type: "image",
    //   public_id: `profile_pictures/user/${id}`,
    //   overwrite: true,
    //   // upload_preset: 'dev_setups',
    // });
    // console.log(uploadResponse);
    res.send({ msg: uploadResponse });
  } catch (err) {
    // console.error(err);
    res.send({ err: err });
  }
});

// let upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, callback) => {
//       return file;
//     },
//   }),
// });

// router.post("/profilePic", upload.single("file"), (req, res) => {
//   console.log(req.body, req.file);
//   res.send("success");
//   const id = req.body.id;
//   const profilePic = req.file;

//   cloudinary.v2.uploader.upload(
//     profilePic,
//     {
//       resource_type: "image",
//       public_id: `profile_pictures/user/${id}`,
//       overwrite: true,
//     },
//     function (error, result) {
//       console.log(result, error);
//     }
//   );
// });

module.exports = router;
