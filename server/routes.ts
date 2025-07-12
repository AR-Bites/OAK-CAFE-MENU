import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve attached assets (3D models, USDZ files, etc.) with proper MIME types
  app.use('/attached_assets', express.static(
    path.resolve(import.meta.dirname, '..', 'attached_assets'),
    {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.usdz')) {
          res.setHeader('Content-Type', 'model/vnd.usdz+zip');
        } else if (filePath.endsWith('.glb')) {
          res.setHeader('Content-Type', 'model/gltf-binary');
        } else if (filePath.endsWith('.gltf')) {
          res.setHeader('Content-Type', 'model/gltf+json');
        }
      }
    }
  ));

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
