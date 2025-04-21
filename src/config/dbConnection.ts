import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('anotaapp.db');

export default db; 