const dbPool = require('../config/database');


const getHistoriesByUser = (idUser) => {
    const sqlQuery = `
        SELECT * FROM histories
        WHERE id_users = ?
    `;
    return dbPool.execute(sqlQuery, [idUser]);
};

const deleteHistories = (idHistories) => {
    const sqlQuery = `DELETE FROM histories WHERE id_history = ${idHistories}`;

    return dbPool.execute(sqlQuery);
};

const createNewHistory = (histories) => {
    const {
        id_users,
        history,
        gender,
        hypertension,
        heart_disease,
        age,
        bmi,
        hbA1c,
        blood_glucose,
        result
    } = histories;

    const sqlQuery = `
        INSERT INTO histories (
            id_users, 
            history, 
            gender, 
            hypertension, 
            heart_disease, 
            age, 
            bmi, 
            hbA1c, 
            blood_glucose, 
            result, 
            created_at,
            updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    return dbPool.execute(sqlQuery, [
        id_users,
        history,
        gender,
        hypertension,
        heart_disease,
        age,
        bmi,
        hbA1c,
        blood_glucose,
        result
    ]);
};

module.exports = {
    getHistoriesByUser,
    deleteHistories,
    createNewHistory,

};
