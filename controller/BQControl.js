'use strict';
const BigQuery = require('@google-cloud/bigquery');
const bigquery = new BigQuery({
    projectId: 'master-telkomsel-bq'
})

module.exports = {
    customQuery: (customQuery,legacy = null)=>{
        legacy? legacy = false : legacy = true;

        const options = {
            query : customQuery,
            useLegacySql: legacy
        }

        return new Promise((resolve,reject)=>{
            bigquery
                .query(options)
                .then(results =>{
                    resolve(results)
                })
                .catch(err=>{
                    reject(err)
                })
        })
    },

    getTables: ()=>{
        return new Promise((resolve,reject)=>{
            bigquery
            .dataset('35337931')
            .getTables({

            })
            .then(results=>{
                const tables = results[0]
                let tablesId = []
                // console.log(tables)

                tables.forEach(table => {
                    tablesId.push({tableId: table.id})
                });
                // console.log(tablesId)
                resolve(tablesId)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
}