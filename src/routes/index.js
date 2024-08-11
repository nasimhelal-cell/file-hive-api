const router = require("express").Router();
const { controllers: authControllers } = require("@/api/v1/auth");
const { controllers: folderControllers } = require("@/api/v1/folder");
const { controllers: fileControllers } = require("@/api/v1/file");
const { authenticate } = require("@/middlewares");

// auth
router.route("/v1/auth/register").post(authControllers.register);
router.route("/v1/auth/login").post(authControllers.login);
router.route("/v1/auth/logout").post(authenticate, authControllers.logout);

// folder
router.route("/v1/folders/create").post(folderControllers.create);
router.route("/v1/folders/update/:folderID").patch(folderControllers.update);
router
  .route("/v1/folders/delete/:folderID")
  .delete(folderControllers.deleteFolder);
router.route("/v1/folders/undo/:folderID").post(folderControllers.undo);
router.route("/v1/folders/:folderID").post(folderControllers.getFolder);

// file
router.route("/v1/files/upload").post(fileControllers.upload);
router.route("/v1/files/view/:fileID").get(fileControllers.view);
router.route("/v1/files/view/:fileID").delete(fileControllers.deleteFile);
router.route("/v1/files/undo/:fileID").post(fileControllers.undo);
router.route("/v1/files/download/:fileID").post(fileControllers.download);

module.exports = router;
