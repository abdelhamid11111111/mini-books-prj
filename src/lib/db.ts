import mysql from 'mysql2'


type QueryValues = (boolean | string | number | null | Date)[];


export function query<T = any>(sql: string, values: QueryValues): Promise<T>{
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })

    return new Promise((resolve, reject) => {
        connection.connect((connectError) => {
            if(connectError){
                console.error('failed to connect db', connectError);
                connection.end()
                return reject(connectError)
            }

            connection.query(sql, values, (queryError, results) => {
                connection.end()
                if(queryError){
                    console.error('Query failed:', queryError);
                    return reject(queryError)
                }
                return resolve(results as T)
            })
        })
    })
}