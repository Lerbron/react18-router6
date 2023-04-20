import IDBUtil from 'idb-util';

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
        indexes: [{indexName: 'name', keyPath: 'name'}, {indexName: 'id', keyPath: 'id'}]
      },

      {
        name: 'PEOPLE',
        keyPath: 'id',
        indexes: []
      }
    ],
    version: 1
  })
