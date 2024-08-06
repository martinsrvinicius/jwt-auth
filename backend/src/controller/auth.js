const authService = require('../service/auth');
const { sendMail } = require('../service/email');
const { logError, logInfo } = require('../config/logger');
const  validateInput  = require('../service/validationService')
const jwt = require('../service/jwt');

const COOKIE_NAME = 'mobileDevice';
const COOKIE_EXPIRATION_DAYS = 30;
const JWT_EXPIRATION_SHORT = '1h';
const JWT_EXPIRATION_LONG = '90d';

async function login(req, res) {
    const { login, password } = req.body;

    //First validation
    if (!login || !password) {
        return res.status(400).json('Bad request params - you need to provide an user and password');
    }

    try {
        const user = await authService.login(login, password);

        // Generate 6 digit code
        const code = Math.floor(100000 + Math.random() * 900000);

        req.session.user = { userid: user.userid, name: user.login, image: user.image, trusted: false, language: user.language, permissions: user.permissions, isExternal: false };
        req.session.code = code;

        let trusted = false;
        let token = null;

        if (req.cookies.mobileDevice) {
            trusted = true;
            token = jwt.getToken(login, '30d');
            req.session.user.trusted = true;
            req.session.user.image = user.image;
        } else {
            // Send Email with code
            console.log("enviar email ", user.email);
            sendMail({
                to: user.email,
                subject: 'Autenticação',
                html: `<p>Olá <strong>${user.name}</strong>, </p><p>Para continuar o login por favor use o código: <h2>${code}</h2></p>`
            });
        }
        res.status(200).json({ "status": true, "result": 'Login bem sucedido!', "trusted": trusted, "user": login, "token": token, "image": user.image, "language": user.language, "userid": user.userid, "permissions": user.permissions });
    } catch (err) {
        res.status(401).json({ "result": 'Forbiden' });
    }
}


async function register(req, res) {
    console.log(req.body);
    const { name, email, phone, login, password } = req.body;

    //First validation
    if (!name || !login || !email || !password || !phone) {
        return res.status(400).json('Pedido inválido');
    }

    try {
        const user = await authService.register(name, email, phone, login, password);
        return res.status(200).json({ status: true, result: "Utilizador criado!" });
    } catch (err) {
        console.error(err);
        return res.status(401).json(err);
    }
}

async function validate(req, res) {
    try {
        const { accesscode, remember } = req.body;
        const sessionUser = req.session.user;
        const sessionCode = req.session.code;

        //logInfo('Session data', req.session);

        if (!validateInput({ accesscode, remember }) || !sessionUser || !sessionCode) {
            return res.status(400).json({ status: false, result: "Pedido inválido" });
        }

        if (sessionCode !== accesscode) {
            return res.status(401).json({ status: false, result: "Código Inválido!", trusted: sessionUser.trusted, user: sessionUser.name });
        }

        sessionUser.trusted = true;
        const token = jwt.sign({ name: sessionUser.name }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION_SHORT });

        if (remember) {
            const jwtToken = jwt.sign({ name: sessionUser.name }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION_LONG });
            const expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + COOKIE_EXPIRATION_DAYS);

            res.cookie(COOKIE_NAME, jwtToken, {
                httpOnly: true,
                expires: expireDate,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
        }

        res.status(200).json({
            status: true,
            result: "Login bem sucedido!",
            trusted: sessionUser.trusted,
            user: sessionUser.name,
            token,
            image: sessionUser.image,
            permissions: sessionUser.permissions
        });
    } catch (err) {
        logError('Erro durante a validação', err);
        res.status(500).json({ status: false, result: "Erro interno do servidor" });
    }
}

async function logout(req, res) {
    console.log("logout")
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send("Unable to log out");
            }
            else {
                res.clearCookie("mobileSession").clearCookie("mobileDevice").send("Logout successful");
            }
        })
    }
    else {
        res.send();
    }
}

async function forgot(req, res) {
    let username = req.body.username;
    try {
        //Get user
        const user = await authService.findUser(username);

        if (user) {
            const tokenUrl = await authService.passwordPageToken(user.userid);
            console.log("reset token: ", tokenUrl);
            //send email function
            const resetEmail = authService.maskEmail(user.email);

            sendMail({
                to: user.email,
                subject: 'Forgot Password',
                html: `<p>Olá <strong>${user.name}</strong>, </p><p>Clique no link para redefinir sua palavra-passe: <strong>${tokenUrl}</strong></p>`
            });
            res.status(202).json({ status: true, result: resetEmail });
        } else {
            res.status(401).json({ status: true, result: "User/Email does not exists!" });
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

async function reset(req, res) {
    const { userid, token, password } = req.body;
    try {
        const response = await authService.resetPassword(userid, token, password);
        res.status(200).json({ status: true, result: 'Password alterada com sucesso!' });
    }
    catch (err) {
        res.status(400).json({ status: false, result: err });
    }
}

async function resetPassword(req, res) {
    const { userid, token, password } = req.body;

    // Input validation
    if (!userid || !token || !password) {
        return res.status(400).json({ 
            status: false, 
            result: 'Missing required fields: userid, token, and password are all required.'
        });
    }

    // Password strength validation (example)
    if (password.length < 8) {
        return res.status(400).json({ 
            status: false, 
            result: 'Password must be at least 8 characters long.'
        });
    }

    try {
        await authService.resetPassword(userid, token, password);
        
        // Log the successful password reset (for security auditing)
        console.log(`Password reset successful for user ID: ${userid}`);

        res.status(200).json({ 
            status: true, 
            result: 'Password alterada com sucesso!' 
        });
    }
    catch (err) {
        // Log the error for debugging (make sure not to include sensitive info)
        console.error('Password reset error:', err.message);

        // Determine the appropriate error message and status code
        let errorMessage = 'Ocorreu um erro ao redefinir a senha. Por favor, tente novamente.';
        let statusCode = 400;

        if (err.message === 'Invalid or expired token') {
            errorMessage = 'O link de redefinição de senha é inválido ou expirou. Por favor, solicite um novo link.';
            statusCode = 401;
        } else if (err.message === 'User not found') {
            errorMessage = 'Usuário não encontrado.';
            statusCode = 404;
        }

        res.status(statusCode).json({ 
            status: false, 
            result: errorMessage
        });
    }
}


module.exports = { login, register, validate, logout, forgot, reset, resetPassword }
