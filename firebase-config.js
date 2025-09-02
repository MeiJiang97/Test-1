// Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyAIIS_PAOt0PqCZwLr1PQaH1JhH4qJYnzc",
  authDomain: "work-order-system-d1b39.firebaseapp.com",
  databaseURL: "https://work-order-system-d1b39-default-rtdb.firebaseio.com",
  projectId: "work-order-system-d1b39",
  storageBucket: "work-order-system-d1b39.firebasestorage.app",
  messagingSenderId: "76896283317",
  appId: "1:76896283317:web:7fd60ae69a115d4bafecfc",
  measurementId: "G-N6DE2N1NGN"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);

// 初始化 Firestore
const db = firebase.firestore();

// 实时同步功能
class FirebaseSync {
  constructor() {
    this.db = db;
    this.listeners = new Map();
  }

  // 实时监听集合变化
  onCollectionSnapshot(collectionName, callback) {
    const unsubscribe = this.db.collection(collectionName)
      .onSnapshot((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data()
          });
        });
        callback(data);
      }, (error) => {
        console.error("监听集合错误:", error);
      });

    this.listeners.set(collectionName, unsubscribe);
    return unsubscribe;
  }

  // 实时监听单个文档变化
  onDocumentSnapshot(collectionName, documentId, callback) {
    const unsubscribe = this.db.collection(collectionName)
      .doc(documentId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          callback({
            id: doc.id,
            ...doc.data()
          });
        } else {
          callback(null);
        }
      }, (error) => {
        console.error("监听文档错误:", error);
      });

    const key = `${collectionName}/${documentId}`;
    this.listeners.set(key, unsubscribe);
    return unsubscribe;
  }

  // 添加文档
  async addDocument(collectionName, data) {
    try {
      const docRef = await this.db.collection(collectionName).add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error("添加文档错误:", error);
      throw error;
    }
  }

  // 更新文档
  async updateDocument(collectionName, documentId, data) {
    try {
      await this.db.collection(collectionName).doc(documentId).update({
        ...data,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      console.error("更新文档错误:", error);
      throw error;
    }
  }

  // 删除文档
  async deleteDocument(collectionName, documentId) {
    try {
      await this.db.collection(collectionName).doc(documentId).delete();
    } catch (error) {
      console.error("删除文档错误:", error);
      throw error;
    }
  }

  // 获取集合数据
  async getCollection(collectionName) {
    try {
      const snapshot = await this.db.collection(collectionName).get();
      const data = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return data;
    } catch (error) {
      console.error("获取集合错误:", error);
      throw error;
    }
  }

  // 获取单个文档
  async getDocument(collectionName, documentId) {
    try {
      const doc = await this.db.collection(collectionName).doc(documentId).get();
      if (doc.exists) {
        return {
          id: doc.id,
          ...doc.data()
        };
      }
      return null;
    } catch (error) {
      console.error("获取文档错误:", error);
      throw error;
    }
  }

  // 停止所有监听器
  stopAllListeners() {
    this.listeners.forEach((unsubscribe) => {
      unsubscribe();
    });
    this.listeners.clear();
  }

  // 停止特定监听器
  stopListener(key) {
    const unsubscribe = this.listeners.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.listeners.delete(key);
    }
  }
}

// 创建全局实例
const firebaseSync = new FirebaseSync();

// 导出供其他文件使用
window.firebaseSync = firebaseSync;
window.db = db;