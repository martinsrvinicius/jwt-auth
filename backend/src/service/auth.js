const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models/user');

async function login(login, password) {
    console.log("login service user: ", login);

    try {
        //find user in database using name
        const user = await User.query().withGraphJoined('permissions.[group, groupchild]').where('login', login).first().catch(
            (err) => {
                console.log(err);
                return Promise.reject(err);
            }
        );

        //checks if user is blocked
        if (user.isblocked == 1) return Promise.reject('Utilizador bloqueado');

        //password compare
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            //time stamp login date
            let response = await User.query().where('userid', user.userid).update({ lastaccessdate: new Date() }).catch(
                (err) => {
                    return Promise.reject(err);
                }
            );
            console.log(response);
            return user;
        } else {
            return Promise.reject('Wrong username or password');
        }
    } catch (err) {
        return Promise.reject('User not found');
    }

}

async function register(name, email, telephone, login, password) {
    //find user in database using name
    const user = await User.query().where('login', login).orWhere('email', email).first().catch(
        (err) => {
            return Promise.reject(err);
        }
    );

    //test existing user
    if (user) {
        return Promise.reject('User already exists!');
    }

    //generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    //set user password to hash password
    password = await bcrypt.hash(password, salt);

    //save user
    const savedUser = await User.query().insert({ 'name': name, 'email': email, 'phone': telephone, 'login': login, 'password': password }).catch((err) => {
        return Promise.reject('Cannot register user at the moment!');
    });

    return savedUser;
}


// Find User by Name/Email
async function findUser(username) {
    //find user in database using name/email
    const user = await User.query().where('login', username).orWhere('email', username).first().catch(
        (err) => {
            return Promise.reject(err);
        });

    if (user) {
        return user;
    }
}

// Find User by ID
async function findUserById(userid) {
    //find user in database using id
    const user = await User.query().where('userid', userid).first().catch(
        (err) => {
            return Promise.reject(err);
        });

    if (user) {
        return user;
    }
}

//Return a page with token as a param for resetting the page
async function passwordPageToken(userid) {
    const token = uuidv4();
    await User.query().update({ resettoken: token, resetexpires: new Date(Date.now() + (60 * 60 * 1000)), resetused: 0 }).where('userid', userid).catch((err) => { return Promise.reject(err) });
   
    // A FRONTEND_URL environment variable
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}&userid=${userid}`;
    return resetUrl;
}

async function resetPagePassword(userid, token, password) {
    //get user from database
    const user = await User.query().where('userid', userid).andWhere('resetused', 0).first().catch(
        (err) => {
            return Promise.reject(err);
        });

    //validates token and token expiration
    if (user.resettoken != token || user.resetexpires < new Date()) {
        return Promise.reject('Token expirado!');
    }

    if (user) {
        //generate salt to hash password
        const salt = await bcrypt.genSalt(10);

        //set user password to hash password
        const newpassword = await bcrypt.hash(password, salt);
        await User.query().update({ password: newpassword, resetused: 1 }).where('email', user.email).catch((err) => { return Promise.reject(err) });
        return user;
    }
}

//Token for reseting the password
async function passwordToken(userid) {
    const token = uuidv4();
    await User.query().update({ resettoken: token, resetexpires: new Date(Date.now() + (60 * 60 * 1000)), resetused: 0 }).where('userid', userid).catch((err) => { return Promise.reject(err) });
    return token;
}

async function resetPassword(userid, token, password) {
    //get user from database
    const user = await User.query().where('userid', userid).andWhere('resetused', 0).first().catch(
        (err) => {
            return Promise.reject(err);
        });

    //validates token and token expiration
    if (user.resettoken != token || user.resetexpires < new Date()) {
        return Promise.reject('Token expirado!');
    }

    if (user) {
        //generate salt to hash password
        const salt = await bcrypt.genSalt(10);

        //set user password to hash password
        const newpassword = await bcrypt.hash(password, salt);
        await User.query().update({ password: newpassword, resetused: 1 }).where('email', user.email).catch((err) => { return Promise.reject(err) });
        return user;
    }
}

function maskEmail(mail) {
    const [name, domain] = mail.split('@');
    return `${name[0]}${new Array(name.length).join('*')}@${domain}`;
}

module.exports = { login, register, findUser, passwordToken, resetPassword, maskEmail, findUserById, passwordPageToken, resetPagePassword };