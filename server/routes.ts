import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertLeadSchema, insertContactSchema, insertTaskSchema } from "@shared/schema";

function isAuthenticated(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  if (req.isAuthenticated()) return next();
  res.sendStatus(401);
}

function isAdmin(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  if (req.isAuthenticated() && req.user!.isAdmin) return next();
  res.sendStatus(403);
}

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);
  
  // Admin routes
  app.get("/api/admin/users", isAdmin, async (req, res) => {
    const allUsers = await storage.getAllUsers();
    res.json(allUsers);
  });
  
  app.patch("/api/admin/users/:id", isAdmin, async (req, res) => {
    const userId = parseInt(req.params.id);
    const { isAdmin } = req.body;
    
    if (typeof isAdmin !== 'boolean') {
      return res.status(400).json({ error: "isAdmin must be a boolean" });
    }
    
    try {
      const updatedUser = await storage.setAdminStatus(userId, isAdmin);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // Leads routes
  app.get("/api/leads", isAuthenticated, async (req, res) => {
    const leads = await storage.getLeads(req.user!.id);
    res.json(leads);
  });

  app.post("/api/leads", isAuthenticated, async (req, res) => {
    const parsed = insertLeadSchema.parse(req.body);
    const lead = await storage.createLead({ ...parsed, userId: req.user!.id });
    res.status(201).json(lead);
  });

  app.patch("/api/leads/:id", isAuthenticated, async (req, res) => {
    const lead = await storage.updateLead(parseInt(req.params.id), req.body);
    res.json(lead);
  });

  app.delete("/api/leads/:id", isAuthenticated, async (req, res) => {
    await storage.deleteLead(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // Contacts routes
  app.get("/api/contacts", isAuthenticated, async (req, res) => {
    const contacts = await storage.getContacts(req.user!.id);
    res.json(contacts);
  });

  app.post("/api/contacts", isAuthenticated, async (req, res) => {
    const parsed = insertContactSchema.parse(req.body);
    const contact = await storage.createContact({ ...parsed, userId: req.user!.id });
    res.status(201).json(contact);
  });

  app.patch("/api/contacts/:id", isAuthenticated, async (req, res) => {
    const contact = await storage.updateContact(parseInt(req.params.id), req.body);
    res.json(contact);
  });

  app.delete("/api/contacts/:id", isAuthenticated, async (req, res) => {
    await storage.deleteContact(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // Tasks routes
  app.get("/api/tasks", isAuthenticated, async (req, res) => {
    const tasks = await storage.getTasks(req.user!.id);
    res.json(tasks);
  });

  app.post("/api/tasks", isAuthenticated, async (req, res) => {
    const parsed = insertTaskSchema.parse(req.body);
    const task = await storage.createTask({ ...parsed, userId: req.user!.id });
    res.status(201).json(task);
  });

  app.patch("/api/tasks/:id", isAuthenticated, async (req, res) => {
    const task = await storage.updateTask(parseInt(req.params.id), req.body);
    res.json(task);
  });

  app.delete("/api/tasks/:id", isAuthenticated, async (req, res) => {
    await storage.deleteTask(parseInt(req.params.id));
    res.sendStatus(200);
  });

  const httpServer = createServer(app);
  return httpServer;
}
