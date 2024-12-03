const historyModel = require('../models/histories');

// Mengambil data riwayat berdasarkan id_users
const getHistoriesByUser = async (req, res) => {
    const { idUser } = req.params;

    try {
        const [rows] = await historyModel.getHistoriesByUser(idUser);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `Data riwayat tidak ditemukan untuk idUser ${idUser}`,
                data: null
            });
        }

        res.status(200).json({
            message: `Data riwayat ditemukan untuk idUser ${idUser}`,
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message
        });
    }
};

const deleteHistories = async (req, res) => {
    const{idHistories} = req.params;
    try {
        await historyModel.deleteHistories(idHistories);
        res.json({
            message : 'delete history berhasil',
            data : null
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error.message, 
        });
    };
    
};


const createHistory = async (req, res) => {
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
    } = req.body;

    // Validasi data yang dikirim
    if (
        !id_users ||
        !history ||
        typeof gender === 'undefined' ||
        typeof hypertension === 'undefined' ||
        typeof heart_disease === 'undefined' ||
        !age ||
        !bmi ||
        !hbA1c ||
        !blood_glucose ||
        !result
    ) {
        return res.status(400).json({
            message: 'Harap isi semua data dengan benar.',
            data: null
        });
    }

    try {
        await historyModel.createNewHistory({
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
        });
        res.status(201).json({
            message: 'History berhasil ditambahkan.',
            data: req.body
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message
        });
    }
};



module.exports = {
    getHistoriesByUser,
    deleteHistories,
    createHistory,
};
