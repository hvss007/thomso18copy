var nodemailer = require('nodemailer');

var clientId = "36396493886-tuf1p19t65v7dd7uquh40v87cv80dgrn.apps.googleusercontent.com";
var clientSecret = "5T3VJa4gEYVzkVfJ3UI3Tzud";
var refreshToken = "1/Fom62jgBRyBZqXDLCRyKYunjs54OetXB0gZtuhfc0ZQ";

var caMailer = function(user) {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            type: "OAuth2",
            user: "thomso.mailer@gmail.com",
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken
        }
    });
    var mailOptions = {
        from: "thomso.mailer@gmail.com",
        to: "nikhilmehra998@gmail.com",
        subject: "Thomso Campus Ambassador",
        html: "<b>Congragulations. You've successfully registered as Campus Ambassador for Thomso'18.</b>"
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        } else {
            console.log(info)
        }
        transporter.close();
    });
};

var caTempMailer = function(user) {
    if (user && user.email) {
        if(!user.name) {
            user.name = 'Ambassador'
        }
    } else {
        return null
    }
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            type: "OAuth2",
            user: "thomso.mailer@gmail.com",
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken
        }
    });
    var mailOptions = {
        from: "IIT Roorkee <thomso.mailer@gmail.com>",
        to: user.email,
        subject: "Thomso Campus Ambassador",
        html: `
        <html>
            <head>
                <META http-equiv="Content-Type" content="text/html; charset=utf-8">
            </head>
            <body>
                <div style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;height:100%;line-height:1.4;margin:0;width:100%!important">
                <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Avenir,Helvetica,sans-serif;margin:0;padding:0;width:100%">
                    <tr>
                        <td width="100%" cellpadding="0" cellspacing="0">
                            <table align="center" cellpadding="0" cellspacing="0" style="font-family:Aveni=r,Helvetica,sans-serif;background-color:#ffffff;margin:0 auto;padding:0;width:640px">
                                <tr>
                                    <td style="font-family:Avenir,Helvetica,sans-serif;padding:0px 35px">
                                        <div style="font-family:Avenir,Helvetica,sans-serif">
                                            <div style="font-family:Avenir,Helvetica,sans-serif;height:auto;margin:0 auto;display:block">
                                                <div style="font-family:Avenir,Helvetica,sans-serif;margin:0px 0;overflow:hidden">
                                                    <img src="https://thomso.in/logo.png" alt="logo" style="min-width:80px;width:10vw;height:auto">
                                                    <h5 style="font-family:Avenir,Helvetica,sans-serif;color:#222222;font-weight:600;margin-bottom:10px;font-size:14px">Dear
                                                        <span style="font-family:Avenir,Helvetica,sans-serif;color:#5288d5">`+user.name+`</span>,</h5>
                                                    <p style="font-family:Avenir,Helvetica,sans-serif;width:fit-content;text-align:justify;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">
                                                        Greetings from Thomso, IIT Roorkee!
                                                        <br>
                                                        <br> Congratulations, you have successfully registered as the Campus Ambassador for Thomso’18.
                                                        <br> We cordially welcome you to Thomso family as an official member.
                                                        <br> This is a temporary registration, sign up again as a campus ambassador in a week  on our website to get access to personalised scoreboard and gain incentives like free tickets to Thomso.
                                                        <br>
                                                        <br> For any queries, reach out to us at <a href="mailto:info.thomso18@gmail.com" target="_blank">info.thomso18@gmail.com</a>
                                                    </p>
                                                    <br>
                                                    <p style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">Regards
                                                        <br> Team Thomso
                                                    </p>
                                                    <br>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </body>
    </html>`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        } else {
            console.log(info)
        }
        transporter.close();
    });
};

