const fs = require('fs').promises;
const path = require('path');
const { DATA_DIR } = require('../config/env');

/**
 * Base Repository class to handle file-based data storage
 */
class BaseRepository {
  constructor(filename) {
    this.dataFile = path.join(DATA_DIR, filename);
    this.ensureFileExists();
  }

  /**
   * Ensure the JSON file exists, create it if it doesn't
   */
  async ensureFileExists() {
    try {
      await fs.access(this.dataFile);
    } catch (error) {
      // Create directory if it doesn't exist
      try {
        await fs.mkdir(path.dirname(this.dataFile), { recursive: true });
      } catch (err) {
        // Ignore if directory already exists
        if (err.code !== 'EEXIST') throw err;
      }
      
      // Create empty JSON file
      await fs.writeFile(this.dataFile, JSON.stringify([], null, 2));
    }
  }

  /**
   * Read all data from the file
   */
  async readData() {
    const data = await fs.readFile(this.dataFile, 'utf8');
    return JSON.parse(data || '[]');
  }

  /**
   * Write data to the file
   */
  async writeData(data) {
    await fs.writeFile(this.dataFile, JSON.stringify(data, null, 2));
    return data;
  }

  /**
   * Find all items in the repository
   */
  async findAll() {
    return await this.readData();
  }

  /**
   * Find an item by ID
   */
  async findById(id) {
    const data = await this.readData();
    return data.find(item => item.id === id);
  }

  /**
   * Find items that match a filter function
   */
  async findBy(filterFn) {
    const data = await this.readData();
    return data.filter(filterFn);
  }

  /**
   * Create a new item
   */
  async create(item) {
    const data = await this.readData();
    const newItem = {
      ...item,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };
    
    data.push(newItem);
    await this.writeData(data);
    return newItem;
  }

  /**
   * Update an existing item
   */
  async update(id, updates) {
    const data = await this.readData();
    const index = data.findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error('Item not found');
    }
    
    const updatedItem = {
      ...data[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    data[index] = updatedItem;
    await this.writeData(data);
    return updatedItem;
  }

  /**
   * Delete an item by ID
   */
  async delete(id) {
    const data = await this.readData();
    const index = data.findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error('Item not found');
    }
    
    data.splice(index, 1);
    await this.writeData(data);
    return true;
  }

  /**
   * Generate a unique ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}

module.exports = BaseRepository;
