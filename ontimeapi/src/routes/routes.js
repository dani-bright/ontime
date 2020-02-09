import {Router} from 'express';
import UserController from "../controllers/UserController";
import AuthorController from "../controllers/AuthorController";
import SongController from "../controllers/SongController";
import AlbumController from "../controllers/AlbumController";
import CategoryController from "../controllers/CategoryController";
import FavoriteController from "../controllers/FavoriteController";

const router = Router();

router.get('/users', UserController.findAll);
router.post('/users/authenticate', UserController.authenticate);
router.post('/users', UserController.create);
router.get('/users/:id', UserController.findOne);
router.delete('/users/:id', UserController.delete);
// router.delete('/users/:id', Auth.auth(10), UserController.delete);
router.put('/users/:id', UserController.update);

router.get('/authors', AuthorController.findAll);
router.post('/authors', AuthorController.create);
router.get('/authors/:id', AuthorController.findOne);
router.delete('/authors/:id', AuthorController.delete);
router.put('/authors/:id', AuthorController.update);

router.get('/songs', SongController.findAll);
router.post('/songs/:authorId/:albumId?', SongController.create);
router.get('/songs/:id', SongController.findOne);
router.delete('/songs/:id', SongController.delete);
router.put('/songs/:id', SongController.update);

router.get('/albums', AlbumController.findAll);
router.post('/albums/', AlbumController.create);
router.get('/albums/:id', AlbumController.findOne);
router.delete('/albums/:id', AlbumController.delete);
router.put('/albums/:id', AlbumController.update);

router.get('/favorites', FavoriteController.findAll);
router.get('/favorites/:userId/:songId', FavoriteController.findOne);
router.post('/favorites', FavoriteController.create);
router.delete('/favorites/:id', FavoriteController.delete);

router.get('/categories', CategoryController.findAll);


export default router;