var caTempRegister = function(user) {
    if (user && user.email && user.password && user.name) {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                type: "OAuth2",
                user: "thomso.mailer@gmail.com",
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken
            }
        });
        var mailOptions = {
            from: "IIT Roorkee <thomso.mailer@gmail.com>",
            to: user.email,
            // to: "nikhilmehra998@gmail.com",
            subject: "Email Verification",
            html: `
            <html>
                <head>
                    <META http-equiv="Content-Type" content="text/html; charset=utf-8">
                </head>
                <body>
                    <div style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;height:100%;line-height:1.4;margin:0;width:100%!important">
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Avenir,Helvetica,sans-serif;margin:0;padding:0;width:100%">
                        <tr>
                            <td width="100%" cellpadding="0" cellspacing="0">
                                <table align="center" cellpadding="0" cellspacing="0" style="font-family:Aveni=r,Helvetica,sans-serif;background-color:#ffffff;margin:0 auto;padding:0;width:640px">
                                    <tr>
                                        <td style="font-family:Avenir,Helvetica,sans-serif;padding:0px 35px">
                                            <div style="font-family:Avenir,Helvetica,sans-serif">
                                                <div style="font-family:Avenir,Helvetica,sans-serif;height:auto;margin:0 auto;display:block">
                                                    <div style="font-family:Avenir,Helvetica,sans-serif;margin:0px 0;overflow:hidden">
                                                        <img src="https://thomso.in/logo.png" alt="logo" style="min-width:80px;width:10vw;height:auto">
                                                        <h5 style="font-family:Avenir,Helvetica,sans-serif;color:#222222;font-weight:600;margin-bottom:10px;font-size:14px">Dear
                                                            <span style="font-family:Avenir,Helvetica,sans-serif;color:#5288d5">${user.name}</span>,</h5>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;width:fit-content;text-align:justify;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">
                                                            Greetings from Thomso, IIT Roorkee!
                                                            <br>
                                                            <br>Congratulations, you have registered as the Campus Ambassador for Thomso’18.
                                                            <br>Your temporary password is <i><b>${user.password}<b></i><br>To complete your registeration, sign in <a href="https://www.thomso.in/campusambassador/login" target="_blank">here</a> to update your password.
                                                            <br>
                                                            <br>For any queries, reach out to us at <a href="mailto:info.thomso18@gmail.com" target="_blank">info.thomso18@gmail.com</a>
                                                        </p>
                                                        <br>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">Regards
                                                            <br>Team Thomso
                                                        </p>
                                                        <br>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            } else {
                console.log(info)
            }
            transporter.close();
        });
    } else {
        return null
    }
};


var caVerified = function(user) {
    if (user && user.email && user.name) {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                type: "OAuth2",
                user: "thomso.mailer@gmail.com",
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken
            }
        });
        var mailOptions = {
            from: "IIT Roorkee <thomso.mailer@gmail.com>",
            to: user.email,
            // to: "nikhilmehra998@gmail.com",
            subject: "Thomso Campus Ambassador",
            html: `
            <html>
                <head>
                    <META http-equiv="Content-Type" content="text/html; charset=utf-8">
                </head>
                <body>
                    <div style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;height:100%;line-height:1.4;margin:0;width:100%!important">
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Avenir,Helvetica,sans-serif;margin:0;padding:0;width:100%">
                        <tr>
                            <td width="100%" cellpadding="0" cellspacing="0">
                                <table align="center" cellpadding="0" cellspacing="0" style="font-family:Aveni=r,Helvetica,sans-serif;background-color:#ffffff;margin:0 auto;padding:0;width:640px">
                                    <tr>
                                        <td style="font-family:Avenir,Helvetica,sans-serif;padding:0px 35px">
                                            <div style="font-family:Avenir,Helvetica,sans-serif">
                                                <div style="font-family:Avenir,Helvetica,sans-serif;height:auto;margin:0 auto;display:block">
                                                    <div style="font-family:Avenir,Helvetica,sans-serif;margin:0px 0;overflow:hidden">
                                                        <img src="https://thomso.in/logo.png" alt="logo" style="min-width:80px;width:10vw;height:auto">
                                                        <h5 style="font-family:Avenir,Helvetica,sans-serif;color:#222222;font-weight:600;margin-bottom:10px;font-size:14px">Dear
                                                            <span style="font-family:Avenir,Helvetica,sans-serif;color:#5288d5">`+user.name+`</span>,</h5>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;width:fit-content;text-align:justify;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">
                                                            Greetings from Thomso, IIT Roorkee!
                                                            <br>
                                                            <br> Congratulations, you have been successfully registered as the Campus Ambassador for Thomso’18.
                                                            <br> Your account has been verified.
                                                            <br> We cordially welcome you to The Thomso family as an official member of Thomso 18'.
                                                            <br>
                                                            <br> For any queries, reach out to us at <a href="mailto:info.thomso18@gmail.com" target="_blank">info.thomso18@gmail.com</a>
                                                        </p>
                                                        <br>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">Regards
                                                            <br> Team Thomso
                                                        </p>
                                                        <br>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            } else {
                console.log(info)
            }
            transporter.close();
        });
    } else {
        return null
    }
};

