import { Router } from "express";
import AccountRoutes from './Account.js';
import AdminRoutes from './Admin.js';
import WebsiteRoutes from './Website.js';

const Route = Router();

Route.use('/', AccountRoutes);
Route.use('/', AdminRoutes);
Route.use('/', WebsiteRoutes);

export default Route;