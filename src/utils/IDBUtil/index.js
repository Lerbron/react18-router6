import IDBUtil from 'idb-util-rollup';

export default new IDBUtil({
    dbName: 'TEST_IDB',
    stores: [
      /*
      * @param {string} name 仓库名称
      * @param {string} keyPath 主键名
      * @param {array} indexes 需要创建的索引 [{indexName, keyPath, objectParameters}]
      */
      {
        name: 'LIST',
        keyPath: 'order',
        indexes: []
      },
    ],
    version: 1
  })