var zonalsDelhi = function(user) {
    if (user && user.email && user.name && user.zn_id) {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                type: "OAuth2",
                user: "thomso.mailer@gmail.com",
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken
            }
        });
        var mailOptions = {
            from: "IIT Roorkee <thomso.mailer@gmail.com>",
            to: user.email,
            subject: "Thomso Zonals",
            html: `
            <html>
                <head>
                    <META http-equiv="Content-Type" content="text/html; charset=utf-8">
                </head>
                <body>
                    <div style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;height:100%;line-height:1.4;margin:0;width:100%!important">
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Avenir,Helvetica,sans-serif;margin:0;padding:0;width:100%">
                        <tr>
                            <td width="100%" cellpadding="0" cellspacing="0">
                                <table align="center" cellpadding="0" cellspacing="0" style="font-family:Aveni=r,Helvetica,sans-serif;background-color:#ffffff;margin:0 auto;padding:0;width:640px">
                                    <tr>
                                        <td style="font-family:Avenir,Helvetica,sans-serif;padding:0px 35px">
                                            <div style="font-family:Avenir,Helvetica,sans-serif">
                                                <div style="font-family:Avenir,Helvetica,sans-serif;height:auto;margin:0 auto;display:block">
                                                    <div style="font-family:Avenir,Helvetica,sans-serif;margin:0px 0;overflow:hidden">
                                                        <img src="https://thomso.in/logo.png" alt="logo" style="min-width:80px;width:10vw;height:auto">
                                                        <h5 style="font-family:Avenir,Helvetica,sans-serif;color:#222222;font-weight:600;margin-bottom:10px;font-size:14px">Dear
                                                            <span style="font-family:Avenir,Helvetica,sans-serif;color:#5288d5">${user.name}</span>,</h5>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;width:fit-content;text-align:justify;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">
                                                            Greetings from Thomso, IIT Roorkee!
                                                            <br>
                                                            <br> Congratulations, you have successfully registered for the Karwaan - the Zonals of Thomso’18.
                                                            <br> Your ThomsoZonalsID is ${user.zn_id}. The details for the zonals at Delhi are as follows-
                                                            <br> Date: September 1, 2018
                                                            <br> Timings: 10:00 am onwards
                                                            <br> Venue: Pannalal Girdharlal Dayanand Anglo Vedic College (P.G.D.A.V.)
                                                            <br>
                                                            <br> For any queries, reach out to us at <a href="mailto:info.thomso18@gmail.com" target="_blank">info.thomso18@gmail.com</a>
                                                        </p>
                                                        <br>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">Regards
                                                            <br> Team Thomso
                                                        </p>
                                                        <br>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            } else {
                console.log(info)
            }
            transporter.close();
        });
    } else {
        return null
    }
};

var zonalsJaipur = function(user) {
    if (user && user.email && user.name && user.zn_id) {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                type: "OAuth2",
                user: "thomso.mailer@gmail.com",
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken
            }
        });
        var mailOptions = {
            from: "IIT Roorkee <thomso.mailer@gmail.com>",
            to: user.email,
            subject: "Thomso Zonals",
            html: `
            <html>
                <head>
                    <META http-equiv="Content-Type" content="text/html; charset=utf-8">
                </head>
                <body>
                    <div style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;height:100%;line-height:1.4;margin:0;width:100%!important">
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Avenir,Helvetica,sans-serif;margin:0;padding:0;width:100%">
                        <tr>
                            <td width="100%" cellpadding="0" cellspacing="0">
                                <table align="center" cellpadding="0" cellspacing="0" style="font-family:Aveni=r,Helvetica,sans-serif;background-color:#ffffff;margin:0 auto;padding:0;width:640px">
                                    <tr>
                                        <td style="font-family:Avenir,Helvetica,sans-serif;padding:0px 35px">
                                            <div style="font-family:Avenir,Helvetica,sans-serif">
                                                <div style="font-family:Avenir,Helvetica,sans-serif;height:auto;margin:0 auto;display:block">
                                                    <div style="font-family:Avenir,Helvetica,sans-serif;margin:0px 0;overflow:hidden">
                                                        <img src="https://thomso.in/logo.png" alt="logo" style="min-width:80px;width:10vw;height:auto">
                                                        <h5 style="font-family:Avenir,Helvetica,sans-serif;color:#222222;font-weight:600;margin-bottom:10px;font-size:14px">Dear
                                                            <span style="font-family:Avenir,Helvetica,sans-serif;color:#5288d5">${user.name}</span>,</h5>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;width:fit-content;text-align:justify;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">
                                                            Greetings from Thomso, IIT Roorkee!
                                                            <br>
                                                            <br> Congratulations, you have successfully registered for the Karwaan - the Zonals of Thomso’18.
                                                            <br> Your ThomsoZonalsID is ${user.zn_id}. The details for the zonals at Jaipur are as follows-
                                                            <br> Date: September 22, 2018
                                                            <br> Timings: 10:00 am onwards
                                                            <br> Venue: R. A. Podar Institute of Management, Jaipur
                                                            <br>
                                                            <br> For any queries, reach out to us at <a href="mailto:info.thomso18@gmail.com" target="_blank">info.thomso18@gmail.com</a>
                                                        </p>
                                                        <br>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">Regards
                                                            <br> Team Thomso
                                                        </p>
                                                        <br>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            } else {
                console.log(info)
            }
            transporter.close();
        });
    } else {
        return null
    }
};

