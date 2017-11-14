module.exports = {
    index: function(req, res){
        res.render("home");
//        res.render("test")
    },
    login: function(req, res){
        var User = require("../models/users").User;
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        var errors = req.validationErrors();
        if(errors){
            res.render("home", { errors:errors });
        }else{
            var founduser = User.findOne({username:req.body.username, password:req.body.password}, function(err,docs){
                if(docs){
                    var dbusername = docs.username;
                    var dbpassword = docs.password;
                    var dbstatus = docs.admin;
                    var dbid = docs.objectId;
                    if(err){
                        incorrecterrors = "There was an error logging you in."
                        res.render("home", {incorrecterrors:incorrecterrors});
                    }else{
                        console.log("Username/Password has been entered");
                            req.session.user = dbusername;
                            req.session.status = dbstatus;
                            console.log("correct");
                            res.redirect("client");
                    }
                }else{
                    res.render("home");
                }
            });
        }
    },
    logout: function(req,res){
        req.session.destroy();
        console.log("logged out!");
        res.redirect('/');
    }
}