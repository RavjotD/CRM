import { User, InsertUser, Lead, InsertLead, Contact, InsertContact, Task, InsertTask } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>; // Added to get all users
  setAdminStatus(userId: number, isAdmin: boolean): Promise<User | undefined>; // Added to manage admin status
  setUserData(userId: number, userData: Partial<User>): Promise<User | undefined>; // Added to update user data

  // Lead operations
  getLeads(userId: number): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  createLead(lead: InsertLead & { userId: number }): Promise<Lead>;
  updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead>;
  deleteLead(id: number): Promise<void>;

  // Contact operations
  getContacts(userId: number): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact & { userId: number }): Promise<Contact>;
  updateContact(id: number, contact: Partial<InsertContact>): Promise<Contact>;
  deleteContact(id: number): Promise<void>;

  // Task operations
  getTasks(userId: number): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask & { userId: number }): Promise<Task>;
  updateTask(id: number, task: Partial<InsertTask>): Promise<Task>;
  deleteTask(id: number): Promise<void>;

  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private leads: Map<number, Lead>;
  private contacts: Map<number, Contact>;
  private tasks: Map<number, Task>;
  private currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.contacts = new Map();
    this.tasks = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id, 
      isAdmin: false
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Lead operations
  async getLeads(userId: number): Promise<Lead[]> {
    return Array.from(this.leads.values()).filter(lead => lead.userId === userId);
  }

  async getLead(id: number): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async createLead(lead: InsertLead & { userId: number }): Promise<Lead> {
    const id = this.currentId++;
    const newLead: Lead = { ...lead, id };
    this.leads.set(id, newLead);
    return newLead;
  }

  async updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead> {
    const existingLead = this.leads.get(id);
    if (!existingLead) throw new Error("Lead not found");
    const updatedLead = { ...existingLead, ...lead };
    this.leads.set(id, updatedLead);
    return updatedLead;
  }

  async deleteLead(id: number): Promise<void> {
    this.leads.delete(id);
  }

  // Contact operations
  async getContacts(userId: number): Promise<Contact[]> {
    return Array.from(this.contacts.values()).filter(contact => contact.userId === userId);
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(contact: InsertContact & { userId: number }): Promise<Contact> {
    const id = this.currentId++;
    const newContact: Contact = { ...contact, id };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async updateContact(id: number, contact: Partial<InsertContact>): Promise<Contact> {
    const existingContact = this.contacts.get(id);
    if (!existingContact) throw new Error("Contact not found");
    const updatedContact = { ...existingContact, ...contact };
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }

  async deleteContact(id: number): Promise<void> {
    this.contacts.delete(id);
  }

  // Task operations
  async getTasks(userId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => task.userId === userId);
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(task: InsertTask & { userId: number }): Promise<Task> {
    const id = this.currentId++;
    const newTask: Task = { ...task, id };
    this.tasks.set(id, newTask);
    return newTask;
  }

  async updateTask(id: number, task: Partial<InsertTask>): Promise<Task> {
    const existingTask = this.tasks.get(id);
    if (!existingTask) throw new Error("Task not found");
    const updatedTask = { ...existingTask, ...task };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    this.tasks.delete(id);
  }
}

export const storage = new MemStorage();