var zonalsChandigadh = function(user) {
    if (user && user.email && user.name && user.zn_id) {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                type: "OAuth2",
                user: "thomso.mailer@gmail.com",
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken
            }
        });
        var mailOptions = {
            from: "IIT Roorkee <thomso.mailer@gmail.com>",
            to: user.email,
            subject: "Thomso Zonals",
            html: `
            <html>
                <head>
                    <META http-equiv="Content-Type" content="text/html; charset=utf-8">
                </head>
                <body>
                    <div style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;height:100%;line-height:1.4;margin:0;width:100%!important">
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Avenir,Helvetica,sans-serif;margin:0;padding:0;width:100%">
                        <tr>
                            <td width="100%" cellpadding="0" cellspacing="0">
                                <table align="center" cellpadding="0" cellspacing="0" style="font-family:Aveni=r,Helvetica,sans-serif;background-color:#ffffff;margin:0 auto;padding:0;width:640px">
                                    <tr>
                                        <td style="font-family:Avenir,Helvetica,sans-serif;padding:0px 35px">
                                            <div style="font-family:Avenir,Helvetica,sans-serif">
                                                <div style="font-family:Avenir,Helvetica,sans-serif;height:auto;margin:0 auto;display:block">
                                                    <div style="font-family:Avenir,Helvetica,sans-serif;margin:0px 0;overflow:hidden">
                                                        <img src="https://thomso.in/logo.png" alt="logo" style="min-width:80px;width:10vw;height:auto">
                                                        <h5 style="font-family:Avenir,Helvetica,sans-serif;color:#222222;font-weight:600;margin-bottom:10px;font-size:14px">Dear
                                                            <span style="font-family:Avenir,Helvetica,sans-serif;color:#5288d5">${user.name}</span>,</h5>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;width:fit-content;text-align:justify;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">
                                                            Greetings from Thomso, IIT Roorkee!
                                                            <br>
                                                            <br> Congratulations, you have successfully registered for the Karwaan - the Zonals of Thomso’18.
                                                            <br> Your ThomsoZonalsID is ${user.zn_id}. The details for the zonals at Chandigadh are as follows-
                                                            <br> Date: September 1, 2018
                                                            <br> Timings: 10:00 am onwards
                                                            <br> Venue: Pannalal Girdharlal Dayanand Anglo Vedic College (P.G.D.A.V.)
                                                            <br>
                                                            <br> For any queries, reach out to us at <a href="mailto:info.thomso18@gmail.com" target="_blank">info.thomso18@gmail.com</a>
                                                        </p>
                                                        <br>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">Regards
                                                            <br> Team Thomso
                                                        </p>
                                                        <br>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            } else {
                console.log(info)
            }
            transporter.close();
        });
    } else {
        return null
    }
};


var zonalsLucknow = function(user) {
    if (user && user.email && user.name && user.zn_id) {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                type: "OAuth2",
                user: "thomso.mailer@gmail.com",
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken
            }
        });
        var mailOptions = {
            from: "IIT Roorkee <thomso.mailer@gmail.com>",
            to: user.email,
            subject: "Thomso Zonals",
            html: `
            <html>
                <head>
                    <META http-equiv="Content-Type" content="text/html; charset=utf-8">
                </head>
                <body>
                    <div style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;height:100%;line-height:1.4;margin:0;width:100%!important">
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Avenir,Helvetica,sans-serif;margin:0;padding:0;width:100%">
                        <tr>
                            <td width="100%" cellpadding="0" cellspacing="0">
                                <table align="center" cellpadding="0" cellspacing="0" style="font-family:Aveni=r,Helvetica,sans-serif;background-color:#ffffff;margin:0 auto;padding:0;width:640px">
                                    <tr>
                                        <td style="font-family:Avenir,Helvetica,sans-serif;padding:0px 35px">
                                            <div style="font-family:Avenir,Helvetica,sans-serif">
                                                <div style="font-family:Avenir,Helvetica,sans-serif;height:auto;margin:0 auto;display:block">
                                                    <div style="font-family:Avenir,Helvetica,sans-serif;margin:0px 0;overflow:hidden">
                                                        <img src="https://thomso.in/logo.png" alt="logo" style="min-width:80px;width:10vw;height:auto">
                                                        <h5 style="font-family:Avenir,Helvetica,sans-serif;color:#222222;font-weight:600;margin-bottom:10px;font-size:14px">Dear
                                                            <span style="font-family:Avenir,Helvetica,sans-serif;color:#5288d5">${user.name}</span>,</h5>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;width:fit-content;text-align:justify;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">
                                                            Greetings from Thomso, IIT Roorkee!
                                                            <br>
                                                            <br> Congratulations, you have successfully registered for the Karwaan - the Zonals of Thomso’18.
                                                            <br> Your ThomsoZonalsID is ${user.zn_id}. The details for the zonals at Lucknow are as follows-
                                                            <br> Date: September 1, 2018
                                                            <br> Timings: 10:00 am onwards
                                                            <br> Venue: Babu Banarasi Das University (BBDU)
                                                            <br>
                                                            <br> For any queries, reach out to us at <a href="mailto:info.thomso18@gmail.com" target="_blank">info.thomso18@gmail.com</a>
                                                        </p>
                                                        <br>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">Regards
                                                            <br> Team Thomso
                                                        </p>
                                                        <br>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            } else {
                console.log(info)
            }
            transporter.close();
        });
    } else {
        return null
    }
};

