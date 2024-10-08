
import { json } from "body-parser";
import userservice from "../services/userservice";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let userData = await userservice.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUser = async (req, res) => {
    let id = req.query.id;//all;id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters ',
            user: []
        })
    }
    let user = await userservice.GetAllUser(id);
    console.log(user);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        user
    })
}
let handleCreateNewUser = async (req, res) => {
    let message = await userservice.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: ""
        })
    }
    let message = await userservice.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userservice.updateUserData(data);
    return res.status(200).json(message)
}
let getAllcode = async (req, res) => {
    try {
        let data = await userservice.getALlcodeService(req.query.type);
        console.log(data);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get allcode error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',

        })

    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllcode: getAllcode,

}