var participantRegister = function(user) {
    if (user && user.email && user.otp && user.name) {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                type: "OAuth2",
                user: "thomso.mailer@gmail.com",
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken
            }
        });
        var mailOptions = {
            from: "IIT Roorkee <thomso.mailer@gmail.com>",
            to: user.email,
            // to: "nikhilmehra998@gmail.com",
            subject: "Email Verification",
            html: `
            <html>
                <head>
                    <META http-equiv="Content-Type" content="text/html; charset=utf-8">
                </head>
                <body>
                    <div style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;height:100%;line-height:1.4;margin:0;width:100%!important">
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Avenir,Helvetica,sans-serif;margin:0;padding:0;width:100%">
                        <tr>
                            <td width="100%" cellpadding="0" cellspacing="0">
                                <table align="center" cellpadding="0" cellspacing="0" style="font-family:Aveni=r,Helvetica,sans-serif;background-color:#ffffff;margin:0 auto;padding:0;width:640px">
                                    <tr>
                                        <td style="font-family:Avenir,Helvetica,sans-serif;padding:0px 35px">
                                            <div style="font-family:Avenir,Helvetica,sans-serif">
                                                <div style="font-family:Avenir,Helvetica,sans-serif;height:auto;margin:0 auto;display:block">
                                                    <div style="font-family:Avenir,Helvetica,sans-serif;margin:0px 0;overflow:hidden">
                                                        <img src="https://thomso.in/logo.png" alt="logo" style="min-width:80px;width:10vw;height:auto">
                                                        <h5 style="font-family:Avenir,Helvetica,sans-serif;color:#222222;font-weight:600;margin-bottom:10px;font-size:14px">Dear
                                                            <span style="font-family:Avenir,Helvetica,sans-serif;color:#5288d5">${user.name}</span>,</h5>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;width:fit-content;text-align:justify;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">
                                                            Greetings from Thomso, IIT Roorkee!
                                                            <br>
                                                            <br>Congratulations, you have registered as the Participant for Thomso’18.
                                                            <br>Your temporary OTP is <i><b>${user.otp}<b></i><br>To complete your registeration, sign in <a href="https://www.thomso.in/main/verify" target="_blank">here</a> to verify your email.
                                                            <br>
                                                            <br>For any queries, reach out to us at <a href="mailto:info.thomso18@gmail.com" target="_blank">info.thomso18@gmail.com</a>
                                                        </p>
                                                        <br>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">Regards
                                                            <br>Team Thomso
                                                        </p>
                                                        <br>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            } else {
                console.log(info)
            }
            transporter.close();
        });
    } else {
        return null
    }
};


var participantVerified = function(user) {
    if (user && user.email && user.name) {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                type: "OAuth2",
                user: "thomso.mailer@gmail.com",
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken
            }
        });
        var mailOptions = {
            from: "IIT Roorkee <thomso.mailer@gmail.com>",
            to: user.email,
            // to: "nikhilmehra998@gmail.com",
            subject: "Thomso'18",
            html: `
            <html>
                <head>
                    <META http-equiv="Content-Type" content="text/html; charset=utf-8">
                </head>
                <body>
                    <div style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;height:100%;line-height:1.4;margin:0;width:100%!important">
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Avenir,Helvetica,sans-serif;margin:0;padding:0;width:100%">
                        <tr>
                            <td width="100%" cellpadding="0" cellspacing="0">
                                <table align="center" cellpadding="0" cellspacing="0" style="font-family:Aveni=r,Helvetica,sans-serif;background-color:#ffffff;margin:0 auto;padding:0;width:640px">
                                    <tr>
                                        <td style="font-family:Avenir,Helvetica,sans-serif;padding:0px 35px">
                                            <div style="font-family:Avenir,Helvetica,sans-serif">
                                                <div style="font-family:Avenir,Helvetica,sans-serif;height:auto;margin:0 auto;display:block">
                                                    <div style="font-family:Avenir,Helvetica,sans-serif;margin:0px 0;overflow:hidden">
                                                        <img src="https://thomso.in/logo.png" alt="logo" style="min-width:80px;width:10vw;height:auto">
                                                        <h5 style="font-family:Avenir,Helvetica,sans-serif;color:#222222;font-weight:600;margin-bottom:10px;font-size:14px">Dear
                                                            <span style="font-family:Avenir,Helvetica,sans-serif;color:#5288d5">`+user.name+`</span>,</h5>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;width:fit-content;text-align:justify;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">
                                                            Greetings from Thomso, IIT Roorkee!
                                                            <br>
                                                            <br> Congratulations, you have been successfully registered for Thomso’18.
                                                            <br> Your account has been verified.
                                                            <br>
                                                            <br> For any queries, reach out to us at <a href="mailto:info.thomso18@gmail.com" target="_blank">info.thomso18@gmail.com</a>
                                                        </p>
                                                        <br>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">Regards
                                                            <br> Team Thomso
                                                        </p>
                                                        <br>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            } else {
                console.log(info)
            }
            transporter.close();
        });
    } else {
        return null
    }
};

var participantResetPassword = function(user) {
    if (user && user.email && user.password && user.name) {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                type: "OAuth2",
                user: "thomso.mailer@gmail.com",
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken
            }
        });
        var mailOptions = {
            from: "IIT Roorkee <thomso.mailer@gmail.com>",
            to: user.email,
            // to: "nikhilmehra998@gmail.com",
            subject: "Email Verification",
            html: `
            <html>
                <head>
                    <META http-equiv="Content-Type" content="text/html; charset=utf-8">
                </head>
                <body>
                    <div style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;height:100%;line-height:1.4;margin:0;width:100%!important">
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Avenir,Helvetica,sans-serif;margin:0;padding:0;width:100%">
                        <tr>
                            <td width="100%" cellpadding="0" cellspacing="0">
                                <table align="center" cellpadding="0" cellspacing="0" style="font-family:Aveni=r,Helvetica,sans-serif;background-color:#ffffff;margin:0 auto;padding:0;width:640px">
                                    <tr>
                                        <td style="font-family:Avenir,Helvetica,sans-serif;padding:0px 35px">
                                            <div style="font-family:Avenir,Helvetica,sans-serif">
                                                <div style="font-family:Avenir,Helvetica,sans-serif;height:auto;margin:0 auto;display:block">
                                                    <div style="font-family:Avenir,Helvetica,sans-serif;margin:0px 0;overflow:hidden">
                                                        <img src="https://thomso.in/logo.png" alt="logo" style="min-width:80px;width:10vw;height:auto">
                                                        <h5 style="font-family:Avenir,Helvetica,sans-serif;color:#222222;font-weight:600;margin-bottom:10px;font-size:14px">Dear
                                                            <span style="font-family:Avenir,Helvetica,sans-serif;color:#5288d5">${user.name}</span>,</h5>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;width:fit-content;text-align:justify;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">
                                                            Greetings from Thomso, IIT Roorkee!
                                                            <br>
                                                            <br>Your have requested for reset password of your Thomso account.
                                                            <br>Your temporary password is <i><b>${user.password}<b></i><br>To complete your registeration, sign in <a href="https://www.thomso.in/main/resetPassword" target="_blank">here</a> to update your password.
                                                            <br>
                                                            <br>For any queries, reach out to us at <a href="mailto:info.thomso18@gmail.com" target="_blank">info.thomso18@gmail.com</a>
                                                        </p>
                                                        <br>
                                                        <p style="font-family:Avenir,Helvetica,sans-serif;color:#74787e;margin-top:0;text-align:left;margin-bottom:10px;line-height:20px;font-size:13px">Regards
                                                            <br>Team Thomso
                                                        </p>
                                                        <br>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            } else {
                console.log(info)
            }
            transporter.close();
        });
    } else {
        return null
    }
};

exports.caMailer = caMailer;
exports.caTempMailer = caTempMailer;
exports.caTempRegister = caTempRegister;
exports.caVerified = caVerified;
exports.zonalsDelhi = zonalsDelhi;
exports.zonalsLucknow = zonalsLucknow;
exports.zonalsJaipur = zonalsJaipur;
exports.zonalsChandigadh = zonalsChandigadh;
exports.participantRegister = participantRegister;
exports.participantVerified = participantVerified;
exports.participantResetPassword = participantResetPassword;